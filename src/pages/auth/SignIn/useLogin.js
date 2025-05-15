// // import { useAuthContext } from "@/context";
// // import { yupResolver } from "@hookform/resolvers/yup";
// // import { useContext, useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { useNavigate, useSearchParams } from "react-router-dom";
// // import { toast } from "sonner";
// // import * as yup from "yup";
// // import { AppContext } from "../../../AppContext";
// // import axios from "axios";

// // const useLogin = () => {
// //   const { isAuthenticated, userInfo ,saveSession } = useAuthContext();
  
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();
// //   const [searchParams] = useSearchParams();
// //   const { urlApi } = useContext(AppContext);

// //   console.log(isAuthenticated, userInfo);

// //   useEffect(() => {
// //     if (isAuthenticated  && userInfo.role == "secondary_user" && userInfo.email == "alhussein.khouma@ccbm.sn" ) {
// //       navigate("/gestion/dashboard");
// //     } else if (isAuthenticated && userInfo.role == "main_user") {
// //       navigate("/admin/dashboard");
// //     } else {
// //       navigate("/auth/sign-in");
// //     }
// //   }, [isAuthenticated, userInfo]);

// //   const loginFormSchema = yup.object({
// //     email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
// //     password: yup.string().required("Veuillez entrer votre mot de passe"),
// //   });

// //   const { control, handleSubmit } = useForm({
// //     resolver: yupResolver(loginFormSchema),
// //     defaultValues: {
// //       email: "",
// //       password: "",
// //     },
// //   });

// //   const redirectUrl = searchParams.get("redirectTo") ?? "/admin/dashboard";

// //   const login = handleSubmit(async (values) => {
// //     setLoading(true);
// //     console.log(values)


// //     try {
// //       const res = await fetch(urlApi + "auth/login", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ username: values.email, password: values.password }),
// //       });
// //       const response = await res.json();
// //       console.log(res)
// //       console.log(response)
// //       console.log("response")

// //       if(response.error){
// //         toast.error(response.error, {
// //           position: "top-right",
// //           duration: 3000,
// //         })
// //         return;
// //       }
// //       const role = response.user_info.role;
// //       const { user_info, access_token, parent } = response;
    

// //       console.log("response de la requette ", user_info, access_token, parent)
      
// //       if (!parent || parent.id === null) {
// //         toast.error("Vous n'etes pas encore un responsable dans une entreprise .", { position: "top-right", duration: 3000 });
// //         saveSession(null);
// //         navigate("/auth/login");
// //       }

// //       if (!access_token) {
// //         throw new Error("Token d'accès non trouvé dans la réponse");
// //       }
// //       if (user_info.role === "main_user" && parent) {
// //         saveSession(response);
// //         toast.success("Connexion réussie. Redirection...", { position: "top-right", duration: 2000 });
// //         navigate(redirectUrl);
// //       } else if (user_info.role === "secondary_user" && user_info.email === "alhussein.khouma@ccbm.sn") {
// //         saveSession(response);
// //         toast.success("Connexion réussie. Redirection...", { position: "top-right", duration: 2000 });
// //         navigate("/gestion/dashboard");
// //       }
// //       else {
// //         toast.error("Vous devez vous connecter en tant qu'utilisateur principal.", { position: "top-right", duration: 3000 });
// //         navigate("/auth/login");
// //       }
    
    
// //       // if (response.access_token && role == "main_user" && response.parent ) {
// //       //   saveSession(response);
// //       //   toast.success("Connexion réussie. Redirection...", {
// //       //     position: "top-right",
// //       //     duration: 2000,
// //       //   });
// //       //   navigate(redirectUrl);
// //       // } else if (role === "secondary_user" &&  response.user_info.email === "alhussein.khouma@ccbm.sn") {
// //       //   saveSession(response);
// //       //   toast.success("Connexion réussie. Redirection...", {
// //       //     position: "top-right",
// //       //     duration: 2000,
// //       //   });
// //       //   navigate("/gestion/dashboard");
// //       // } else {
// //       //    toast.error("Vous devez vous connecter en tant que utilisateur principal.", {
// //       //       position: "top-right",
// //       //       duration: 3000,
// //       //     })
// //       //     navigate("/auth/login");
// //       //   throw new Error("Token d'accès non trouvé dans la réponse");
// //       // }
// //     } catch (error) {
// //       if (error.response) {
// //         console.error('Error response:', error.response.data);
// //         console.error('Error status:', error.response.status);
// //         console.error('Error headers:', error.response.headers);

// //         if (error.response.status === 404) {
// //           toast.error("L'URL de l'API est introuvable. Veuillez vérifier la configuration.", {
// //             position: "top-right",
// //             duration: 3000,
// //           });
// //         } else {
// //           toast.error(error.response.data.message || "Une erreur s'est produite lors de la connexion.", {
// //             position: "top-right",
// //             duration: 2000,
// //           });
// //         }
// //       } else if (error.request) {
// //         console.error('Error request:', error.request);
// //         toast.error("Aucune réponse reçue du serveur. Veuillez vérifier votre connexion.", {
// //           position: "top-right",
// //           duration: 3000,
// //         });
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   });

