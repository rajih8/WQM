package com.wqm.controller;

import com.wqm.model.Complaint;
import com.wqm.repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

// controller for handling complaints
// might refactor later into service layer if needed
@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "http://localhost:8080")
public class ComplaintController {

```
@Autowired
private ComplaintRepository repository;


// get all complaints
@GetMapping
public List<Complaint> getAllComplaints() {

    // simple fetch for now
    List<Complaint> list = repository.findAll();

    return list;   // could return directly but keeping like this
}


// get complaint by complaintId (like WQM-001)
@GetMapping("/{complaintId}")
public ResponseEntity<Complaint> getComplaint(@PathVariable String complaintId) {

    Optional<Complaint> result = repository.findByComplaintId(complaintId);

    if (result.isPresent()) {
        return ResponseEntity.ok(result.get());
    }

    // not found case
    return ResponseEntity.notFound().build();
}


// filter complaints by status
@GetMapping("/status/{status}")
public List<Complaint> getByStatus(@PathVariable Complaint.Status status) {

    // directly returning
    return repository.findByStatus(status);
}


// dashboard stats (basic version)
@GetMapping("/stats")
public Map<String, Long> getStats() {

    Map<String, Long> stats = new HashMap<>();

    // total complaints
    long total = repository.count();
    stats.put("total", total);

    // counts by status
    stats.put("pending", repository.countByStatus(Complaint.Status.PENDING));
    stats.put("inProgress", repository.countByStatus(Complaint.Status.IN_PROGRESS));
    stats.put("resolved", repository.countByStatus(Complaint.Status.RESOLVED));

    return stats;
}


// create new complaint
@PostMapping
public Complaint createComplaint(@RequestBody Complaint complaint) {

    // generating complaint id manually
    long count = repository.count();

    // NOTE: this is not perfect if multiple users insert at same time
    String newId = "WQM-" + String.format("%03d", count + 1);

    complaint.setComplaintId(newId);

    // setting defaults
    complaint.setStatus(Complaint.Status.PENDING);
    complaint.setDate(LocalDate.now());

    return repository.save(complaint);
}


// update status
@PutMapping("/{complaintId}/status")
public ResponseEntity<Complaint> updateStatus(
        @PathVariable String complaintId,
        @RequestBody Map<String, String> body) {

    Optional<Complaint> result = repository.findByComplaintId(complaintId);

    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    Complaint complaint = result.get();

    // getting status from request
    String statusValue = body.get("status");

    try {
        complaint.setStatus(Complaint.Status.valueOf(statusValue));
    } catch (Exception e) {
        // invalid status (just returning bad request)
        return ResponseEntity.badRequest().build();
    }

    Complaint updated = repository.save(complaint);

    return ResponseEntity.ok(updated);
}


// delete complaint
@DeleteMapping("/{complaintId}")
public ResponseEntity<Void> deleteComplaint(@PathVariable String complaintId) {

    Optional<Complaint> result = repository.findByComplaintId(complaintId);

    if (result.isEmpty()) {
        return ResponseEntity.notFound().build();
    }

    // deleting
    repository.delete(result.get());

    return ResponseEntity.ok().build();
}
```

}
