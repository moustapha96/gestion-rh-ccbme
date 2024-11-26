// import { PageMetaData, TopNavBar } from "@/components";
// import Hero from "./components/Hero";
// import Brands from "./components/Brands";
// import Pricing from "./components/Pricing";
// import Services from "./components/Services";
// import FAQs from "./components/FAQs";
// import Authentifier from "./components/Authentifier";
// import Contact from "./components/Contact";
// import AboutUs from "./components/About";
// import { useAuthContext } from "../../../context/useAuthContext";
// import { useEffect } from "react";

// const AuthenticPage = () => {
//   const { session, isAuthenticated, } = useAuthContext();
//   useEffect(() => {

//     console.log(session, isAuthenticated);
//   })
//   return (
//     <>
//       <PageMetaData title="AuthenticPage" />

//       {/* <TopNavBar
//         menuItems={["home", "pricing", "services", "features", "testimonial", "authentifier"]}
//         position="fixed"
//         hasDownloadButton
//       /> */}
//       <TopNavBar
//         menuItems={[
//           "Accueil",
//           "A propos",
//           "Fonctionnalités",
//           "Nos Services",
//           "Tarification",
//           "Contact",
//           "FAQ",
//         ]}
//         position="fixed"
//         hasDownloadButton
//       />

//       <Hero />
//       <AboutUs />

//       <Authentifier />

//       <Brands />

//       <Services />

//       <Pricing />

//       {/* <Features /> */}

//       {/* <TestimonialSlider /> */}
//       <Contact />

//       <FAQs />
//       {/* <DiscoverServices /> */}
//     </>
//   );
// };

// export default AuthenticPage;




import { PageMetaData, TopNavBar } from "@/components";
import Hero from "./components/Hero";
import Brands from "./components/Brands";
import Pricing from "./components/Pricing";
import Services from "./components/Services";
import FAQs from "./components/FAQs";
import Authentifier from "./components/Authentifier";
import Contact from "./components/Contact";
import AboutUs from "./components/About";
import { useAuthContext } from "../../../context/useAuthContext";
import { useEffect } from "react";


const Dashboard = () => {
  const { session, isAuthenticated } = useAuthContext();

  useEffect(() => {
    console.log(session, isAuthenticated);
  }, [session, isAuthenticated]);

  return (
    <>
      <PageMetaData title="Dashboard CCBME" />
      <TopNavBar
        menuItems={["Accueil"]}
        position="fixed"
      />
      <AboutUs />
      {/* <Hero />
      <AboutUs />

      <Services />
      <Pricing />
      <Contact />
      <FAQs /> */}
    </>
  );
};

export default Dashboard;