import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next";

const AuthContext = createContext(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}


const authSessionKey = "__CCBME_RH_REACT_AUTH__";
const authSessionKeyToken = "__CCBME_RH_REACT_AUTH__TOKEN";
const authSessionKeyUserInfo = "__CCBME_RH_REACT_AUTH__USER_INFO";
const authSessionKeySession = "__CCBME_RH_REACT_AUTH__SESSION";
const authSessionKeyCompany = "__CCBME_RH_REACT_AUTH__COMPANY";
const authSessionKeyUserContext = "__CCBME_RH_REACT_AUTH__USER_CONTEXT";
const authSessionKeyIsVerified = "__CCBME_RH_REACT_AUTH__IS_VERIFIED";
const authSessionKeyParentId = "__CCBME_RH_REACT_AUTH__PARET_ID";
const authSessionKeyAvatar = "__CCBME_RH_REACT_AUTH_AVATAR";


export function AuthProvider({ children }) {

  const [profileImage, setProfileImage] = useState(() => {
    const profilImageFromCookie = getCookie(authSessionKeyAvatar);
    return profilImageFromCookie ? JSON.parse(profilImageFromCookie) : undefined;
  });


  const [parent, setParent] = useState(() => {
    const parentFomCookies = getCookie(authSessionKeyParentId);
    return parentFomCookies ? JSON.parse(parentFomCookies) : undefined;
  });

  const [company, setCompany] = useState(() => {
    const companyFromCookie = getCookie(authSessionKeyCompany);
    return companyFromCookie ? JSON.parse(companyFromCookie) : undefined;
  });

  const [userContext, setUserContext] = useState(() => {
    const userContextFromCookie = getCookie(authSessionKeyUserContext);
    return userContextFromCookie ? JSON.parse(userContextFromCookie) : undefined;
  });

  const [isVerified, setIsVerified] = useState(() => {
    const isVerifiedFromCookie = getCookie(authSessionKeyIsVerified);
    return isVerifiedFromCookie ? JSON.parse(isVerifiedFromCookie) : undefined;
  });


  const [token, setToken] = useState(() => {
    const tokenFromCookie = getCookie(authSessionKeyToken);
    return tokenFromCookie ? JSON.parse(tokenFromCookie) : undefined;
  });

  const [userInfo, setUserInfo] = useState(() => {
    const userInfoFromCookie = getCookie(authSessionKeyUserInfo);
    return userInfoFromCookie ? JSON.parse(userInfoFromCookie) : undefined;
  });

  const [session, setSession] = useState(() => {
    const sessionFromCookie = getCookie(authSessionKey);
    return sessionFromCookie ? JSON.parse(sessionFromCookie) : undefined;
  });

  const saveSession = (data) => {

    console.log(data)
    setCookie(authSessionKey, JSON.stringify(data));
    setCookie(authSessionKeyToken, JSON.stringify(data.access_token));
    setCookie(authSessionKeyUserInfo, JSON.stringify(data.user_info));
    setCookie(authSessionKeySession, JSON.stringify(data));
    setCookie(authSessionKeyCompany, JSON.stringify(data.company));
    setCookie(authSessionKeyIsVerified, JSON.stringify(data.is_verified));
    setCookie(authSessionKeyUserContext, JSON.stringify(data.user_context));
    setCookie(authSessionKeyParentId, JSON.stringify(data.parent));


    setToken(data.access_token);
    setUserInfo(data.user_info);
    setSession(data);
    setCompany(data.company);
    setIsVerified(data.is_verified);
    setUserContext(data.user_context);
    setParent(data.parent)

    setProfileImage(data.user.avatar);
  };

  const removeSession = () => {
    deleteCookie(authSessionKey);
    deleteCookie(authSessionKeyToken);
    deleteCookie(authSessionKeyUserInfo);
    deleteCookie(authSessionKey);
    deleteCookie(authSessionKeyCompany);
    deleteCookie(authSessionKeyIsVerified);
    deleteCookie(authSessionKeyUserContext);
    deleteCookie(authSessionKeyParentId);

    setToken(undefined);
    setUserInfo(undefined);
    setSession(undefined);
    setCompany(undefined);
    setIsVerified(undefined);
    setUserContext(undefined);
    setParent(undefined);
    setProfileImage(undefined);
  };

  const saveProfilImage = useCallback((image) => {
    setProfileImage(image);
    setCookie(authSessionKeyAvatar, JSON.stringify(image));
    setSession(prevSession => ({
      ...prevSession,
      avatar: image
    }));
  }, []);


  const logout = useCallback(async () => {
    console.log("Logging out...");
    removeSession();
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("is_verified");
    localStorage.removeItem("refresh_expires_in");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("company_id");
    localStorage.removeItem("user_context");
    localStorage.removeItem("partner_id");
    localStorage.removeItem("parent");
    console.log("Logout complete");

  }, [removeSession]);

  const getToken = () => token;

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          session,
          logout,
          token,
          userInfo,
          parent,
          getToken,
          saveSession,
          isAuthenticated: hasCookie(authSessionKey),
          company,
          userContext,
          isVerified,
          getToken,
          removeSession,
          profileImage,
          saveProfilImage,
          logout,
        }),
        [session, token, userInfo, profileImage, saveProfilImage]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}