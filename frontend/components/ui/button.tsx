import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon-blue hover:shadow-neon-blue-lg hover:-translate-y-0.5',
        outline:
          'border border-neon-blue/40 text-neon-blue bg-transparent hover:bg-neon-blue/10 hover:border-neon-blue',
        ghost:
          'text-slate-300 hover:bg-white/5 hover:text-white',
        destructive:
          'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30',
        secondary:
          'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20',
        cyber:
          'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:shadow-neon-purple hover:-translate-y-0.5',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
