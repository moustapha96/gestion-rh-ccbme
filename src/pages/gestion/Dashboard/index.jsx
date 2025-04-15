import { useState, useEffect } from "react";
import { GestionBreadcrumb } from "@/components";
import ProgressCard from "./components/ProgressCard";
import RecentOrders from "./components/RecentOrders";
import RevenueChart from "./components/RevenueChart";
import Sources from "./components/Sources";
import Statistics from "./components/Statistics";
import TopPerformers from "./components/TopPerformers";
import { useAuthContext } from "@/context/useAuthContext";
import { getCommandeApprouveClientsEntreprise, getCommandeECDVClientsEntreprise, getCommandeRejeteClientsEntreprise } from "@/services/entrepriseFunctionService";
import { getClients, getCommandes, getCommentaires, getTermeRecherche } from "@/services/gestionService";

const DashboardGestion = () => {
  const [commandes, setCommandes] = useState([])
  const [clients, setClients] = useState([])
  const [termes, setTermes] = useState(0) // Changé pour stocker le nombre total de recherches
  const [commentaires, setCommentaires] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commandesRes, clientsRes, termesRes, commentairesRes] = await Promise.all([
          getCommandes(),
          getClients(),
          getTermeRecherche(),
          getCommentaires(),
        ])

        setCommandes(commandesRes)
        setClients(clientsRes)
        setCommentaires(commentairesRes)

        // Calculer le nombre total de recherches
        let totalRecherches = 0
        Object.values(termesRes).forEach((categories) => {
          Object.values(categories).forEach((items) => {
            Object.values(items).forEach((count) => {
              totalRecherches += count
            })
          })
        })

        setTermes(totalRecherches)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Une erreur est survenue lors du chargement des données")
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <GestionBreadcrumb title="Tableau de bord" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <Statistics
              commandes={commandes.length}
              clients={clients.length}
              termes={termes} // Maintenant c'est le nombre total de recherches
              commentaires={commentaires.length}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardGestion;