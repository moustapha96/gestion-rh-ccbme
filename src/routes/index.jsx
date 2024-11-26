import { lazy } from "react";
import AdminConfiguration from "../pages/admin/Configuration";

import SignUpInstitut from "../pages/auth/SignUpInstitut";
import SignUpDemandeur from "../pages/auth/SignUpDemandeur";
import AdminProfil from "../pages/admin/Profil";
import AdminCompte from "../pages/admin/Compte";
import ActivatedAccount from "../pages/auth/activated";
import InvitationInstitut from "../pages/auth/InvitationInstitut";

import AdminClient from "../pages/admin/Clients";
import AdminClientDetail from "../pages/admin/Clients/AdminClientDetail";
import AdminCommandesPending from "../pages/admin/Commandes/AdminCommandesPending";
import AdminCommandesRejetees from "../pages/admin/Commandes/AdminCommandesRejetees";
import AdminCommandesApprouvees from "../pages/admin/Commandes/AdminCommandesApprouvees";
import AdminPrecommandes from "../pages/admin/Commandes/AdminPrecommandes";
import AdminCommandes from "../pages/admin/Commandes/AdminCommandes";
import AdminCommandeDetails from "../pages/admin/Commandes/AdminCommandeDetails";
import AdminCommandesCredit from "../pages/admin/Commandes/AdminCommandesCredit";


const HomePage = lazy(() => import("@/pages/home"));

// landing routes
const AuthenticPage = lazy(() => import("@/pages/landing/AuthenticPage"));
const NouvelleDemandePage = lazy(() => import("@/pages/landing/NouvelleDemande"));



// admin routes
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));
// auth routes
const SignIn = lazy(() => import("@/pages/auth/SignIn"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const Logout = lazy(() => import("@/pages/auth/Logout"));


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

const AuthenticPageRoutes = [
  {
    path: "/",
    element: <AuthenticPage />,
  },
  {
    path: "/nouvelle-demande",
    element: <NouvelleDemandePage />,
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
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/institut",
    element: <SignUpInstitut />,
  },
  {
    path: "/auth/demandeur",
    element: <SignUpDemandeur />,
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
    path: "/activate",
    element: <ActivatedAccount />
  },
  {
    path: "/invitation-institut",
    element: <InvitationInstitut />
  }

  // 
];

export { adminRoutes, homeRoutes, authRoutes, AuthenticPageRoutes };
