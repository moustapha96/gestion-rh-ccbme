"use client"

import { useState, useRef, useEffect } from "react"


export default function OTPInput({ length = 4, onComplete }) {
    const [otp, setOtp] = useState(Array(length).fill(""))
    const inputRefs = useRef([])

    useEffect(() => {
        // Focus the first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (e, index) => {
        const value = e.target.value

        // Only allow numbers
        if (!/^\d*$/.test(value)) return

        // Update the OTP array
        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        // If the input is filled, focus the next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus()
        }

        // If all inputs are filled, call onComplete
        if (newOtp.every(v => v) && newOtp.join("").length === length) {
            onComplete(newOtp.join(""))
        }
    }

    const handleKeyDown = (e, index) => {
        // If backspace is pressed and the input is empty, focus the previous input
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        // Only allow numbers and up to the length
        const pastedOtp = pastedData.replace(/\D/g, "").substring(0, length)

        if (pastedOtp) {
            const newOtp = [...otp]
            for (let i = 0; i < pastedOtp.length; i++) {
                if (i < length) {
                    newOtp[i] = pastedOtp[i]
                }
            }
            setOtp(newOtp)

            // Focus the next empty input or the last one
            const focusIndex = Math.min(pastedOtp.length, length - 1)
            inputRefs.current[focusIndex]?.focus()

            // If all inputs are filled, call onComplete
            if (newOtp.every(v => v) && newOtp.join("").length === length) {
                onComplete(newOtp.join(""))
            }
        }
    }

    return (
        <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={el => inputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={e => handleChange(e, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary"
                    aria-label={`OTP digit ${index + 1}`}
                />
            ))}
        </div>
    )
}
