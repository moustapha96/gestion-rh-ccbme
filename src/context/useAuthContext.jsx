// import { createContext, useContext, useState, useMemo, useCallback } from "react";
// import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next";

// const AuthContext = createContext(undefined);

// export function useAuthContext() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// }


// const authSessionKey = "__CCBME_RH_REACT_AUTH__";
// const authSessionKeyToken = "__CCBME_RH_REACT_AUTH__TOKEN";
// const authSessionKeyUserInfo = "__CCBME_RH_REACT_AUTH__USER_INFO";
// const authSessionKeySession = "__CCBME_RH_REACT_AUTH__SESSION";
// const authSessionKeyCompany = "__CCBME_RH_REACT_AUTH__COMPANY";
// const authSessionKeyUserContext = "__CCBME_RH_REACT_AUTH__USER_CONTEXT";
// const authSessionKeyIsVerified = "__CCBME_RH_REACT_AUTH__IS_VERIFIED";
// const authSessionKeyParentId = "__CCBME_RH_REACT_AUTH__PARET_ID";
// const authSessionKeyAvatar = "__CCBME_RH_REACT_AUTH_AVATAR";


// export function AuthProvider({ children }) {

//   const [profileImage, setProfileImage] = useState(() => {
//     const profilImageFromCookie = getCookie(authSessionKeyAvatar);
//     return profilImageFromCookie ? JSON.parse(profilImageFromCookie) : undefined;
//   });


//   const [parent, setParent] = useState(() => {
//     const parentFomCookies = getCookie(authSessionKeyParentId);
//     return parentFomCookies ? JSON.parse(parentFomCookies) : undefined;
//   });

//   const [company, setCompany] = useState(() => {
//     const companyFromCookie = getCookie(authSessionKeyCompany);
//     return companyFromCookie ? JSON.parse(companyFromCookie) : undefined;
//   });

//   const [userContext, setUserContext] = useState(() => {
//     const userContextFromCookie = getCookie(authSessionKeyUserContext);
//     return userContextFromCookie ? JSON.parse(userContextFromCookie) : undefined;
//   });

//   const [isVerified, setIsVerified] = useState(() => {
//     const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified);
//     return isVerifiedFromCookie ? JSON.parse(isVerifiedFromCookie) : undefined;
//   });


//   const [token, setToken] = useState(() => {
//     const tokenFromCookie = getCookie(authSessionKeyToken);
//     return tokenFromCookie ? JSON.parse(tokenFromCookie) : undefined;
//   });

//   const [userInfo, setUserInfo] = useState(() => {
//     const userInfoFromCookie = getCookie(authSessionKeyUserInfo);
//     return userInfoFromCookie ? JSON.parse(userInfoFromCookie) : undefined;
//   });

//   const [session, setSession] = useState(() => {
//     const sessionFromCookie = getCookie(authSessionKey);
//     return sessionFromCookie ? JSON.parse(sessionFromCookie) : undefined;
//   });

//   const saveSession = (data) => {

//     console.log(data)
//     setCookie(authSessionKey, JSON.stringify(data));
//     setCookie(authSessionKeyToken, JSON.stringify(data.access_token));
//     setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info));
//     setCookie(authSessionKeySession, JSON.stringify(data));
//     setCookie(authSessionKeyCompany, JSON.stringify(data.company));
//     setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified));
//     setCookie(authSessionKeyUserContext, JSON.stringify(data.user_context));
//     setCookie(authSessionKeyParentId, JSON.stringify(data.parent));


//     setToken(data.access_token);
//     setUserInfo(data.user_info);
//     setSession(data);
//     setCompany(data.company);
//     setIsVerified(data.is_verified);
//     setUserContext(data.user_context);
//     setParent(data.parent)

//     setProfileImage(data.user_info.avatar);
//   };

//   const saveUser = useCallback((userData) => {
//     setUser(prevUser => {
//       const updatedUser = { ...prevUser, ...userData }
//       localStorage.setItem(authSessionKeyUserInfo, JSON.stringify(updatedUser))
//       setCookie(authSessionKeyUserInfo, JSON.stringify(updatedUser))
//       return updatedUser
//     })
//   }, [])

