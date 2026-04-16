import { Link, useLocation } from "react-router-dom";
import { Droplets, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


const navLinks = [
{ to: "/", label: "Home" },
{ to: "/submit", label: "Submit Complaint" },
{ to: "/admin", label: "Admin Dashboard" },
];

export default function Navbar() {


const location = useLocation();
const currentPath = location.pathname;


const [isOpen, setIsOpen] = useState(false);


function toggleMenu() {
setIsOpen(!isOpen);
}

return (

  <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">

```
<div className="container flex items-center justify-between h-16">

  {}
  <Link
    to="/"
    className="flex items-center gap-2 font-heading font-bold text-lg"
  >
    <div className="hero-gradient rounded-lg p-1.5">
      <Droplets className="h-5 w-5 text-primary-foreground" />
    </div>

    <span className="text-gradient">WQM</span>
  </Link>

  {}
  <div className="hidden md:flex items-center gap-1">
    {navLinks.map((item, index) => {
      const isActive = currentPath === item.to;

      return (
        <Link
          key={index}
          to={item.to}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {item.label}
        </Link>
      );
    })}
  </div>

  {}
  <button className="md:hidden p-2" onClick={toggleMenu}>
    {isOpen ? (
      <X className="h-5 w-5" />
    ) : (
      <Menu className="h-5 w-5" />
    )}
  </button>
</div>

{}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="md:hidden overflow-hidden border-t border-border"
    >
      <div className="container py-3 flex flex-col gap-1">

        {navLinks.map((item, i) => {
          const active = currentPath === item.to;

          return (
            <Link
              key={i}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

      </div>
    </motion.div>
  )}
</AnimatePresence>
```

  </nav>
);
}
