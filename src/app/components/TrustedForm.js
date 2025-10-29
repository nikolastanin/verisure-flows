"use client";
import { useEffect } from "react";

export default function TrustedForm() {
    useEffect(() => {
        try {
            const existing = document.getElementById("trustedform-script");
            if (existing) return;

            const tf = document.createElement("script");
            tf.type = "text/javascript";
            tf.async = true;
            tf.id = "trustedform-script";
            tf.src = ("https:" === document.location.protocol ? "https" : "http") +
                "://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=" +
                (new Date().getTime() + Math.random());

            const firstScript = document.getElementsByTagName("script")[0];
            if (firstScript && firstScript.parentNode) {
                firstScript.parentNode.insertBefore(tf, firstScript);
            } else {
                document.body.appendChild(tf);
            }
        } catch (_) {
            // No-op if DOM not available
        }
    }, []);

    return (
        <div style={{ display: "none" }} aria-hidden="true">
            <input type="hidden" name="xxTrustedFormCertUrl" value="" />
            <input type="hidden" name="xxTrustedFormPingUrl" value="" />
            <noscript>
                <img src="https://api.trustedform.com/ns.gif" alt="" />
            </noscript>
        </div>
    );
}