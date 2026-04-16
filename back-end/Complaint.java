package com.wqm.model;

import jakarta.persistence.*;
import java.time.LocalDate;

// entity for complaints table
// might add more fields later if needed
@Entity
@Table(name = "complaints")
public class Complaint {

```
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// custom complaint id (like WQM-001 etc)
@Column(nullable = false)
private String complaintId;

private String name;   // user name
private String email;
private String phone;

// full address (maybe split later?)
private String address;

@Enumerated(EnumType.STRING)
private Category category;

// description of issue
@Column(columnDefinition = "TEXT")
private String description;

// default status
@Enumerated(EnumType.STRING)
private Status status = Status.PENDING;

// storing date (not using datetime for now)
private LocalDate date = LocalDate.now();


// categories (keeping inside for now)
public enum Category {
    LEAKAGE,
    CONTAMINATION,
    PRESSURE,
    BILLING,
    OTHER
}

public enum Status {
    PENDING,
    IN_PROGRESS,
    RESOLVED
}


// default constructor (needed for JPA)
public Complaint() {
}

// main constructor
public Complaint(String complaintId, String name, String email, String phone,
                 String address, Category category, String description) {

    this.complaintId = complaintId;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.category = category;
    this.description = description;

    // setting defaults manually (just to be sure)
    this.status = Status.PENDING;
    this.date = LocalDate.now();
}


// --- getters & setters ---
// not using lombok for now (might add later)

public Long getId() {
    return id;
}

public void setId(Long id) {
    this.id = id;
}

public String getComplaintId() {
    return complaintId;
}

public void setComplaintId(String complaintId) {
    this.complaintId = complaintId;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getPhone() {
    return phone;
}

public void setPhone(String phone) {
    this.phone = phone;
}

public String getAddress() {
    return address;
}

public void setAddress(String address) {
    this.address = address;
}

public Category getCategory() {
    return category;
}

public void setCategory(Category category) {
    this.category = category;
}

public String getDescription() {
    return description;
}

public void setDescription(String description) {
    this.description = description;
}

public Status getStatus() {
    return status;
}

public void setStatus(Status status) {
    this.status = status;
}

public LocalDate getDate() {
    return date;
}

public void setDate(LocalDate date) {
    this.date = date;
}
```

}
