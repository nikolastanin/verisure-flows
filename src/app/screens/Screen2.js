"use client";
import Stepper from "../components/Stepper";

export default function Screen2({ onSelect, stepIndex }) {
    const options = [
        "Ground floor",
        "Multiple floors",
        "Basement included",
        "Top floor only",
    ];

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            <h1 className="question-title">How many floors does it occupy?</h1>
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