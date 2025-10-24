"use client";
import Stepper from "../components/Stepper";

export default function Screen6({ onSelect, stepIndex, userType }) {
    // This screen is only for Business flow - burglary question
    const options = [
        "No",
        "Yes",
    ];

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            <h1 className="question-title">Has your business or any nearby business ever been burgled before?</h1>
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