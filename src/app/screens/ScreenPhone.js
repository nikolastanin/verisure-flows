"use client";
import { useMemo, useState } from "react";
import Stepper from "../components/Stepper";

export default function ScreenPhone({ onSelect, stepIndex, userType }) {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [touched, setTouched] = useState(false);

    // UK phone number regex - accepts various formats including +44 20 7123 4567
    const ukPhoneRegex = useMemo(
        () => /^(\+44\s?\d{2,4}\s?\d{3,4}\s?\d{3,4}|\(?0\d{2,4}\)?\s?\d{3,4}\s?\d{3,4})$/,
        []
    );

    const isValid = useMemo(() => {
        if (!phoneNumber) return false;
        const cleanNumber = phoneNumber.replace(/\s+/g, ' ').trim();
        console.log('Validating phone:', cleanNumber, 'Result:', ukPhoneRegex.test(cleanNumber));
        return ukPhoneRegex.test(cleanNumber);
    }, [phoneNumber, ukPhoneRegex]);

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            <h1 className="question-title">In order to continue with your quote, please provide your phone number:</h1>
            <div className="input-group">
                <div className="phone-input-wrapper">
                    <div className="country-flag">🇬🇧</div>
                    <input
                        className={`text-input phone-input${touched && !isValid ? " invalid" : ""}`}
                        type="tel"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={() => setTouched(true)}
                    />
                </div>
                <div className="input-help">Example: +44 20 7123 4567</div>
                {touched && !isValid && phoneNumber ? (
                    <div className="error-text">Enter a valid UK phone number (e.g. +44 20 7123 4567)</div>
                ) : null}
                <button
                    className="option option-primary"
                    onClick={() => onSelect(phoneNumber.trim())}
                    disabled={!isValid}
                >
                    <span className="option-label">Submit</span>
                    <img className="option-icon" src="next-arrow-circle.svg" alt="submit" />
                </button>
            </div>
            
            <div className="privacy-notice">
                <p>In order to discuss private details regarding your property we'll need your phone number. We take your data security extremely seriously and are fully GDPR compliant. We'll only use your phone number to contact you in relation to the alarm query you're currently making.</p>
            </div>
            
            <div className="privacy-link">
                For more information on how we use your personal data, read our <a href="#" className="privacy-link-text">Privacy Notice</a>
            </div>
        </div>
    );
}
