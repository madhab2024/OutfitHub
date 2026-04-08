import { cn } from '../../lib/utils'

export const Card = ({ className, ...props }) => (
  <div className={cn('rounded-xl border border-slate-200 bg-white shadow-sm', className)} {...props} />
)

export const CardHeader = ({ className, ...props }) => <div className={cn('p-4 pb-2', className)} {...props} />

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn('text-base font-bold text-slate-900', className)} {...props} />
)

export const CardContent = ({ className, ...props }) => <div className={cn('p-4 pt-2', className)} {...props} />