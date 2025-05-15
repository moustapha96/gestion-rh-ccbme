// import { PageMetaData, PasswordFormInput, ThirdPartyAuth } from "@/components";
// import { Link } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";

// const ResetPassword = () => {
//   const resetFormSchema = yup.object({
//     newPassword: yup.string().required("Please enter your new password"),
//     confirmPassword: yup
//       .string()
//       .oneOf([yup.ref("newPassword")], "Passwords must match"),
//   });
//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(resetFormSchema),
//     defaultValues: {
//       newPassword: "password",
//       confirmPassword: "password",
//     },
//   });
//   return (
//     <>
//       <PageMetaData title="Reset Password" />

//       <form onSubmit={handleSubmit(() => {})} className="mt-10 shrink">
//         <PasswordFormInput
//           label="New Password"
//           containerClassName="mb-4"
//           name="newPassword"
//           labelClassName="block text-base/normal text-zinc-200 font-semibold"
//           fullWidth
//           className="block w-full rounded border-white/10 py-2.5 bg-transparent text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
//           control={control}
//         />
//         <PasswordFormInput
//           label="Confirm New Password"
//           containerClassName="mb-4"
//           name="confirmPassword"
//           labelClassName="block text-base/normal text-zinc-200 font-semibold"
//           fullWidth
//           className="block w-full rounded border-white/10 py-2.5 bg-transparent text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
//           control={control}
//         />

//         <div className="mb-6 flex flex-col justify-center gap-4">
//           <button
//             type="submit"
//             className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700"
//           >
//             Reset Password
//           </button>
//         </div>
//       </form>
//       <ThirdPartyAuth />
//       <p className="shrink text-center text-zinc-200">
//         Back To ?
//         <Link to="/auth/sign-in" className="ms-1 text-primary">
//           <b>Login</b>
//         </Link>
//       </p>
//     </>
//   );
// };

// export default ResetPassword;

"use client"

import { Link, useNavigate, useLocation } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { PageMetaData, PasswordFormInput } from "@/components"
import { useState, useContext, useEffect } from "react"
import { AppContext } from "../../../AppContext"
import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"

const ResetPassword = () => {
  const { urlApi } = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState("")

  // Extraire le token de l'URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const tokenParam = searchParams.get("token")
    if (tokenParam) {
      setToken(tokenParam)
    }
  }, [location])

  const resetFormSchema = yup.object({
    newPassword: yup.string().required("Veuillez entrer votre nouveau mot de passe"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Les mots de passe doivent correspondre")
      .required("Veuillez confirmer votre mot de passe"),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("Token de réinitialisation manquant. Veuillez demander un nouveau lien.")
      return
    }

    setLoading(true)
    try {
      // Utilisation de votre fonction newPassword
      const response = await fetch(`${urlApi}api/new-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          password: data.newPassword,
        }),
      })

      const res = await response.json()

      if (res.success) {
        setLoading(false)
        toast.success("Votre mot de passe a été réinitialisé avec succès!")
        reset()
        // Rediriger vers la page de connexion après 2 secondes
        setTimeout(() => {
          navigate("/auth/sign-in")
        }, 2000)
        return
      }

      setLoading(false)
      toast.error(res.message || "Impossible de réinitialiser votre mot de passe. Veuillez réessayer.")
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  return (
    <>
      <PageMetaData title="Réinitialisation du mot de passe" />

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Réinitialisation du mot de passe</h1>
        <p className="mt-2 text-zinc-300">Veuillez entrer votre nouveau mot de passe.</p>
      </div>

      {!token && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-200 text-sm">
          Token de réinitialisation manquant. Veuillez demander un nouveau lien de réinitialisation.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 shrink">
        <PasswordFormInput
          label="Nouveau mot de passe"
          containerClassName="mb-4"
          name="newPassword"
          labelClassName="block text-base/normal text-zinc-200 font-semibold"
          fullWidth
          className="block w-full rounded border-white/10 py-2.5 bg-transparent text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
          control={control}
        />

        <PasswordFormInput
          label="Confirmer le nouveau mot de passe"
          containerClassName="mb-4"
          name="confirmPassword"
          labelClassName="block text-base/normal text-zinc-200 font-semibold"
          fullWidth
          className="block w-full rounded border-white/10 py-2.5 bg-transparent text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
          control={control}
        />

        <div className="mb-6 flex flex-col justify-center gap-4">
          <button
            type="submit"
            disabled={loading || !token}
            className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Réinitialisation..." : "Réinitialiser le mot de passe"}
            {loading && <LoaderCircleIcon className="ml-2 animate-spin" />}
          </button>
        </div>
      </form>

      <p className="shrink text-center text-zinc-200">
        Retour à la
        <Link to="/auth/sign-in" className="ms-1 text-primary">
          <b>Connexion</b>
        </Link>
      </p>
    </>
  )
}

export default ResetPassword
