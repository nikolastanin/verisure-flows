export default function Screen1({ onSelect }) {
    const options = [
        "Door at street level",
        "Premises in a shopping centre/mall",
        "Warehouse or factory building in an industrial estate",
        "Office in a business centre/office block",
    ];

    return (
        <div className="form-container">
            <div className="stepper">
                <span className="step active">Property Details</span>
                <span className="step">Alarm Equipment</span>
                <span className="step">Contact Details</span>
                <span className="step">Done</span>
            </div>
            <h1 className="question-title">What is your business like?</h1>
            <ul className="option-list">
                {options.map((label) => (
                    <li key={label}>
                        <button className="option" onClick={() => onSelect(label)}>
                            <span className="option-label">{label}</span>
                            <img className="option-icon" src="next-arrow-circle.svg" alt="next" />
                        </button>
                    </li>
                ))}
            </ul>

            {/* postcode input moved to Screen1a */}
        </div>
    );
}