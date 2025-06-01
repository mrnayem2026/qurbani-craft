import type { ReactNode } from "react"

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">{icon}</div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

