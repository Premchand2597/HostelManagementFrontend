import type { JSX } from "react";
import type { Role } from "./Role";

export interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: JSX.Element;
}
