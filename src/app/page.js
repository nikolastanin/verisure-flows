"use client";
import Image from "next/image";
import { useState, useMemo } from "react";
import CookieConsentProvider from "./components/CookieConsentProvider";
import Stepper from "./components/Stepper";
import Screen1 from "./screens/Screen1";
import Screen1a from "./screens/Screen1a";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";
import Screen4 from "./screens/Screen4";
import ScreenPhone from "./screens/ScreenPhone";
import Screen5 from "./screens/Screen5";

export default function Home() {
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    const screens = useMemo(() => [
        (onNext) => <Screen1a onSelect={onNext} stepIndex={stepIndex} />, // Postcode first
        (onNext) => <Screen1 onSelect={onNext} stepIndex={stepIndex} />, // Property details options
        (onNext) => <Screen2 onSelect={onNext} stepIndex={stepIndex} />, // Floors
        (onNext) => <Screen3 onSelect={onNext} stepIndex={stepIndex} />, // Business type
        (onNext) => <Screen4 onSelect={onNext} stepIndex={stepIndex} />, // Solutions
        (onNext) => <ScreenPhone onSelect={onNext} stepIndex={stepIndex} />, // Phone number
        () => <Screen5 answers={answers} onRestart={handleRestart} stepIndex={stepIndex} />, // Summary
    ], [answers, stepIndex]);

    function handleSelect(label) {
        const nextAnswers = [...answers, label];
        setAnswers(nextAnswers);
        setStepIndex(Math.min(stepIndex + 1, screens.length - 1));
    }

    function handleRestart() {
        setAnswers([]);
        setStepIndex(0);
    }

    const CurrentScreen = screens[stepIndex];

    return (
     <div>
       <CookieConsentProvider />
       <header>
        <img src="logo.avif" alt="Header logo" />
      </header>
      
      
      {typeof CurrentScreen === "function" && (
        <div>
          {stepIndex < screens.length - 1 ? (
            CurrentScreen(handleSelect)
          ) : (
            CurrentScreen()
          )}
        </div>
      )}


      <footer>
        <div class="footer-container">
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
