import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Droplets, RefreshCw } from "lucide-react";

// NOTE: using simple fetch instead of custom store (easier to debug)
export default function AdminDashboard() {

// storing complaints
const [complaints, setComplaints] = useState<any[]>([]);

// filter
const [filter, setFilter] = useState("ALL");

// load data (basic fetch)
useEffect(() => {
fetch("http://localhost:8081/api/complaints")
.then((res) => res.json())
.then((data) => {
setComplaints(data);
})
.catch((err) => {
console.log("error loading complaints", err);
});
}, []);

// --- stats (manual calculation instead of fancy stuff) ---
let pending = 0;
let inProgress = 0;
let resolved = 0;

complaints.forEach((c) => {
if (c.status === "PENDING") pending++;
else if (c.status === "IN_PROGRESS") inProgress++;
else if (c.status === "RESOLVED") resolved++;
});

// filtering
let filtered = complaints;

if (filter !== "ALL") {
filtered = complaints.filter((c) => c.status === filter);
}

// update status (simple PUT call)
function changeStatus(id: string, status: string) {

```
fetch(`http://localhost:8081/api/complaints/${id}/status`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ status }),
})
  .then(() => {
    // reload data after update
    return fetch("http://localhost:8081/api/complaints");
  })
  .then((res) => res.json())
  .then((data) => setComplaints(data));
```

}

return ( <div className="container py-10">

```
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

    <h1 className="text-3xl font-bold mb-6">
      Admin Dashboard
    </h1>


    {/* stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

      <div className="p-4 border rounded">
        <Droplets className="mb-2" />
        <p>{complaints.length}</p>
        <p>Total</p>
      </div>

      <div className="p-4 border rounded">
        <Clock className="mb-2" />
        <p>{pending}</p>
        <p>Pending</p>
      </div>

      <div className="p-4 border rounded">
        <RefreshCw className="mb-2" />
        <p>{inProgress}</p>
        <p>In Progress</p>
      </div>

      <div className="p-4 border rounded">
        <CheckCircle2 className="mb-2" />
        <p>{resolved}</p>
        <p>Resolved</p>
      </div>

    </div>


    {/* filter */}
    <div className="mb-4">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2"
      >
        <option value="ALL">All</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="RESOLVED">Resolved</option>
      </select>
    </div>


    {/* table */}
    <table className="w-full border text-sm">

      <thead>
        <tr>
          <th className="p-2">ID</th>
          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {filtered.map((c, i) => {

          return (
            <tr key={i} className="border-t">

              {/* IMPORTANT: using complaintId (backend field) */}
              <td className="p-2">{c.complaintId}</td>

              <td>{c.name}</td>
              <td>{c.category}</td>
              <td>{c.date}</td>

              <td>{c.status}</td>

              <td>
                <select
                  value={c.status}
                  onChange={(e) =>
                    changeStatus(c.complaintId, e.target.value)
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

        {filtered.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center p-4">
              no complaints found
            </td>
          </tr>
        )}

      </tbody>

    </table>

  </motion.div>
</div>
```

);
}
