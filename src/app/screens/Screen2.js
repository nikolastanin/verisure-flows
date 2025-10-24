"use client";
import Stepper from "../components/Stepper";

export default function Screen2({ onSelect, stepIndex, userType }) {
    const homeOptions = [
        "Detached House",
        "Semi-Detached House",
        "Terraced House",
        "Maisonette",
        "Flat",
    ];

    const businessOptions = [
        "Door at street level",
        "Premises in a shopping centre/mall",
        "Warehouse or factory building in an industrial estate",
        "Office in a business centre/office block",
    ];

    const options = userType === "Home" ? homeOptions : businessOptions;
    const title = userType === "Home" 
        ? "What type of home do you need an alarm for?" 
        : "What is your business like?";

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            <h1 className="question-title">{title}</h1>
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