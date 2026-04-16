-- Sample data for WQM (runs on first startup if table is empty)
INSERT IGNORE INTO complaints (complaint_id, name, email, phone, address, category, description, status, date)
VALUES
('WQM-001', 'Ravi Kumar', 'ravi@email.com', '9876543210', '12 MG Road, Bangalore', 'LEAKAGE', 'Major water leakage from pipeline near main junction.', 'PENDING', '2026-04-10'),
('WQM-002', 'Priya Sharma', 'priya@email.com', '9876543211', '45 Lake View, Chennai', 'CONTAMINATION', 'Water has yellowish color and foul smell.', 'IN_PROGRESS', '2026-04-08'),
('WQM-003', 'Amit Patel', 'amit@email.com', '9876543212', '78 Green Park, Delhi', 'PRESSURE', 'Very low water pressure for the last 3 days.', 'RESOLVED', '2026-04-05'),
('WQM-004', 'Sneha Reddy', 'sneha@email.com', '9876543213', '23 Hill Road, Hyderabad', 'CONTAMINATION', 'Muddy water supply since yesterday.', 'PENDING', '2026-04-12'),
('WQM-005', 'Kiran Das', 'kiran@email.com', '9876543214', '56 River Side, Kolkata', 'LEAKAGE', 'Underground pipe burst flooding street.', 'IN_PROGRESS', '2026-04-11');
