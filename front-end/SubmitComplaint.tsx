import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { addComplaint, Complaint } from "@/lib/complaints-store";
import { useToast } from "@/hooks/use-toast";

const categories: { value: Complaint["category"]; label: string }[] = [
  { value: "leakage", label: "Water Leakage" },
  { value: "contamination", label: "Water Contamination" },
  { value: "pressure", label: "Low Pressure" },
  { value: "billing", label: "Billing Issue" },
  { value: "other", label: "Other" },
];

export default function SubmitComplaint() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState<Complaint | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", category: "" as Complaint["category"], description: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category) {
      toast({ title: "Please select a category", variant: "destructive" });
      return;
    }
    const c = addComplaint(form);
    setSubmitted(c);
  };

  if (submitted) {
    return (
      <div className="container max-w-lg py-20 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
          <h2 className="font-heading font-bold text-2xl mb-2">Complaint Submitted!</h2>
          <p className="text-muted-foreground mb-1">Your complaint ID is <span className="font-semibold text-foreground">{submitted.id}</span></p>
          <p className="text-muted-foreground text-sm mb-8">We will review your complaint and take action promptly.</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => { setSubmitted(null); setForm({ name: "", email: "", phone: "", address: "", category: "" as Complaint["category"], description: "" }); }}>Submit Another</Button>
            <Button variant="outline" onClick={() => navigate("/admin")}>View Dashboard</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-heading font-bold text-3xl mb-2">Submit a Complaint</h1>
        <p className="text-muted-foreground mb-8">Report water quality issues in your area. All fields are required.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Complaint["category"] })}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your full address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Description</Label>
            <Textarea id="desc" required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue in detail..." />
          </div>
          <Button type="submit" size="lg" className="w-full hero-gradient border-0 text-primary-foreground font-semibold">
            Submit Complaint
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
