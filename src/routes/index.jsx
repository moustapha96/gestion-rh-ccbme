import { lazy } from "react";
import AdminConfiguration from "../pages/admin/Configuration";

import AdminProfil from "../pages/admin/Profil";
import AdminCompte from "../pages/admin/Compte";


import AdminClient from "../pages/admin/Clients";
import AdminClientDetail from "../pages/admin/Clients/AdminClientDetail";
import AdminCommandesPending from "../pages/admin/Commandes/AdminCommandesPending";
import AdminCommandesRejetees from "../pages/admin/Commandes/AdminCommandesRejetees";
import AdminCommandesApprouvees from "../pages/admin/Commandes/AdminCommandesApprouvees";
import AdminPrecommandes from "../pages/admin/Commandes/AdminPrecommandes";
import AdminCommandes from "../pages/admin/Commandes/AdminCommandes";
import AdminCommandeDetails from "../pages/admin/Commandes/AdminCommandeDetails";
import AdminCommandesCredit from "../pages/admin/Commandes/AdminCommandesCredit";
import DashboardGestion from "@/pages/gestion/Dashboard";
import ContactGestion from "@/pages/gestion/Contact";
import CommandeGestion from "@/pages/gestion/Commande";
import ClientGestion from "@/pages/gestion/Client";
import RechercheGestion from "@/pages/gestion/Recherche";
import GestionCommandeDetails from "@/pages/gestion/Commande/Details";
import GestionClientDetails from "@/pages/gestion/Client/Details";
import CommentaireGestion from "@/pages/gestion/Commentaire";
import GestionProfile from "@/pages/gestion/Profile";


const HomePage = lazy(() => import("@/pages/home"));

// landing routes
const AuthenticPage = lazy(() => import("@/pages/landing/AuthenticPage"));


// admin routes
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
// auth routes
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const VerifyAccount = lazy(() => import("@/pages/auth/VerifyAccount"));
const Logout = lazy(() => import("@/pages/auth/Logout"));

const gestionRoutes = [
  {
    path: "/gestion/dashboard",
    element: <DashboardGestion />,
  },
  {
    path: "/gestion/contacts",
    element: <ContactGestion />,
  },
  {
    path: "/gestion/commandes",
    element: <CommandeGestion />,
  },
  {
    path: "/gestion/commandes/:id/details",
    element: <GestionCommandeDetails />,
  },
  {
    path: "/gestion/clients",
    element: <ClientGestion />,
  },
  {
    path: "/gestion/clients/:id/details",
    element: <GestionClientDetails />,
  },
  {
    path: "/gestion/recherches",
    element: <RechercheGestion />,
  },
  {
    path: "/gestion/commentaires",
    element: <CommentaireGestion />,
  },
  {
    path: "/gestion/profile",
    element: <GestionProfile />,
  }
]


const homeRoutes = [
  {
    path: "/home2",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <AuthenticPage />,
  },
];


const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    'path': '/admin/clients',
    element: <AdminClient />,
  },
  {
    'path': '/admin/clients/:id/details',
    element: <AdminClientDetail />,
  },
  {
    'path': '/admin/commandes-en-attentes',
    element: <AdminCommandesPending />,
  },
  {
    'path': '/admin/commandes-rejetees',
    element: <AdminCommandesRejetees />,
  },
  {
    'path': '/admin/commandes-a-credit',
    element: <AdminCommandesCredit />,
  },
  {
    'path': '/admin/commandes-approuvees',
    element: <AdminCommandesApprouvees />,
  },
  {
    'path': '/admin/precommandes',
    element: <AdminPrecommandes />,
  },
  {
    'path': '/admin/commandes',
    element: <AdminCommandes />,
  },
  {
    'path': '/admin/commandes/:id/details',
    element: <AdminCommandeDetails />,
  },
  {
    'path': '/admin/configurations',
    element: <AdminConfiguration />,
  },
  {
    'path': '/admin/profil',
    element: <AdminProfil />,
  },

  {
    'path': '/admin/comptes',
    element: <AdminCompte />,
  },

];

const authRoutes = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/new-rh",
    element: <SignIn />,
  },

  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },

  {
    path: "/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "/auth/reset-pass",
    element: <ResetPassword />,
  },
  {
    path: "/auth/forgot-pass",
    element: <ForgotPassword />,
  },
  {
    path: "/auth/logout",
    element: <Logout />,
  },
  {
    path: "/auth/verify-account",
    element: <VerifyAccount />
  }

];

export { adminRoutes, gestionRoutes, homeRoutes, authRoutes };
