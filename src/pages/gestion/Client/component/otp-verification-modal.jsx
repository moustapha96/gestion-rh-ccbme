

"use client"


import { useEffect } from "react"

import { useRef } from "react"

import { useState } from "react"
import { X, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { verificationComptePartner } from "@/services/entrepriseFunctionService"
import { toast } from "sonner"



function OTPInput({ length = 4, onComplete }) {
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
        if (newOtp.every((v) => v) && newOtp.join("").length === length) {
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
            if (newOtp.every((v) => v) && newOtp.join("").length === length) {
                onComplete(newOtp.join(""))
            }
        }
    }

    return (
        <div className="flex justify-center gap-2">
            {otp.map((value, index) => (
                <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-primary"
                    aria-label={`OTP digit ${index + 1}`}
                />
            ))}
        </div>
    )
}



export default function OTPVerificationModal({ isOpen, onClose, clientId, onSuccess }) {
    const [isVerifying, setIsVerifying] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState("idle")
    const [errorMessage, setErrorMessage] = useState("")

    if (!isOpen) return null

    const handleVerifyOTP = async (otp) => {
        setIsVerifying(true)
        setVerificationStatus("idle")
        setErrorMessage("")

        try {
            const data = {
                client_id: clientId,
                otp_code: otp,
            }

            const response = await verificationComptePartner(data)

            setVerificationStatus("success")
            toast.success("Compte vérifié avec succès!")
            setTimeout(() => {
                if (onSuccess) onSuccess()
                onClose()
            }, 1500)

        } catch (error) {
            console.error("Erreur lors de la vérification du code OTP:", error)
            setVerificationStatus("error")
            setErrorMessage("Une erreur est survenue lors de la vérification. Veuillez réessayer.")
            toast.error("Erreur lors de la vérification")
        } finally {
            setIsVerifying(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Vérification du compte</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <p className="text-center text-gray-700">
                        Veuillez entrer le code à 4 chiffres qui a été envoyé pour vérifier ce compte.
                    </p>

                    <OTPInput onComplete={handleVerifyOTP} />

                    {verificationStatus === "success" && (
                        <div className="flex items-center justify-center text-green-600 gap-2 mt-4">
                            <CheckCircle className="h-5 w-5" />
                            <span>Compte vérifié avec succès!</span>
                        </div>
                    )}

                    {verificationStatus === "error" && (
                        <div className="flex items-center justify-center text-red-600 gap-2 mt-4">
                            <AlertCircle className="h-5 w-5" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {isVerifying && (
                        <div className="flex justify-center mt-4">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-3 p-6 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    )
}
