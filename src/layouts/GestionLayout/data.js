import {
  LuAlertOctagon,
  LuRadar,
  LuSearch,
  LuSettings,
  LuShieldOff,
  LuShoppingBag,
  LuUsers,
} from "react-icons/lu";


const gestionMenu = [
  {
    name: "Dashboard",
    link: "/gestion/dashboard",
    icon: LuRadar,
  },
  {
    name: "Client",
    link: "/gestion/clients",
    icon: LuUsers,
  },
  {
    name: "Commandes",
    link: "/gestion/commandes",
    icon: LuShoppingBag,
  },
  {
    name: "Commentaires",
    link: "/gestion/commentaires",
    icon: LuAlertOctagon,
  },

    {
    name: "Recherche",
    link: "/gestion/recherches",
    icon: LuSearch,
  },
  {
    name: "Profile",
    link: "/gestion/profile",
    icon: LuUsers,
  },
    
];


export { gestionMenu };
