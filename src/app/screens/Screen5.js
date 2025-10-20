"use client";
import { useEffect, useState } from "react";
import Stepper from "../components/Stepper";

export default function Screen5({ answers, onRestart, stepIndex }) {
    const [status, setStatus] = useState('processing'); // processing, submitting, success

    useEffect(() => {
        const submitFormData = async () => {
            // Parse answers: [postcode, business_type, floors, business_category, solutions, phone]
            const [postcode, businessType, floors, businessCategory, solutions, phone] = answers;

            // Get URL parameters for tracking
            const urlParams = new URLSearchParams(window.location.search);
            const clickid = urlParams.get('clickid') || '';
            const lpSubid1 = urlParams.get('lp_subid1') || '';

            // Map solutions to device IDs
            const deviceMapping = {
                'Monitored alarm': '1',
                'CCTV': '2', 
                'Access control': '3',
                'Not sure yet': '1,2,3'
            };

            const formData = {
                customerData: {
                    phone: phone || '',
                    burgled: '0', // Default to no, could be added as a question
                    devices: deviceMapping[solutions] || '1',
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
                    // window.location.href = `https://homesecurityhelper.co.uk/verisure-thank-you/?clickid=${clickid}`;
                }, 2000);
            }, 2000);
        };

        submitFormData();
    }, [answers]);

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