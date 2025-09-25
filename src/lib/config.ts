import { Overpass } from "next/font/google";
import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Trio Development Client Portal",
  description: "Trio Development Client Portal",
} as const;

export const font = Overpass({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
