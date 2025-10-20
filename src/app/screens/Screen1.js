"use client";
import Stepper from "../components/Stepper";

export default function Screen1({ onSelect, stepIndex }) {
    const options = [
        "Door at street level",
        "Premises in a shopping centre/mall",
        "Warehouse or factory building in an industrial estate",
        "Office in a business centre/office block",
    ];

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
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