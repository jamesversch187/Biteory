interface CategoryPillProps {
  label: string
  active?: boolean
  onClick?: () => void
}

export function CategoryPill({ label, active = false, onClick }: CategoryPillProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 rounded-full text-sm font-body font-medium border transition-colors
        ${
          active
            ? 'bg-earth text-white-warm border-earth'
            : 'bg-cream text-bark border-warm-border hover:border-earth hover:text-earth'
        }
      `}
    >
      {label}
    </button>
  )
}
