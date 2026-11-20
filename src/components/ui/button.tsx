import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] disabled:pointer-events-none disabled:opacity-38 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-none hover:shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] active:shadow-none hover:bg-primary/92",
        tonal:
          "bg-secondary/20 text-foreground hover:bg-secondary/30 shadow-none",
        elevated:
          "bg-card text-primary shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)] hover:shadow-[0_2px_6px_2px_rgba(0,0,0,0.15)] hover:bg-primary/5 active:shadow-[0_1px_3px_1px_rgba(0,0,0,0.15)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-none hover:bg-destructive/90 focus-visible:ring-destructive",
        outline:
          "border border-border/80 text-foreground bg-transparent hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/80",
        secondary:
          "bg-secondary/20 text-foreground hover:bg-secondary/30 shadow-none",
        ghost:
          "text-foreground hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/80",
        fab:
          "rounded-2xl size-14 shadow-[0_1px_3px_0px_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] bg-primary text-primary-foreground hover:shadow-[0_2px_4px_0px_rgba(0,0,0,0.30),0_6px_10px_4px_rgba(0,0,0,0.15)] active:scale-95",
        link: "text-primary underline-offset-4 hover:underline rounded-none p-0 h-auto",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-full gap-1.5 px-4 text-xs has-[>svg]:px-3",
        lg: "h-12 rounded-full px-8 text-base has-[>svg]:px-5",
        icon: "size-10 rounded-full",
        fab: "size-14 rounded-2xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
