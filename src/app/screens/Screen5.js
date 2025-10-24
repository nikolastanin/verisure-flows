"use client";
import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";

export default function Screen5({ answers, onRestart, stepIndex, userType }) {
    const [status, setStatus] = useState('processing'); // processing, submitting, success
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        if (hasSubmitted) return; // Prevent duplicate submissions
        
        const submitFormData = async () => {
            setHasSubmitted(true);
            // Get URL parameters for tracking
            const urlParams = new URLSearchParams(window.location.search);
            const clickid = urlParams.get('clickid') || '';
            const lpSubid1 = urlParams.get('lp_subid1') || '';

            let phone, postcode, devices, burgled = '0';

            if (userType === "Home") {
                // Home flow: [userType, homeType, cameraOptions, devices, postcode, phone]
                const [, homeType, cameraOptions, deviceChoice, postcodeValue, phoneValue] = answers;
                phone = phoneValue;
                postcode = postcodeValue;
                
                // Map Home devices to device IDs
                const homeDeviceMapping = {
                    'Monitored alarm systems': '1',
                    'Monitored security cameras': '2',
                    'Monitored video doorbell': '3',
                    'All of the above': '1,2,3'
                };
                devices = homeDeviceMapping[deviceChoice] || '1';
            } else {
                // Business flow: [userType, businessType, goodsType, devices, postcode, burglaryAnswer, phone]
                const [, businessType, goodsType, deviceChoice, postcodeValue, burglaryAnswer, phoneValue] = answers;
                phone = phoneValue;
                postcode = postcodeValue;
                burgled = burglaryAnswer === 'Yes' ? '1' : '0';
                
                // Map Business devices to device IDs
                const businessDeviceMapping = {
                    'Alarms': '1',
                    'Security Cameras': '2',
                    'Video doorbell': '3',
                    'All of the above': '1,2,3'
                };
                devices = businessDeviceMapping[deviceChoice] || '1';
            }

            const formData = {
                customerData: {
                    phone: phone || '',
                    burgled: burgled,
                    devices: devices,
                    postcode: postcode || ''
                },
                trackingData: {
                    SupplierLeadID: clickid || '2',
                    SupplierCampaignID: lpSubid1 || '2'
                },
                apiKey: process.env.NEXT_PUBLIC_VERISURE_API_KEY
            };

            console.log('Form data to submit:', JSON.stringify(formData, null, 2));

            // Wait 2 seconds, then submit
            setTimeout(async () => {
                setStatus('submitting');
                
                try {
                    const response = await fetch('https://vapi.verisureapp.co.uk/api/leads', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });

                    console.log('API Response status:', response.status);
                    
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('API Response data:', responseData);
                        setStatus('success');
                    } else {
                        console.error('Form submission failed:', response.status);
                        setStatus('success'); // Still show success to avoid user confusion
                    }
                } catch (error) {
                    console.error('Form submission error:', error);
                    setStatus('success'); // Still show success to avoid user confusion
                }

                // Redirect after another 2 seconds
                setTimeout(() => {
                    window.location.href = `https://homesecurityhelper.co.uk/verisure-thank-you/?clickid=${clickid}`;
                }, 2000);
            }, 2000);
        };

        submitFormData();
    }, [answers, userType, hasSubmitted]);

    return (
        <div className="form-container">
            <Stepper currentStep={stepIndex} />
            
            {status === 'processing' && (
                <>
                    <h1 className="question-title">Processing your request...</h1>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div className="loading-spinner">⏳</div>
                        <p>Please wait while we prepare your information.</p>
                    </div>
                </>
            )}
            
            {status === 'submitting' && (
                <>
                    <h1 className="question-title">Submitting your details...</h1>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div className="loading-spinner">📤</div>
                        <p>Sending your information securely.</p>
                    </div>
                </>
            )}
            
            {status === 'success' && (
                <>
                    <h1 className="question-title">Thank you!</h1>
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                        <div className="loading-spinner">✅</div>
                        <p>Redirecting you now...</p>
                    </div>
                </>
            )}
        </div>
    );
}