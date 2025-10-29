"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import CookieConsentProvider from "./components/CookieConsentProvider";
import TrustedForm from "./components/TrustedForm";
import Stepper from "./components/Stepper";
import Screen1 from "./screens/Screen1";
import Screen1a from "./screens/Screen1a";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import Screen6 from "./screens/Screen6";
import ScreenPhone from "./screens/ScreenPhone";
import Screen5 from "./screens/Screen5";

export default function Home() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [userType, setUserType] = useState(null); // "Home" or "Business"

    const getScreens = () => {
        if (!userType) {
            // Initial screen to choose Home or Business
            return [
                () => <Screen1 onSelect={handleInitialSelect} stepIndex={stepIndex} />
            ];
        }

        if (userType === "Home") {
            return [
                (onNext) => <Screen1 onSelect={(choice) => {
                    setUserType(choice);
                    onNext(choice);
                }} stepIndex={stepIndex} />, // Home/Business choice
                (onNext) => <Screen2 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Home type
                (onNext) => <Screen3 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Camera options
                (onNext) => <Screen4 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Devices
                (onNext) => <Screen1a onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Postcode
                (onNext) => <ScreenPhone onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Phone
                () => <Screen5 answers={answers} onRestart={handleRestart} stepIndex={stepIndex} userType={userType} />, // Thank you
            ];
        } else {
            // Business flow
            return [
                (onNext) => <Screen1 onSelect={(choice) => {
                    setUserType(choice);
                    onNext(choice);
                }} stepIndex={stepIndex} />, // Home/Business choice
                (onNext) => <Screen2 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Business type
                (onNext) => <Screen3 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Goods type
                (onNext) => <Screen4 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Devices
                (onNext) => <Screen1a onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Postcode
                (onNext) => <Screen6 onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Burglary question
                (onNext) => <ScreenPhone onSelect={onNext} stepIndex={stepIndex} userType={userType} />, // Phone
                () => <Screen5 answers={answers} onRestart={handleRestart} stepIndex={stepIndex} userType={userType} />, // Thank you
            ];
        }
    };

    const screens = useMemo(() => getScreens(), [answers, stepIndex, userType]);

    function handleSelect(label) {
        const nextAnswers = [...answers, label];
        setAnswers(nextAnswers);
        setStepIndex(Math.min(stepIndex + 1, screens.length - 1));
    }

    function handleInitialSelect(choice) {
        setUserType(choice);
        setStepIndex(1); // Move to the next screen after selecting user type
    }

    function handleRestart() {
        setAnswers([]);
        setStepIndex(0);
        setUserType(null);
    }

    const CurrentScreen = screens[stepIndex];

    return (
     <div>
       <CookieConsentProvider />
      <TrustedForm />
       <header>
        <img src="logo.avif" alt="Header logo" />
      </header>
      
      
      {typeof CurrentScreen === "function" && (
        <div>
          {!userType || stepIndex < screens.length - 1 ? (
            CurrentScreen(handleSelect)
          ) : (
            CurrentScreen()
          )}
        </div>
      )}


      <footer>
        <div className="footer-container">
          <img src="trustpilot.webp" alt="trustpilot image" />
          <div className="footer-links">
            <ul className="link-list">
            <li><a href="http://homesecurityhelper.co.uk/temp-page/privacy.php" target="_blank" rel="noreferrer" aria-label="Privacy Policy (opens in a new tab)">Privacy Policy</a></li>
            <li><a href="http://homesecurityhelper.co.uk/temp-page/terms.php" target="_blank" rel="noreferrer" aria-label="Terms &amp; Conditions (opens in a new tab)">Terms &amp; Conditions</a></li>
            <li><a href="http://homesecurityhelper.co.uk/temp-page/privacy.php" target="_blank" rel="noreferrer" aria-label="Privacy Policy (opens in a new tab)">Privacy Policy</a></li>
            </ul>
          </div>
          Copyright © 2025
        </div>
      </footer>
     </div>
    );
}
