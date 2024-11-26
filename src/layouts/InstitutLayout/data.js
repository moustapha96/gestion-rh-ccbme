import {
  LuAlertOctagon,
  LuArchive,
  LuComponent,
  LuFile,
  LuMessagesSquare,
  LuRadar,
  LuShieldOff,
  LuSnowflake,
  LuSquareDot,
  LuTarget,
  LuUsers,
} from "react-icons/lu";

import github from "@/assets/images/brand/github.png";
import bitbucket from "@/assets/images/brand/bitbucket.png";
import dropbox from "@/assets/images/brand/dropbox.png";
import slack from "@/assets/images/brand/slack.png";
import dribble from "@/assets/images/brand/dribbble.png";
import behance from "@/assets/images/brand/behance.png";
import { LucideBell } from "lucide-react";

const adminMenu = [
  {
    name: "Dashboard",
    link: "/institut/dashboard",
    icon: LuRadar,
  },
  {
    name: "Demandes",
    link: "/institut/demandes",
    icon: LuArchive,
  },
  {
    name: "Documents",
    link: "/institut/documents",
    icon: LuFile,
  },
    {
    name: "Authentifier",
    link: "/institut/authentifier",
    icon: LuSquareDot,
  },
   {
    name: "Faire une vérification",
    link: "/institut/verification",
    icon: LuSquareDot,
  },
  // {
  //   name: "Chat",
  //   link: "/institut/chat",
  //   icon: LuMessagesSquare,
  // },
   {
    name: "Transaction",
    link: "/institut/transactions",
    icon: LuSnowflake,
  },

  // {
  //   name: "Landing",
  //   link: "/",
  //   icon: LuSnowflake,
  // },
];

const demandeurMenu = [
   {
    name: "Chat",
    link: "/admin/chat",
    icon: LuMessagesSquare,
  },
  {
    name: "Project",
    link: "/admin/project",
    icon: LuTarget,
  },
  {
    name: "Ui Components",
    link: "/admin/ui-components",
    icon: LuComponent,
  },
]

const institutMenu = [
   {
    name: "Chat",
    link: "/admin/chat",
    icon: LuMessagesSquare,
  },
  {
    name: "Project",
    link: "/admin/project",
    icon: LuTarget,
  },
  {
    name: "Ui Components",
    link: "/admin/ui-components",
    icon: LuComponent,
  },
]


const messages = [
  {
    title: "Check this out!",
    description: " Please review this file.",
    variant: "primary",
    icon: LuAlertOctagon,
  },
  {
    title: "Congratulations!",
    description: "Your OS System successfully updated.",
    variant: "teal-500",
    icon: LuShieldOff,
  },
  {
    title: "An error occurred",
    description: " There was a problem in your code.",
    variant: "red-500",
    icon: LuShieldOff,
  },
   {
    title: "An error occurred",
    description: " There was a problem in your code.",
    variant: "red-500",
    icon: LuShieldOff,
  },
];

const apps = [
  {
    name: "GitHub",
    image: github,
  },
  {
    name: "Bitbucket",
    image: bitbucket,
  },
  {
    name: "Dropbox",
    image: dropbox,
  },
  {
    name: "Slack",
    image: slack,
  },
  {
    name: "Dribble",
    image: dribble,
  },
  {
    name: "Behance",
    image: behance,
  },
];

export { adminMenu, messages, apps };
