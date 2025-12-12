import './DaySwitcher.css';

function DaySwitcher({ days, activeDayIndex, onDayChange }) {
  if (!days || days.length <= 1) return null;

  return (
    <div className="day-switcher">
      <div className="day-switcher__header">
        <h3 className="day-switcher__title">Дни маршрута:</h3>
      </div>
      <div className="day-switcher__tabs">
        {days.map((day, index) => (
          <button
            key={index}
            className={`day-switcher__tab ${index === activeDayIndex ? 'day-switcher__tab--active' : ''}`}
            onClick={() => onDayChange(index)}
            type="button"
          >
            <div className="day-switcher__tab-content">
              <span className="day-switcher__tab-text">{day.title.split('.')[0]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default DaySwitcher;