// import { Link, useNavigate } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import * as yup from "yup";
// import { PageMetaData, TextFormInput, ThirdPartyAuth } from "@/components";
// import { useState } from "react";
// import { useContext } from "react";
// import { AppContext } from "../../../AppContext";
// import { LoaderCircleIcon } from "lucide-react";
// import { toast } from "sonner";
// const ForgotPassword = () => {
//   const { urlApi } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const resetFormSchema = yup.object({
//     email: yup.string().required("Please enter your email"),
//   });
//   const { control, handleSubmit, reset } = useForm({
//     resolver: yupResolver(resetFormSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const response = await fetch(urlApi + "rh/reset-password/" + data.email, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const res = await response.json();
//       console.log(res)
//       if (res) {
//         setLoading(false);
//         toast.success(res.message);
//         reset();
//         navigate("/auth/sign-in");
//         return;
//       }
//       if (!response.ok) {
//         setLoading(false);
//         toast.error(res.message);
//         throw new Error(`Erreur ${response.status}: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.log(error.message)
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <PageMetaData title="Forgot Password" />

//       <form onSubmit={handleSubmit(onSubmit)} className="mt-10 shrink">
//         <TextFormInput
//           containerClassName="mb-4"
//           label="Email address"
//           name="email"
//           labelClassName="block text-base/normal text-zinc-200 font-semibold"
//           className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
//           placeholder="Enter your email"
//           fullWidth
//           control={control}
//         />
//         <div className="mb-6 flex flex-col justify-center gap-4">
//           <button
//             type="submit"
//             className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700"
//           >

//             {loading ? "Chargement..." : "Réinitialiser le mot de passe"}
//             {loading && <LoaderCircleIcon className="animate-spin" />}

//           </button>

//         </div>
//       </form>

//       {/* <ThirdPartyAuth /> */}

//       <p className="shrink text-center text-zinc-200">

//         <Link to="/auth/sign-in" className="ms-1 text-primary">
//           <b>Connectez-vous</b>
//         </Link>
//       </p>
//     </>
//   );
// };

// export default ForgotPassword;

"use client"

import { Link, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { PageMetaData, TextFormInput } from "@/components"
import { useState, useContext } from "react"
import { AppContext } from "../../../AppContext"
import { LoaderCircleIcon } from "lucide-react"
import { toast } from "sonner"

const ForgotPassword = () => {
  const { urlApi } = useContext(AppContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [method, setMethod] = useState("email") // "email" ou "sms"

  const resetFormSchema = yup.object({
    email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
    phone: yup.string().when("method", {
      is: "sms",
      then: () => yup.string().required("Veuillez entrer votre numéro de téléphone"),
      otherwise: () => yup.string(),
    }),
  })

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(resetFormSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
    context: { method },
  })

  const onSubmitEmail = async (data) => {
    setLoading(true)
    try {
      // Utilisation de votre fonction resetPasswordMail
      const response = await fetch(`${urlApi}api/reset-password-email/${data.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const res = await response.json()

      if (res.success) {
        setLoading(false)
        toast.success(res.message || "Un lien de réinitialisation a été envoyé à votre adresse email.")
        reset()
        navigate("/auth/sign-in")
        return
      }

      setLoading(false)
      toast.error(res.message || "Impossible d'envoyer le lien de réinitialisation. Veuillez réessayer.")
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  const onSubmitSMS = async (data) => {
    setLoading(true)
    try {
      // Utilisation de votre fonction resetPasswordBySMS
      const response = await fetch(`${urlApi}api/reset-password-sms/${data.phone}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const res = await response.json()

      if (res.success) {
        setLoading(false)
        toast.success(res.message || "Un code de réinitialisation a été envoyé à votre numéro de téléphone.")
        reset()
        navigate("/auth/sign-in")
        return
      }

      setLoading(false)
      toast.error(res.message || "Impossible d'envoyer le code de réinitialisation. Veuillez réessayer.")
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast.error("Une erreur est survenue. Veuillez réessayer.")
    }
  }

  const onSubmit = (data) => {
    if (method === "email") {
      onSubmitEmail(data)
    } else {
      onSubmitSMS(data)
    }
  }

  return (
    <>
      <PageMetaData title="Mot de passe oublié" />

      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-white">Mot de passe oublié</h1>
        <p className="mt-2 text-zinc-300">Veuillez choisir une méthode pour réinitialiser votre mot de passe.</p>
      </div>

      <div className="flex space-x-2 mb-6">
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={`flex-1 py-2 rounded-md ${method === "email" ? "bg-primary text-white" : "bg-transparent border border-white/20 text-white/80"
            }`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => setMethod("sms")}
          className={`flex-1 py-2 rounded-md ${method === "sms" ? "bg-primary text-white" : "bg-transparent border border-white/20 text-white/80"
            }`}
        >
          SMS
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 shrink">
        {method === "email" ? (
          <TextFormInput
            containerClassName="mb-4"
            label="Adresse email"
            name="email"
            labelClassName="block text-base/normal text-zinc-200 font-semibold"
            className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
            placeholder="Entrez votre email"
            fullWidth
            control={control}
          />
        ) : (
          <TextFormInput
            containerClassName="mb-4"
            label="Numéro de téléphone"
            name="phone"
            labelClassName="block text-base/normal text-zinc-200 font-semibold"
            className="block rounded border-white/10 bg-transparent py-2.5 text-white/80 focus:border-white/25 focus:outline-0 focus:ring-0"
            placeholder="Entrez votre numéro de téléphone"
            fullWidth
            control={control}
          />
        )}

        <div className="mb-6 flex flex-col justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="relative inline-flex w-full items-center justify-center rounded bg-primary px-6 py-3 text-base capitalize text-white transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Chargement..."
              : method === "email"
                ? "Envoyer le lien de réinitialisation"
                : "Envoyer le code par SMS"}
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

export default ForgotPassword
