import { AdminBreadcrumb } from "@/components";

import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "@/utils";
import { useAuthContext } from "@/context/useAuthContext";
import { getClientsEntreprise } from "@/services/entrepriseFunctionService";
import { setCompteEnable, setValidationAdhesion } from "../../../services/entrepriseFunctionService";
import { toast } from "sonner";
import { set } from "react-hook-form";

const AdminClient = () => {

    const { isAuthenticated, userInfo, parent } = useAuthContext();
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        if (userInfo && parent) {
            fetchClients(userInfo.id, parent.id);
        }
    }, [userInfo, parent]);

    console.log(userInfo, parent)
    console.log("userinfo")
    const fetchClients = async (idPartner, idParent) => {
        setLoading(true);
        try {
            const res = await getClientsEntreprise({ 'partner_id': idPartner, 'parent_id': idParent });
            const filtered = res.filter(client => client.id !== userInfo.id);
            setClients(filtered);
            console.log(res);
            console.log("clients", clients);
        } catch (error) {
            console.error("Error fetching clients:", error);
            setError("Une erreur est survenue lors du chargement des clients.");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div className="flex justify-center items-center h-screen">Chargement des clients...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(filter.toLowerCase()) ||
        client.email.toLowerCase().includes(filter.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleStatusChange = async (clientId, newStatus) => {

        if (!window.confirm("Confirmer la modification du statut du client ?")) {
            return;
        }

        const res = await setCompteEnable(clientId);
        if (res) {
            toast.success("Compte activé avec succes");
            fetchClients(userInfo.id);
        }
        console.log(`Desable client ${clientId}`);
    };

    const handleStatusAdhesion = async (clientId, newStatus) => {
        if (!window.confirm("Confirmer la modification du statut du client ?")) {
            return;
        }
        setLoadingStatus(true);
        const resultat = await setValidationAdhesion(clientId, newStatus);
        if (resultat) {

            toast.success("Opération reussie.", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            })
            fetchClients(userInfo.id, parent.id);
        } else {
            toast.error("Une erreur s'est produite lors de la modification du statut.", {
                position: "top-right",
                autoClose: 5000,
            })
        }
        setLoadingStatus(false);
    };

    const getAdhesionColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300'
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-300'
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-300'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300'
        }
    }


    return (
        <>
            <AdminBreadcrumb title="Liste des clients" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                    <h4 className="text-xl font-semibold text-gray-800 uppercase">Liste des Clients</h4>
                                </div> */}

                                <div className="p-6">
                                    <div className="flex mb-4">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Rechercher par nom ou email..."
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pays</th> */}
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adhésion</th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {currentItems.map((client) => (
                                                    <tr key={client.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{client.id}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.email}</td>
                                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.partner_city}</td> */}
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.partner_phone}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.country_name}</td>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm ">

                                                            {/* <select name="adhesion" id="adhesion" value={client.adhesion}
                                                                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
                                                                onChange={(e) => handleStatusAdhesion(client.id, e.target.value)}>
                                                                <option value="pending">En cours</option>
                                                                <option value="accepted">Accepté</option>
                                                                <option value="rejected">Rejeté</option>
                                                            </select> */}
                                                            <select
                                                                className={`block w-full pl-3 pr-10 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${getAdhesionColor(client.adhesion)}`}
                                                                value={client.adhesion}
                                                                onChange={(e) => handleStatusAdhesion(client.id, e.target.value)}
                                                            >
                                                                {loadingStatus ? (
                                                                    <option>Chargement...</option>
                                                                ) : <>

                                                                    <option value="pending">En cours</option>
                                                                    <option value="accepted">Accepté</option>
                                                                    <option value="rejected">Rejeté</option>
                                                                </>}
                                                            </select>

                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex  gap-2 ">
                                                            <Link
                                                                to={`/admin/clients/${client.id}/details`}
                                                                className="text-primary hover:text-blueLogo transition-colors duration-200"
                                                            >
                                                                Détails
                                                            </Link>

                                                            <button
                                                                onClick={() => handleStatusChange(client.id, !client.is_verified)}
                                                                className={`text-${client.is_verified ? 'red' : 'green'}-500   `}
                                                            >
                                                                {client.is_verified ? 'Désactiver' : 'Activer'}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-700">
                                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredClients.length)} sur {filteredClients.length} entrées
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className={cn(
                                                    "px-3 py-1 rounded-md",
                                                    currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                                )}
                                            >
                                                <LuChevronLeft className="h-5 w-5" />
                                            </button>
                                            {Array.from({ length: Math.ceil(filteredClients.length / itemsPerPage) }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={cn(
                                                        "px-3 py-1 rounded-md",
                                                        currentPage === index + 1 ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                                                    )}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === Math.ceil(filteredClients.length / itemsPerPage)}
                                                className={cn(
                                                    "px-3 py-1 rounded-md",
                                                    currentPage === Math.ceil(filteredClients.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
                                                )}
                                            >
                                                <LuChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminClient;