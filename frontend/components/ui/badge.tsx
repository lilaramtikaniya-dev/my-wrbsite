import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        default: 'border-neon-blue/30 bg-neon-blue/10 text-neon-blue',
        purple: 'border-neon-purple/30 bg-neon-purple/10 text-neon-purple',
        pink: 'border-neon-pink/30 bg-neon-pink/10 text-neon-pink',
        success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        warning: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        error: 'border-red-500/30 bg-red-500/10 text-red-400',
        outline: 'border-white/20 bg-transparent text-slate-300',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
