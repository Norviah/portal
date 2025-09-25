import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

import type { LucideProps } from "lucide-react";
import type { JSX } from "react";

export function Spinner({ className, ...props }: LucideProps): JSX.Element {
  return <Loader2 className={cn("h-4 w-4 animate-spin text-foreground", props)}  {...props} />;
}
