package com.wqm.repository;

import com.wqm.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

// repository for complaints
// using JPA for now (might switch later if needed)
@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

```
// find by complaintId (used for tracking)
Optional<Complaint> findByComplaintId(String complaintId);

// filter by status (pending, resolved etc)
List<Complaint> findByStatus(Complaint.Status status);

// filter by category (leakage, billing etc)
List<Complaint> findByCategory(Complaint.Category category);

// count complaints by status (for dashboard maybe)
long countByStatus(Complaint.Status status);

// might add more queries later like date-based filtering
```

}
