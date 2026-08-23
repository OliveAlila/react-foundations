type Filter = 'all' | 'active' | 'completed'

interface TodoFiltersProps {
  filter: Filter
  onFilterChange: (filter: Filter) => void
  activeCount: number
}

function TodoFilters({
  filter,
  onFilterChange,
  activeCount,
}: TodoFiltersProps) {
  return (
    <div className="todo-filters">
      <span>{activeCount} tasks left</span>

      <div>
        <button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>

        <button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>

        <button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
    </div>
  )
}

export default TodoFilters