// //   return { loading, login, control };
// // };

// // export default useLogin;

// "use client";

// import { useAuthContext } from "@/context";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "sonner";
// import * as yup from "yup";
// import { AppContext } from "../../../AppContext";

// const useLogin = () => {
//   const { isAuthenticated, userInfo, saveSession } = useAuthContext();
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { urlApi } = useContext(AppContext);

//   const redirectUrl = searchParams.get("redirectTo") ?? "/admin/dashboard";

//   console.log(isAuthenticated, userInfo);
//   useEffect(() => {
//     if (!isAuthenticated) return;

//     if (userInfo.role === "main_user") {
//       navigate("/admin/dashboard");
//     } else if (userInfo.role === "secondary_user" && userInfo.email === "alhussein.khouma@ccbm.sn") {
//       navigate("/gestion/dashboard");
//     } else {
//       toast.error("Accès refusé.");
//       navigate("/auth/login");
//     }

//   }, [ userInfo]);

//   const loginFormSchema = yup.object({
//     email: yup.string().email("Email invalide").required("Email requis"),
//     password: yup.string().required("Mot de passe requis"),
//   });

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(loginFormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const login = handleSubmit(async ({ email, password }) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${urlApi}auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username: email, password }),
//       });

//       const data = await res.json();

//       if (data.error) {
//         toast.error(data.error);
//         return;
//       }

//       const { user_info, access_token, parent } = data;

//       if (!access_token) {
//         throw new Error("Token d'accès manquant.");
//       }

//       if (!parent || !parent.id) {
//         toast.error("Aucune entreprise associée.");
//         return;
//       }

//       const isMainUser = user_info.role === "main_user" && parent;
//       const isAllowedSecondary = user_info.role === "secondary_user" && user_info.email === "alhussein.khouma@ccbm.sn";

//       if (user_info.role === "main_user" && parent) {
//         saveSession(data);
//         navigate("/admin/dashboard");
//       }else if (user_info.role === "secondary_user" && user_info.email === "alhussein.khouma@ccbm.sn") {
//         saveSession(data);
//         navigate("/gestion/dashboard");
//       } else {
//         toast.error("Rôle non autorisé.");
//         navigate("/auth/login");
//       }
    

//     } catch (err) {
//       console.error(err);
//       toast.error("Erreur de connexion. Vérifiez votre connexion ou les identifiants.");
//     } finally {
//       setLoading(false);
//     }
//   });

//   return { loading, login, control };
// };

// export default useLogin;



"use client"

import { useAuthContext } from "@/context"
import { yupResolver } from "@hookform/resolvers/yup"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"
import * as yup from "yup"
import { AppContext } from "../../../AppContext"

const useLogin = () => {
  const { saveSession, isAuthenticated } = useAuthContext()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { urlApi } = useContext(AppContext)

  const loginFormSchema = yup.object({
    email: yup.string().email("Veuillez entrer un email valide").required("Veuillez entrer votre email"),
    password: yup.string().required("Veuillez entrer votre mot de passe"),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const getDefaultRedirect = (userInfo) => {
    if (!userInfo) return "/auth/sign-in"
    if (userInfo.role === "main_user") return "/admin/dashboard"
    if (userInfo.role === "secondary_user") return "/gestion/dashboard"
    return "/auth/sign-in" // Changed from /auth/login
  }

  const login = handleSubmit(async (values) => {
    setLoading(true)

    try {
      console.log("Attempting login with:", values.email)

      const res = await fetch(urlApi + "auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.email, password: values.password }),
      })

      const response = await res.json()

      if (response.error) {
        toast.error(response.error, { position: "top-right", duration: 3000 })
        setLoading(false)
        return
      }

      const { user_info, access_token, parent } = response

      if (!parent || parent.id === null) {
        toast.error("Vous n'êtes pas encore un responsable dans une entreprise.", {
          position: "top-right",
          duration: 3000,
        })
        await saveSession(null)
        setLoading(false)
        return navigate("/auth/sign-in")
      }

      if (!access_token) {
        throw new Error("Token d'accès non trouvé dans la réponse")
      }

      // Show success message first
      toast.success("Connexion réussie. Redirection...", {
        position: "top-right",
        duration: 2000,
      })

      console.log("Login successful, saving session...")

      // Save session and wait for it to complete
      const sessionSaved = await saveSession(response)

      if (!sessionSaved) {
        console.error("Failed to save session")
        setLoading(false)
        return
      }

      console.log("Session saved successfully, isAuthenticated:", isAuthenticated)

      // Get redirect path
      const redirectPath = searchParams.get("redirectTo") ?? getDefaultRedirect(user_info)
      console.log("Redirecting to:", redirectPath)

      // Add a small delay to ensure all state updates have propagated
      setTimeout(() => {
        // Force a window reload to ensure all auth state is properly updated
        // This is a more reliable approach than just using navigate
        window.location.href = redirectPath
        setLoading(false)
      }, 100)
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      toast.error("Une erreur s'est produite lors de la connexion.", {
        position: "top-right",
        duration: 3000,
      })
      setLoading(false)
    }
  })

  return { loading, login, control }
}

export default useLogin
