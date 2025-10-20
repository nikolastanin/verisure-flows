"use client";
export default function Screen4({ onSelect }) {
    const options = [
        "Monitored alarm",
        "CCTV",
        "Access control",
        "Not sure yet",
    ];

    return (
        <div className="form-container">
            <h1 className="question-title">Which solutions are you interested in?</h1>
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
        </div>
    );
}