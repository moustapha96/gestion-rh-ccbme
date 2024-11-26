import TopNavBar from "@/components/TopNavBar";
import AdminDemos from "./AdminDemos";
import Features from "./Features";
import Hero from "./Hero";
import LandingDemos from "./LandingDemos";
import SecurityDemos from "./SecurityDemos";
import Footer from "./Footer";
const Home = () => {
  return (
    <>
      <TopNavBar menuItems={["home", "demos", "features"]} position="fixed" />

      <Hero />

      <LandingDemos />

      <AdminDemos />

      <SecurityDemos />

      <Features />

      <Footer />
    </>
  );
};

export default Home;
