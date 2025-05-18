// "use client"

// import { useState, useEffect } from "react"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { useForm } from "react-hook-form"
// import * as yup from "yup"
// import { LoaderCircle, X } from 'lucide-react'
// import { useNavigate } from "react-router-dom"
// import { toast } from "sonner"
// import { newPasswordRh } from "@/services/loginService"

// const passwordFormSchema = yup.object({
//     password: yup
//         .string()
//         .min(8, "Le mot de passe doit contenir au moins 8 caractères")
//         .required("Veuillez entrer un mot de passe"),
//     confirmPassword: yup
//         .string()
//         .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
//         .required("Veuillez confirmer votre mot de passe"),
// })

// export default function PasswordSetupModal({ show, email, onClose }) {
//     const [loading, setLoading] = useState(false)

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(passwordFormSchema),
//         defaultValues: {
//             password: "",
//             confirmPassword: "",
//         },
//     })

//     const onSubmit = async (data) => {
//         setLoading(true)
//         const body = {
//             email: email,
//             password: data.password
//         }
//         try {
//             const response = await newPasswordRh(body)
//             console.log(response)
//             await new Promise(resolve => setTimeout(resolve, 1000))
//             onClose()
//             toast.success("Votre mot de passe a été modifié avec succès")
//             const url = new URL(window.location.href)
//             url.searchParams.delete("mail")
//             window.history.replaceState({}, document.title, url.toString())

//         } catch (error) {
//             if (error.status === 404) {
//                 toast.error(error.message)
//             }
//             else if (error.status === 400) {
//                 toast.error(error.response.data)
//             }
//         } finally {
//             setLoading(false)
//         }
//     }

//     if (!show) return null

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//             <div className="relative w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-lg">
//                 <button
//                     onClick={onClose}
//                     className="absolute right-4 top-4 text-zinc-400 hover:text-white"
//                 >
//                     <X size={20} />
//                 </button>

//                 <div className="mb-6">
//                     <h2 className="text-xl font-bold text-white">Créer votre mot de passe</h2>
//                     <p className="mt-2 text-sm text-zinc-400">
//                         Votre compte vient d'etre créé . Veuillez définir votre mot de passe.
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-4">
//                         <label htmlFor="password" className="block text-base/normal text-zinc-200 font-semibold">
//                             Nouveau mot de passe
//                         </label>
//                         <input
//                             id="password"
//                             type="password"
//                             {...register("password")}
//                             className="mt-1 block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
//                         />
//                         {errors.password && (
//                             <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
//                         )}
//                     </div>

//                     <div className="mb-6">
//                         <label htmlFor="confirmPassword" className="block text-base/normal text-zinc-200 font-semibold">
//                             Confirmer le mot de passe
//                         </label>
//                         <input
//                             id="confirmPassword"
//                             type="password"
//                             {...register("confirmPassword")}
//                             className="mt-1 block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
//                         />
//                         {errors.confirmPassword && (
//                             <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="inline-flex w-full items-center justify-center rounded bg-blueLogo px-6 py-2.5 text-white backdrop-blur-2xl transition-all hover:text-white"
//                     >
//                         {loading ? "Chargement..." : "Créer le mot de passe"}
//                         {loading && <LoaderCircle className="ml-2 animate-spin" />}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }

"use client"

import { useState, useEffect } from "react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { LoaderCircle, X, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { newPasswordRh } from "@/services/loginService"

const passwordFormSchema = yup.object({
    password: yup
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .required("Veuillez entrer un mot de passe"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
        .required("Veuillez confirmer votre mot de passe"),
})

export default function PasswordSetupModal({ show, email, onClose }) {
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(passwordFormSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        const body = {
            email: email,
            password: data.password
        }
        try {
            const response = await newPasswordRh(body)
            console.log(response)
            await new Promise(resolve => setTimeout(resolve, 1000))
            onClose()
            toast.success("Votre mot de passe a été modifié avec succès")
            const url = new URL(window.location.href)
            url.searchParams.delete("mail")
            window.history.replaceState({}, document.title, url.toString())

        } catch (error) {
            if (error.status === 404) {
                toast.error(error.message)
            }
            else if (error.status === 400) {
                toast.error(error.response.data)
            }
        } finally {
            setLoading(false)
        }
    }

    if (!show) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-md rounded-lg bg-zinc-800 p-6 shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-zinc-400 hover:text-white"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-white">Créer votre mot de passe</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                        Votre compte vient d'etre créé . Veuillez définir votre mot de passe.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-base/normal text-zinc-200 font-semibold">
                            Nouveau mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                className="mt-1 block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-base/normal text-zinc-200 font-semibold">
                            Confirmer le mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showPassword ? "text" : "password"}
                                {...register("confirmPassword")}
                                className="mt-1 block w-full rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                        )}
                    </div>

                    <div className="mb-4 flex items-center">
                        <input
                            id="showPassword"
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword(!showPassword)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="showPassword" className="ml-2 block text-sm text-zinc-200">
                            Afficher les mots de passe
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex w-full items-center justify-center rounded bg-blueLogo px-6 py-2.5 text-white backdrop-blur-2xl transition-all hover:text-white"
                    >
                        {loading ? "Chargement..." : "Créer le mot de passe"}
                        {loading && <LoaderCircle className="ml-2 animate-spin" />}
                    </button>
                </form>
            </div>
        </div>
    )
}
