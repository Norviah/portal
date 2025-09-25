import { z } from "zod";

export const UserRole = z.enum(["admin", "manager", "client"]);
export type UserRole = z.infer<typeof UserRole>;

export const SignUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(10),
  role: UserRole,
});

export type SignUpFormSchema = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export type SignInFormSchema = z.infer<typeof SignInFormSchema>;

// Demo accounts data
export const DEMO_ACCOUNTS = [
  // {
  //   email: "admin@trio.com",
  //   password: "admin123",
  //   name: "Admin User",
  //   role: "admin" as const,
  //   description: "Full system access and management capabilities"
  // },
  {
    email: "manager@trio.com",
    password: "manager123",
    name: "Project Manager",
    role: "manager" as const,
    description: "Project oversight and client management"
  },
  {
    email: "client@trio.com",
    password: "client123",
    name: "Client User",
    role: "client" as const,
    description: "View project progress and communicate with team"
  }
] as const;
