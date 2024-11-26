import { toSentenceCase } from "@/helpers";
import { cn } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { LuLogIn, LuMenu, LuX, LuChevronDown } from "react-icons/lu"; // Import de l'icône de flèche
import { Link, useLocation } from "react-router-dom";
import logo_ccbm from "@/assets/logo.png";
import frFlag from "@/assets/images/landing/hosting/fr.png";
import enFlag from "@/assets/images/landing/hosting/en.png";
import esFlag from "@/assets/images/landing/hosting/es.png";
import deFlag from "@/assets/images/landing/hosting/de.png";
import itFlag from "@/assets/images/landing/hosting/it.png";

const translations = {
  fr: {
    Connexion: "Connexion",
  },
  en: {
    Connexion: "Login",
  },
  es: {
    Connexion: "Iniciar sesión",
  },
  de: {
    Connexion: "Anmelden",
  },
  it: {
    Connexion: "Accedi",
  },
};

const TopNavBar = ({ menuItems, position, hasDownloadButton }) => {
  const navbarRef = useRef(null);
  const { hash } = useLocation();
  const [activation, setActivation] = useState(menuItems[0]);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'fr'); // Récupérer la langue depuis localStorage
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang); // Sauvegarder la langue dans localStorage
    setShowDropdown(false);
  };

  const translate = (key) => translations[language][key] || key;

  const flags = {
    fr: frFlag,
    en: enFlag,
    es: esFlag,
    // de: deFlag,
    it: itFlag,
  };

  useEffect(() => {
    const handleScroll = () => {
      activeSection();
      if (navbarRef.current) {
        if (window.scrollY >= 80) navbarRef.current.classList.add("nav-sticky");
        else navbarRef.current.classList.remove("nav-sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);
    activeSection(); // Mettre à jour l'activation des sections au premier chargement

    const timeout = setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: "instant" });
      }
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("scroll", handleScroll); // Nettoyer l'événement lors du démontage
    };
  }, [hash, menuItems]);

  const activeSection = () => {
    const scrollY = window.scrollY;

    for (let i = menuItems.length - 1; i >= 0; i--) {
      const section = menuItems[i];
      const el = document.getElementById(section);
      if (el && el.offsetTop <= scrollY + 100) {
        setActivation(section);
        return;
      }
    }
  };

  return (
    <header
      ref={navbarRef}
      id="navbar"
      className={cn(
        position,
        "inset-x-0 top-0 z-[60] w-full border-b border-transparent bg-white transition-all duration-300 dark:bg-default-50 lg:bg-transparent [&.nav-sticky]:bg-white/90 [&.nav-sticky]:shadow-md [&.nav-sticky]:backdrop-blur-3xl dark:[&.nav-sticky]:bg-default-50/80"
      )}
    >
      <div className="flex h-full items-center py-4">
        <div className="container">
          <nav className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
            {/* Logo */}
            <div className="flex w-full items-center justify-between lg:w-auto">
              <Link to="/">
                <img
                  src={logo_ccbm}
                  alt="logo"
                  className="flex h-20 dark:hidden"
                />
                <img
                  src={logo_ccbm}
                  alt="logo"
                  className="hidden h-10 dark:flex"
                />
              </Link>
            </div>

            {/* Menu de navigation */}
            <ul className="menu relative mx-auto hidden grow items-center justify-center lg:flex">
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  className={cn(
                    "menu-item mx-2 text-default-800 transition-all duration-300 hover:text-primary [&.active]:text-rougeLogo",
                    activation === item && "active"
                  )}
                >
                  <a
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-medium capitalize lg:text-base"
                    href={`/#${item}`}
                  >
                    {toSentenceCase(item)}
                  </a>
                </li>
              ))}
            </ul>

            {/* <div className="relative flex items-center">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center cursor-pointer mr-4"
              >
                <img src={flags[language]} alt={`Drapeau ${language}`} className="w-6 h-6" />
                <LuChevronDown className="ml-1 text-default-600" />
              </div>
              {showDropdown && (
                <div className="absolute right-0 top-8 mt-2 w-24 bg-white border rounded shadow-md">
                  {Object.keys(flags).map(
                    (lang) =>
                      lang !== language && (
                        <div
                          key={lang}
                          onClick={() => handleLanguageChange(lang)}
                          className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-200"
                        >
                          <img src={flags[lang]} alt={lang} className="w-5 h-5 mr-2" />
                          <span>{lang.toUpperCase()}</span>
                        </div>
                      )
                  )}
                </div>
              )}
            </div> */}


            <div className="ms-auto hidden shrink gap-2 lg:inline-flex">
              <Link
                to="/auth/sign-in"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-1.5 text-base text-white transition-all hover:bg-rougeLogo"
              >
                <LuLogIn className="h-4 w-4 fill-white/40" />
                <span className="hidden sm:block">{translate("Connexion")}</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;