//   const removeSession = () => {
//     deleteCookie(authSessionKey);
//     deleteCookie(authSessionKeyToken);
//     deleteCookie(authSessionKeyUserInfo);
//     deleteCookie(authSessionKey);
//     deleteCookie(authSessionKeyCompany);
//     deleteCookie(authSessionKeyIsVerified);
//     deleteCookie(authSessionKeyUserContext);
//     deleteCookie(authSessionKeyParentId);

//     setToken(undefined);
//     setUserInfo(undefined);
//     setSession(undefined);
//     setCompany(undefined);
//     setIsVerified(undefined);
//     setUserContext(undefined);
//     setParent(undefined);
//     setProfileImage(undefined);
//   };

//   const saveProfilImage = useCallback((image) => {
//     setProfileImage(image);
//     setCookie(authSessionKeyAvatar, JSON.stringify(image));
//     setSession(prevSession => ({
//       ...prevSession,
//       avatar: image
//     }));
//   }, []);


//   const logout = useCallback(async () => {
//     console.log("Logging out...");
//     removeSession();
//     localStorage.removeItem("user");
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("token");
//     localStorage.removeItem("uid");
//     localStorage.removeItem("expires_in");
//     localStorage.removeItem("is_verified");
//     localStorage.removeItem("refresh_expires_in");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("company_id");
//     localStorage.removeItem("user_context");
//     localStorage.removeItem("partner_id");
//     localStorage.removeItem("parent");
//     console.log("Logout complete");

//   }, [removeSession]);

//   const getToken = () => token;

//   return (
//     <AuthContext.Provider
//       value={useMemo(
//         () => ({
//           session,
//           logout,
//           token,
//           userInfo,
//           parent,
//           getToken,
//           saveSession,
//           saveUser,
//           isAuthenticated: hasCookie(authSessionKey),
//           company,
//           userContext,
//           isVerified,
//           getToken,
//           removeSession,
//           profileImage,
//           saveProfilImage,
//           logout,
//         }),
//         [session, token, userInfo, profileImage, saveProfilImage]
//       )}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }
"use client"

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next"

const AuthContext = createContext(undefined)

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

const authSessionKey = "__CCBME_RH_REACT_AUTH__"
const authSessionKeyToken = "__CCBME_RH_REACT_AUTH__TOKEN"
const authSessionKeyUserInfo = "__CCBME_RH_REACT_AUTH__USER_INFO"
const authSessionKeySession = "__CCBME_RH_REACT_AUTH__SESSION"
const authSessionKeyCompany = "__CCBME_RH_REACT_AUTH__COMPANY"
const authSessionKeyUserContext = "__CCBME_RH_REACT_AUTH__USER_CONTEXT"
const authSessionKeyIsVerified = "__CCBME_RH_REACT_AUTH__IS_VERIFIED"
const authSessionKeyParentId = "__CCBME_RH_REACT_AUTH__PARET_ID"
const authSessionKeyAvatar = "__CCBME_RH_REACT_AUTH_AVATAR"

