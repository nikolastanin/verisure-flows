"use client";
export default function Screen3({ onSelect }) {
    const options = [
        "Retail",
        "Hospitality",
        "Warehouse",
        "Office",
    ];

    return (
        <div className="form-container">
            <h1 className="question-title">What type of business is it?</h1>
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