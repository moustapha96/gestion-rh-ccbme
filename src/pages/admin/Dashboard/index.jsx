
// import { useState, useEffect } from "react";
// import { AdminBreadcrumb } from "@/components";
// import ProgressCard from "./components/ProgressCard";
// import RecentOrders from "./components/RecentOrders";
// import RevenueChart from "./components/RevenueChart";
// import Sources from "./components/Sources";
// import Statistics from "./components/Statistics";
// import TopPerformers from "./components/TopPerformers";
// import { getAllDemandes } from "../../../services/demandeService";
// import { getAllDemandeurs } from "../../../services/demandeurService";
// import { getInstituts } from "../../../services/institutService";
// import { getAllDocuments } from "../../../services/documentService";
// import { useAuthContext } from "../../../context/useAuthContext";
// import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "../../../services/entrepriseFunctionService";


// const Dashboard = () => {

//   const { isAuthenticated, userInfo } = useAuthContext();
//   console.log(userInfo, isAuthenticated);

//   const [compte, setCompte] = useState([]);
//   const [commandeApprouve, setCommandeApprouve] = useState([]);
//   const [commandeECDV, setCommandeECDV] = useState([]);
//   const [commandeRejetes, setCommandeRejetes] = useState([]);
//   const [commandes, setCommandes] = useState([]);


//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [commandeApprouveData, commandeECDVData, commandeRejetesData] = await Promise.all([
//           getCommandeApprouveClientsEntreprise(userInfo.company_id),
//           getCommandeECDVClientsEntreprise(user.company_id),
//           getCommandeRejeteClientsEntreprise(user.company_id)
//         ]);
//         setCommandeApprouve(commandeApprouveData);
//         setCommandeECDV(commandeECDVData);
//         setCommandeRejetes(commandeRejetesData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };


//     fetchData();
//   }, [userInfo.company_id]);

//   if (loading) return <div className="flex justify-center items-center h-screen">Chargement du tableau de bord...</div>;
//   if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;

//   return (
//     <>
//       <AdminBreadcrumb title="Tableau de bord" />
//       <section>
//         <div className="container">
//           <div className="my-6 space-y-6">
//             <Statistics
//               demandesCount={demandes.length}
//               demandeursCount={demandeurs.length}
//               institutsCount={instituts.length}
//               documentsCount={documents.length}
//             />

//             <div className="grid gap-6 lg:grid-cols-2">
//               <ProgressCard demandes={demandes} />
//               <Sources instituts={instituts} />
//             </div>

//             {/* <div className="grid gap-6 lg:grid-cols-3">
//               <div className="lg:col-span-2">
//                 <RevenueChart demandes={demandes} />
//               </div>
//               <TopPerformers demandeurs={demandeurs} />
//             </div>
//             <div className="grid grid-cols-1">
//               <RecentOrders demandes={demandes} />
//             </div> */}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Dashboard;


import { useState, useEffect } from "react";
import { AdminBreadcrumb } from "@/components";
import ProgressCard from "./components/ProgressCard";
import RecentOrders from "./components/RecentOrders";
import RevenueChart from "./components/RevenueChart";
import Sources from "./components/Sources";
import Statistics from "./components/Statistics";
import TopPerformers from "./components/TopPerformers";
import { useAuthContext } from "@/context/useAuthContext";
import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "@/services/entrepriseFunctionService";

const Dashboard = () => {
  const { isAuthenticated, userInfo, parent } = useAuthContext();
  console.log(userInfo, isAuthenticated);

  const [commandeApprouve, setCommandeApprouve] = useState([]);
  const [commandeECDV, setCommandeECDV] = useState([]);
  const [commandeRejetes, setCommandeRejetes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(parent)
  console.log("parent")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commandeApprouveData, commandeECDVData, commandeRejetesData] = await Promise.all([
          getCommandeApprouveClientsEntreprise(parent.id),
          getCommandeECDVClientsEntreprise(parent.id),
          getCommandeRejeteClientsEntreprise(parent.id)
        ]);
        setCommandeApprouve(commandeApprouveData);
        console.log(commandeApprouveData + "approuve")
        setCommandeECDV(commandeECDVData);
        setCommandeRejetes(commandeRejetesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (parent) {
      fetchData();
    }
  }, [parent]);

  if (loading) return <div className="flex justify-center items-center h-screen">Chargement du tableau de bord...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-600">Erreur: {error}</div>;

  const totalCommandes = commandeApprouve.length + commandeECDV.length + commandeRejetes.length;
  console.log(totalCommandes)
  return (
    <>
      <AdminBreadcrumb title="Tableau de bord" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <Statistics
              commandesApprouvees={commandeApprouve.length}
              commandesEnCours={commandeECDV.length}
              commandesRejetees={commandeRejetes.length}
              totalCommandes={totalCommandes}
            />



            <div className="grid grid-cols-1">
              <RecentOrders orders={[...commandeApprouve, ...commandeECDV, ...commandeRejetes]} />
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;