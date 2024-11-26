import { PageMetaData, TopNavBar } from "@/components";
import Document from "./components/Document";


const PrivacyPolicyPage = () => {
  return (
    <>
      <PageMetaData title="Privacy Policy" />

      <TopNavBar
        menuItems={[
          "Accueil",
          "A propos",
          "Fonctionnalités",
          "Nos Services",
          "Tarification",
          "Contact",
          "FAQ",
        ]}
        position="fixed"
        hasDownloadButton
      />

      <Document />
    </>
  );
};

export default PrivacyPolicyPage;
