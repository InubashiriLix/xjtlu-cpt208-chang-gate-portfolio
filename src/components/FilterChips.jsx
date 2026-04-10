export default function FilterChips({ options, selected, onSelect }) {
  return (
    <div className="filter-row" role="tablist" aria-label="Explore filters">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`filter-chip${selected === option ? ' is-selected' : ''}`}
          onClick={() => onSelect(option)}
          role="tab"
          aria-selected={selected === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
