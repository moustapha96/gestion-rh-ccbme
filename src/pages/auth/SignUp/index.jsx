
"use client"

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Eye, EyeOff, LoaderCircle, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { inscription } from "@/services/loginService"
import { toast } from "sonner"
import { AppContext } from "@/AppContext"

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Veuillez entrer votre nom complet" }),
    email: z.string().email({ message: "Veuillez entrer un email valide" }),
    password: z.string().min(1, { message: "Veuillez entrer votre mot de passe" }),
    confirmPassword: z.string().min(1, { message: "Veuillez confirmer votre mot de passe" }),
    city: z.string().min(1, { message: "Veuillez entrer votre ville" }),
    phone: z.string().min(1, { message: "Veuillez entrer votre numéro de téléphone" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { urlApi } = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      city: "",
      phone: "",
    },
  })

  const onSubmit = async (values) => {
    console.log(values)
    setLoading(true);

    const newPhone = values.phone.startsWith("221") ? values.phone : "221" + values.phone
    const userData = {
      name: values.name.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password,
      city: values.city.trim(),
      phone: newPhone,
    }
    console.log(userData)
    try {

      const res = await fetch(`${urlApi}companies/new_compte`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
      console.log(res)
      if (!res.ok) {
        const errorData = await res.json()
        console.error("Erreur de l'API :", errorData)
        toast.error(errorData || "Erreur lors de la création du compte")
        return
      }

      toast.success("Inscription reussie")
      navigate(`/auth/verify-account?email=${encodeURIComponent(userData.email)}`)
    } catch (error) {
      console.log(error)
      toast.error("Une erreur est survenue lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    "w-full rounded border border-white/10 bg-transparent px-3 py-2.5 text-white/80 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"

  return (
    <div className="max-w-2xl mx-auto rounded-lg border border-white/10 bg-zinc-800/50 backdrop-blur-sm">
      <div className="px-6 py-4 border-b border-white/10">
        <h1 className="text-center text-2xl font-bold text-white">Inscription</h1>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nom */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-zinc-200 font-semibold">Nom complet</label>
            <input id="name" className={inputClass} {...register("name")} placeholder="Entrez votre nom complet" />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>

          {/* Ville */}
          <div className="space-y-2">
            <label htmlFor="city" className="block text-zinc-200 font-semibold">Ville</label>
            <input id="city" className={inputClass} {...register("city")} placeholder="Entrez votre ville" />
            {errors.city && <p className="text-red-400 text-sm">{errors.city.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-zinc-200 font-semibold">Adresse email</label>
            <input id="email" type="email" className={inputClass} {...register("email")} placeholder="Entrez votre email" />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-zinc-200 font-semibold">Téléphone</label>
            <input id="phone" className={inputClass} {...register("phone")} placeholder="Entrez votre numéro de téléphone" />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Mot de passe */}
          <div className="space-y-2 relative">
            <label htmlFor="password" className="block text-zinc-200 font-semibold">Mot de passe</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={`${inputClass} pr-10`}
              placeholder="Entrez votre mot de passe"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-white/60 hover:text-white/80"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div className="space-y-2 relative">
            <label htmlFor="confirmPassword" className="block text-zinc-200 font-semibold">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`${inputClass} pr-10`}
              placeholder="Confirmez votre mot de passe"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute right-3 top-[38px] text-white/60 hover:text-white/80"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          {/* Bouton d'inscription */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded bg-blue-500 px-4 py-2.5 text-white font-medium hover:bg-blue-600 transition-colors mt-2"
            >
              {loading ? "inscription..." : "  S'inscrire"}
              {loading && <LoaderCircle className="ml-2 animate-spin" />}

            </button>
          </div>
        </form>

        <div className="mt-6 text-center md:col-span-2">
          <p className="text-zinc-200">
            Vous avez déjà un compte ?
            <Link to="/auth/sign-in" className="ml-1 text-blue-500 font-bold hover:underline">
              Connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