export function AuthProvider({ children }) {
  // Add a dedicated state for authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check both cookies and localStorage
    return (
      (hasCookie(authSessionKey) || localStorage.getItem("isAuthenticated") === "true") &&
      (!!getCookie(authSessionKeyToken) || !!localStorage.getItem(authSessionKeyToken))
    )
  })

  const [profileImage, setProfileImage] = useState(() => {
    const profilImageFromCookie = getCookie(authSessionKeyAvatar)
    return profilImageFromCookie ? JSON.parse(profilImageFromCookie) : undefined
  })

  const [parent, setParent] = useState(() => {
    const parentFromCookies = getCookie(authSessionKeyParentId)
    const parentFromLocalStorage = localStorage.getItem(authSessionKeyParentId)
    return parentFromCookies
      ? JSON.parse(parentFromCookies)
      : parentFromLocalStorage
        ? JSON.parse(parentFromLocalStorage)
        : undefined
  })

  const [company, setCompany] = useState(() => {
    const companyFromCookie = getCookie(authSessionKeyCompany)
    const companyFromLocalStorage = localStorage.getItem(authSessionKeyCompany)
    return companyFromCookie
      ? JSON.parse(companyFromCookie)
      : companyFromLocalStorage
        ? JSON.parse(companyFromLocalStorage)
        : undefined
  })

  const [userContext, setUserContext] = useState(() => {
    const userContextFromCookie = getCookie(authSessionKeyUserContext)
    const userContextFromLocalStorage = localStorage.getItem(authSessionKeyUserContext)
    return userContextFromCookie
      ? JSON.parse(userContextFromCookie)
      : userContextFromLocalStorage
        ? JSON.parse(userContextFromLocalStorage)
        : undefined
  })

  const [isVerified, setIsVerified] = useState(() => {
    const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified)
    const isVerifiedFromLocalStorage = localStorage.getItem(authSessionKeyIsVerified)
    return isVerifiedFromCookie
      ? JSON.parse(isVerifiedFromCookie)
      : isVerifiedFromLocalStorage
        ? JSON.parse(isVerifiedFromLocalStorage)
        : undefined
  })

  const [token, setToken] = useState(() => {
    const tokenFromCookie = getCookie(authSessionKeyToken)
    const tokenFromLocalStorage = localStorage.getItem(authSessionKeyToken)
    return tokenFromCookie
      ? JSON.parse(tokenFromCookie)
      : tokenFromLocalStorage
        ? JSON.parse(tokenFromLocalStorage)
        : undefined
  })

  const [userInfo, setUserInfo] = useState(() => {
    const userInfoFromCookie = getCookie(authSessionKeyUserInfo)
    const userInfoFromLocalStorage = localStorage.getItem(authSessionKeyUserInfo)
    return userInfoFromCookie
      ? JSON.parse(userInfoFromCookie)
      : userInfoFromLocalStorage
        ? JSON.parse(userInfoFromLocalStorage)
        : undefined
  })

  const [session, setSession] = useState(() => {
    const sessionFromCookie = getCookie(authSessionKey)
    const sessionFromLocalStorage = localStorage.getItem(authSessionKey)
    return sessionFromCookie
      ? JSON.parse(sessionFromCookie)
      : sessionFromLocalStorage
        ? JSON.parse(sessionFromLocalStorage)
        : undefined
  })

  // Effect to update isAuthenticated when token changes
  useEffect(() => {
    const hasAuthCookie = hasCookie(authSessionKey)
    const hasAuthLocalStorage = localStorage.getItem("isAuthenticated") === "true"
    const hasToken = !!token
    console.log("Auth state check:", { hasAuthCookie, hasAuthLocalStorage, hasToken, token })
    setIsAuthenticated((hasAuthCookie || hasAuthLocalStorage) && hasToken)
  }, [token])

  // Make saveSession return a Promise to ensure we can wait for state updates
  const saveSession = useCallback((data) => {
    return new Promise((resolve) => {
      if (!data) {
        console.warn("saveSession called with null/undefined data")
        setIsAuthenticated(false)
        localStorage.removeItem("isAuthenticated")
        resolve(false)
        return
      }

      console.log("Saving session data:", data)

      // Set localStorage
      localStorage.setItem(authSessionKey, JSON.stringify(data))
      localStorage.setItem(authSessionKeyToken, JSON.stringify(data.access_token))
      localStorage.setItem(authSessionKeyUserInfo, JSON.stringify(data.user_info))
      localStorage.setItem("isAuthenticated", "true")

      if (data.company) {
        localStorage.setItem(authSessionKeyCompany, JSON.stringify(data.company))
      }

      if (data.is_verified !== undefined) {
        localStorage.setItem(authSessionKeyIsVerified, JSON.stringify(data.is_verified))
      }

      if (data.user_context) {
        localStorage.setItem(authSessionKeyUserContext, JSON.stringify(data.user_context))
      }

      if (data.parent) {
        localStorage.setItem(authSessionKeyParentId, JSON.stringify(data.parent))
      }

      // Set cookies
      setCookie(authSessionKey, JSON.stringify(data))
      setCookie(authSessionKeyToken, JSON.stringify(data.access_token))
      setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info))
      setCookie(authSessionKeySession, JSON.stringify(data))

      if (data.company) {
        setCookie(authSessionKeyCompany, JSON.stringify(data.company))
      }

      if (data.is_verified !== undefined) {
        setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified))
      }

      if (data.user_context) {
        setCookie(authSessionKeyUserContext, JSON.stringify(data.user_context))
      }

      if (data.parent) {
        setCookie(authSessionKeyParentId, JSON.stringify(data.parent))
      }

      // Update state
      setToken(data.access_token)
      setUserInfo(data.user_info)
      setSession(data)
      // Explicitly set isAuthenticated to true
      setIsAuthenticated(true)

      if (data.company) {
        setCompany(data.company)
      }

      if (data.is_verified !== undefined) {
        setIsVerified(data.is_verified)
      }

      if (data.user_context) {
        setUserContext(data.user_context)
      }

      if (data.parent) {
        setParent(data.parent)
      }

      if (data.user_info?.avatar) {
        setProfileImage(data.user_info.avatar)
        setCookie(authSessionKeyAvatar, JSON.stringify(data.user_info.avatar))
        localStorage.setItem(authSessionKeyAvatar, JSON.stringify(data.user_info.avatar))
      }

      // Use setTimeout to ensure state updates have been processed
      setTimeout(() => {
        console.log("Session saved successfully, isAuthenticated:", true)
        resolve(true)
      }, 50)
    })
  }, [])

  const saveUser = useCallback((userData) => {
    setUserInfo((prevUser) => {
      const updatedUser = { ...prevUser, ...userData }
      localStorage.setItem(authSessionKeyUserInfo, JSON.stringify(updatedUser))
      setCookie(authSessionKeyUserInfo, JSON.stringify(updatedUser))
      return updatedUser
    })
  }, [])

  const removeSession = useCallback(() => {
    // Clear cookies
    deleteCookie(authSessionKey)
    deleteCookie(authSessionKeyToken)
    deleteCookie(authSessionKeyUserInfo)
    deleteCookie(authSessionKeySession)
    deleteCookie(authSessionKeyCompany)
    deleteCookie(authSessionKeyIsVerified)
    deleteCookie(authSessionKeyUserContext)
    deleteCookie(authSessionKeyParentId)
    deleteCookie(authSessionKeyAvatar)

    // Clear localStorage
    localStorage.removeItem(authSessionKey)
    localStorage.removeItem(authSessionKeyToken)
    localStorage.removeItem(authSessionKeyUserInfo)
    localStorage.removeItem(authSessionKeySession)
    localStorage.removeItem(authSessionKeyCompany)
    localStorage.removeItem(authSessionKeyIsVerified)
    localStorage.removeItem(authSessionKeyUserContext)
    localStorage.removeItem(authSessionKeyParentId)
    localStorage.removeItem(authSessionKeyAvatar)
    localStorage.removeItem("isAuthenticated")

    // Update state
    setToken(undefined)
    setUserInfo(undefined)
    setSession(undefined)
    setCompany(undefined)
    setIsVerified(undefined)
    setUserContext(undefined)
    setParent(undefined)
    setProfileImage(undefined)
    setIsAuthenticated(false)
  }, [])

  const saveProfilImage = useCallback((image) => {
    setProfileImage(image)
    setCookie(authSessionKeyAvatar, JSON.stringify(image))
    localStorage.setItem(authSessionKeyAvatar, JSON.stringify(image))
    setSession((prevSession) => {
      if (!prevSession) return prevSession
      return {
        ...prevSession,
        avatar: image,
      }
    })
  }, [])

  const logout = useCallback(async () => {
    console.log("Logging out...")
    localStorage.clear()
    removeSession()
    console.log("Logout complete")
  }, [removeSession])

  const getToken = useCallback(() => token, [token])

  // Debug current auth state
  useEffect(() => {
    console.log("Auth state updated:", {
      isAuthenticated,
      hasToken: !!token,
      hasUserInfo: !!userInfo,
      userRole: userInfo?.role,
    })
  }, [isAuthenticated, token, userInfo])

  const contextValue = useMemo(
    () => ({
      session,
      logout,
      token,
      userInfo,
      parent,
      getToken,
      saveSession,
      saveUser,
      isAuthenticated,
      company,
      userContext,
      isVerified,
      removeSession,
      profileImage,
      saveProfilImage,
    }),
    [
      session,
      logout,
      token,
      userInfo,
      parent,
      getToken,
      saveSession,
      saveUser,
      isAuthenticated,
      company,
      userContext,
      isVerified,
      removeSession,
      profileImage,
      saveProfilImage,
    ],
  )

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
