import { NavLink as RouterNavLink } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";


const NavLink = forwardRef((props: any, ref: any) => {
const {
className,
activeClassName,
pendingClassName,
to,
...rest
} = props;

return (
<RouterNavLink
ref={ref}
to={to}
className={(state: any) => {
let finalClass = className || "";

if (state.isActive && activeClassName) {
finalClass += " " + activeClassName;
}


if (state.isPending && pendingClassName) {
finalClass += " " + pendingClassName;
}

return finalClass;
}
}