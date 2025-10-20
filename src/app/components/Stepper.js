"use client";

export default function Stepper({ currentStep }) {
    const steps = [
        { icon: "house.svg", label: "Property Details" },
        { icon: "alarm.svg", label: "Alarm Equipment" },
        { icon: "contact.svg", label: "Contact Details" },
        { icon: "done.svg", label: "Done" }
    ];

    const getStepStatus = (stepIndex) => {
        // Step 0-1 (postcode, business type) -> highlight step 0
        if (currentStep <= 1) return stepIndex === 0 ? 'active' : 'inactive';
        // Step 2-3 (floors, business category) -> highlight step 1
        if (currentStep <= 3) return stepIndex === 1 ? 'active' : stepIndex === 0 ? 'completed' : 'inactive';
        // Step 4 (solutions) -> highlight step 2
        if (currentStep === 4) return stepIndex === 2 ? 'active' : stepIndex < 2 ? 'completed' : 'inactive';
        // Step 5+ (phone, done) -> highlight step 3
        return stepIndex === 3 ? 'active' : stepIndex < 3 ? 'completed' : 'inactive';
    };

    const getLineStatus = (lineIndex) => {
        // Line 0: between steps 0 and 1
        if (lineIndex === 0) return currentStep > 1 ? 'completed' : 'inactive';
        // Line 1: between steps 1 and 2
        if (lineIndex === 1) return currentStep > 3 ? 'completed' : 'inactive';
        // Line 2: between steps 2 and 3
        if (lineIndex === 2) return currentStep >= 5 ? 'completed' : 'inactive';
        return 'inactive';
    };

    return (
        <div className="stepper">
            {steps.map((step, index) => (
                <div key={index} className="stepper-item">
                    <div className={`stepper-icon ${getStepStatus(index)}`}>
                        <img src={step.icon} alt={step.label} />
                    </div>
                    <span className={`stepper-label ${getStepStatus(index)}`}>
                        {step.label}
                    </span>
                    {index < steps.length - 1 && (
                        <div className={`stepper-line ${getLineStatus(index)}`}></div>
                    )}
                </div>
            ))}
        </div>
    );
}
