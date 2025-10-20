"use client";
import { useMemo, useState } from "react";
import Stepper from "../components/Stepper";

export default function Screen1a({ onSelect, stepIndex }) {
    const [postcode, setPostcode] = useState("");
    const [touched, setTouched] = useState(false);

    const ukPostcodeRegex = useMemo(
        () => /^(GIR 0AA|(?:[A-Z]{1,2}[0-9][0-9A-Z]?)\s?[0-9][A-Z]{2})$/i,
        []
    );

    const isValid = useMemo(() => {
        if (!postcode) return false;
        const value = postcode.toUpperCase().trim();
        return ukPostcodeRegex.test(value);
    }, [postcode, ukPostcodeRegex]);

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            <h1 className="question-title">What is the postcode of the property you'd like to protect?</h1>
            <div className="input-group">
                <input
                    className={`text-input${touched && !isValid ? " invalid" : ""}`}
                    type="text"
                    placeholder="Post Code"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    onBlur={() => setTouched(true)}
                />
                <div className="input-help">Example: SW1W 0NY</div>
                {touched && !isValid && postcode ? (
                    <div className="error-text">Enter a valid UK postcode (e.g. SW1W 0NY)</div>
                ) : null}
                <button
                    className="option option-primary"
                    onClick={() => onSelect(postcode.toUpperCase().trim())}
                    disabled={!isValid}
                >
                    <span className="option-label">Next</span>
                    <img className="option-icon" src="next-arrow-circle.svg" alt="next" />
                </button>
            </div>
        </div>
    );
}