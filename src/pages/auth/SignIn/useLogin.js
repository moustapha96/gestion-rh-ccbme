


// "use client"

// import { useAuthContext } from "@/context"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { useContext, useState } from "react"
// import { useForm } from "react-hook-form"
// import { useNavigate, useSearchParams } from "react-router-dom"
// import { toast } from "sonner"
// import * as yup from "yup"
// import { AppContext } from "../../../AppContext"

// const useLogin = () => {
//   const { saveSession, isAuthenticated } = useAuthContext()
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const { urlApi } = useContext(AppContext)

//   const loginFormSchema = yup.object({
//     email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
//     password: yup.string().required("Veuillez entrer votre mot de passe"),
//   })

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(loginFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const getDefaultRedirect = (userInfo) => {
//     if (!userInfo) return "/auth/sign-in"
//     if (userInfo.role === "main_user") return "/admin/dashboard"
//     if (userInfo.role === "secondary_user") return "/gestion/dashboard"
//     return "/auth/sign-in" // Changed from /auth/login
//   }

//   const login = handleSubmit(async (values) => {
//     setLoading(true)

//     try {
//       console.log("Attempting login with:", values.email)

//       const res = await fetch(urlApi + "auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: values.email, password: values.password }),
//       })

//       const response = await res.json()

//       if (response.error) {
//         toast.error(response.error, { position: "top-right", duration: 3000 })
//         setLoading(false)
//         return
//       }
// console.log(response)
//       const { user_info, access_token, parent } = response

//       if (!parent || parent.id === null) {
//         toast.error("Vous n'êtes pas encore un responsable dans une entreprise.", {
//           position: "top-right",
//           duration: 3000,
//         })
//         await saveSession(null)
//         setLoading(false)
//         return navigate("/auth/sign-in")
//       }

//       if (!access_token) {
//         throw new Error("Token d'accès non trouvé dans la réponse")
//       }

//       // Show success message first
//       toast.success("Connexion réussie. Redirection...", {
//         position: "top-right",
//         duration: 2000,
//       })

//       console.log("Login successful, saving session...")

//       // Save session and wait for it to complete
//       const sessionSaved = await saveSession(response)

//       if (!sessionSaved) {
//         console.error("Failed to save session")
//         setLoading(false)
//         return
//       }

//       console.log("Session saved successfully, isAuthenticated:", isAuthenticated)

//       const redirectPath = searchParams.get("redirectTo") ?? getDefaultRedirect(user_info)
//       console.log("Redirecting to:", redirectPath)

//       setTimeout(() => {
//         window.location.href = redirectPath
//         setLoading(false)
//       }, 100)
//     } catch (error) {
//       console.error("Erreur lors de la connexion:", error)
//       toast.error("Une erreur s'est produite lors de la connexion.", {
//         position: "top-right",
//         duration: 3000,
//       })
//       setLoading(false)
//     }
//   })

//   return { loading, login, control }
// }

// export default useLogin

import { useAuthContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import { AppContext } from "../../../AppContext";

const useLogin = () => {
  const { saveSession, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { urlApi } = useContext(AppContext);

  const loginFormSchema = yup.object({
    email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
    password: yup.string().required("Veuillez entrer votre mot de passe"),
  });

  const { control, handleSubmit , reset , setValue  } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const getDefaultRedirect = (userInfo) => {
    if (!userInfo) return "/auth/sign-in";
    if (userInfo.role === "main_user") return "/admin/dashboard";
    if (userInfo.role === "secondary_user" && userInfo.email ===  "alhussein.khouma@ccbm.sn" ) return "/gestion/dashboard";
    return "/auth/sign-in";
  };

  const login = handleSubmit(async (values) => {
    setLoading(true);

    try {
      console.log("Attempting login with:", values.email);

      const res = await fetch(urlApi + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.email, password: values.password }),
      });

      const response = await res.json();

      if (response.error) {
        toast.error(response.error, { position: "top-right", duration: 3000 });
        setLoading(false);
        return;
      }

      const { user_info, access_token, parent } = response;

      const redirectPath = searchParams.get("redirectTo") ?? getDefaultRedirect(user_info);
      if ( redirectPath === "/auth/sign-in") {
        toast.error("RH non trouvée", {
          position: "top-right",
          duration: 3000,
        });
        reset();
        setLoading(false);
        return navigate("/auth/sign-in");
      }


      if (!parent || parent.id === null) {
        toast.error("Vous n'êtes pas encore un responsable dans une entreprise.", {
          position: "top-right",
          duration: 3000,
        });
        await saveSession(null);
        setLoading(false);
        return navigate("/auth/sign-in");
      }

      if (!access_token) {
        throw new Error("Token d'accès non trouvé dans la réponse");
      }

      // Save session and wait for it to complete
      const sessionSaved = await saveSession(response);

      if (!sessionSaved) {
        console.error("Failed to save session");
        setLoading(false);
        return;
      }

      

      // Show success message first
      toast.success("Connexion réussie. Redirection...", {
        position: "top-right",
        duration: 2000,
      });
            
      setTimeout(() => {
        window.location.href = redirectPath;
        setLoading(false);
      }, 100);

    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      toast.error("Une erreur s'est produite lors de la connexion.", {
        position: "top-right",
        duration: 3000,
      });
      setLoading(false);
    }
  });

  return { loading, login, control , reset , setValue };
};

export default useLogin;
