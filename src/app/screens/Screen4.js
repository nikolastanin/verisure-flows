"use client";
import Stepper from "../components/Stepper";

export default function Screen4({ onSelect, stepIndex, userType }) {
    const homeOptions = [
        "Monitored alarm systems",
        "Monitored security cameras",
        "Monitored video doorbell",
        "All of the above",
    ];

    const businessOptions = [
        "Alarms",
        "Security Cameras",
        "Video doorbell",
        "All of the above",
    ];

    const options = userType === "Home" ? homeOptions : businessOptions;
    const title = userType === "Home" 
        ? "Which devices would you like to be included in your home security system?" 
        : "Which devices are you interested in?";

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