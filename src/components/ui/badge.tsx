import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3.5 gap-1.5 [&>svg]:pointer-events-none transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/15 text-primary [a&]:hover:bg-primary/25 shadow-none",
        secondary:
          "border-secondary/20 bg-secondary/15 text-secondary [a&]:hover:bg-secondary/25 shadow-none",
        destructive:
          "border-destructive/20 bg-destructive/15 text-destructive [a&]:hover:bg-destructive/25",
        outline:
          "border-border text-foreground [a&]:hover:bg-accent/60 [a&]:hover:text-accent-foreground",
        chip:
          "rounded-lg h-8 px-4 border-border/80 bg-background/50 hover:bg-accent/50 text-foreground font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
