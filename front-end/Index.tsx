import { useEffect, useState } from "react";

// main dashboard component
function AdminDashboard() {

// storing complaints
const [data, setData] = useState<any[]>([]);

// filter (default all)
const [statusFilter, setStatusFilter] = useState("ALL");

// loading state (extra but useful)
const [loading, setLoading] = useState(true);

// load complaints from backend
useEffect(() => {
fetchData();
}, []);

function fetchData() {
setLoading(true);

```
fetch("http://localhost:8081/api/complaints")
  .then((res) => res.json())
  .then((resData) => {
    setData(resData);
    setLoading(false);
  })
  .catch((err) => {
    console.log("error:", err);
    setLoading(false);
  });
```

}

// --- stats calculation (simple loop) ---
let total = data.length;
let pending = 0;
let inProgress = 0;
let resolved = 0;

for (let i = 0; i < data.length; i++) {
let item = data[i];

```
if (item.status === "PENDING") {
  pending++;
} else if (item.status === "IN_PROGRESS") {
  inProgress++;
} else if (item.status === "RESOLVED") {
  resolved++;
}
```

}

// filter logic
let filteredData = data;

if (statusFilter !== "ALL") {
filteredData = data.filter((item) => item.status === statusFilter);
}

// update status
function updateStatus(id: string, newStatus: string) {

```
fetch(`http://localhost:8081/api/complaints/${id}/status`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status: newStatus }),
})
  .then(() => {
    // reload data after update
    fetchData();
  })
  .catch((err) => console.log("update error", err));
```

}

return (
<div style={{ padding: "20px" }}>

```
  <h1>Admin Dashboard</h1>


  {/* stats */}
  <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

    <div>
      <h3>Total</h3>
      <p>{total}</p>
    </div>

    <div>
      <h3>Pending</h3>
      <p>{pending}</p>
    </div>

    <div>
      <h3>In Progress</h3>
      <p>{inProgress}</p>
    </div>

    <div>
      <h3>Resolved</h3>
      <p>{resolved}</p>
    </div>

  </div>


  {/* filter */}
  <div style={{ marginBottom: "15px" }}>
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <option value="ALL">All</option>
      <option value="PENDING">Pending</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="RESOLVED">Resolved</option>
    </select>
  </div>


  {/* loading */}
  {loading && <p>Loading...</p>}


  {/* table */}
  {!loading && (
    <table border={1} cellPadding={8} style={{ width: "100%" }}>

      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {filteredData.map((item, index) => {

          return (
            <tr key={index}>

              {/* important: complaintId from backend */}
              <td>{item.complaintId}</td>

              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>

              <td>{item.status}</td>

              <td>
                <select
                  value={item.status}
                  onChange={(e) =>
                    updateStatus(item.complaintId, e.target.value)
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                </select>
              </td>

            </tr>
          );
        })}

        {filteredData.length === 0 && (
          <tr>
            <td colSpan={6} align="center">
              no data found
            </td>
          </tr>
        )}

      </tbody>

    </table>
  )}

</div>
```

);
}

export default AdminDashboard;
