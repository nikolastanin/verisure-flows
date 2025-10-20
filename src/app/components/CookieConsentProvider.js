"use client";
import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsentProvider() {
    useEffect(() => {
        CookieConsent.run({
            guiOptions: {
                consentModal: {
                    layout: "box",
                    position: "bottom right",
                    equalWeightButtons: true,
                    flipButtons: false
                },
                preferencesModal: {
                    layout: "box",
                    position: "right",
                    equalWeightButtons: true,
                    flipButtons: false
                }
            },
            categories: {
                necessary: {
                    readOnly: true
                },
                analytics: {}
            },
            language: {
                default: "en",
                translations: {
                    en: {
                        consentModal: {
                            title: "Hello, it's cookie time!",
                            description: "We use cookies to improve your experience on our website. You can accept all cookies or customize your preferences.",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            showPreferencesBtn: "Manage preferences",
                        },
                        preferencesModal: {
                            title: "Consent Preferences Center",
                            acceptAllBtn: "Accept all",
                            acceptNecessaryBtn: "Reject all",
                            savePreferencesBtn: "Save preferences",
                            closeIconLabel: "Close modal",
                            serviceCounterLabel: "Service|Services",
                            sections: [
                                {
                                    title: "Cookie Usage",
                                    description: "We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want."
                                },
                                {
                                    title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                                    description: "These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly",
                                    linkedCategory: "necessary"
                                },
                                {
                                    title: "Analytics Cookies",
                                    description: "These cookies allow the website to remember the choices you have made in the past",
                                    linkedCategory: "analytics"
                                }
                            ]
                        }
                    }
                }
            }
        });
    }, []);

    return null; // This component doesn't render anything
}
