// import { GestionBreadcrumb } from "@/components";
// import { useState, useEffect } from "react";
// import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { cn } from "@/utils";
// import { useAuthContext } from "@/context/useAuthContext";
// import { CheckCircle, Package, Truck, XCircle } from "lucide-react";
// import { getCommandes } from "@/services/gestionService";

// const CommandeGestion = () => {
//     const orderType = 'order';
//     const { isAuthenticated, userInfo, parent } = useAuthContext();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     console.log(parent)
//     useEffect(() => {
//         const fetchCommandes = async () => {
//             setLoading(true);
//             try {
//                 let res = await getCommandes();
//                 setOrders(res);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//                 setError("Une erreur est survenue lors du chargement des commandes.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCommandes();
//     }, []);



//     if (loading) return <div className="flex justify-center items-center h-screen">Chargement des commandes...</div>;
//     if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;

//     const filteredOrders = orders.filter(order =>
//         order.name.toLowerCase().includes(filter.toLowerCase()) ||
//         order.partner_name.toLowerCase().includes(filter.toLowerCase())
//     );

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     const getStatusIcon = (status) => {
//         switch (status.toLowerCase()) {
//             case 'sale':
//                 return <CheckCircle className="w-5 h-5 text-green-500" />;
//             case 'cancel':
//                 return <XCircle className="w-5 h-5 text-red-500" />;
//             case 'draft':
//                 return <Package className="w-5 h-5 text-yellow-500" />;
//             default:
//                 return <Truck className="w-5 h-5 text-blue-500" />;
//         }
//     };

//     const getStatusText = (status) => {
//         switch (status.toLowerCase()) {
//             case 'sale':
//                 return 'Confirmé';
//             case 'cancel':
//                 return 'Annulé';
//             case 'draft':
//                 return 'Brouillon';
//             default:
//                 return 'En cours';
//         }
//     };

//     const getStatusTextValidation = (status) => {
//         switch (status.toLowerCase()) {
//             case 'pending':
//                 return 'En cours de validation';
//             case 'validated':
//                 return 'Validé';
//             case 'rejected':
//                 return 'Rejeté';
//             default:
//                 return 'En cours';
//         }
//     };

//     const getStatusIconValidation = (status) => {
//         switch (status.toLowerCase()) {
//             case 'pending':
//                 return <XCircle className="w-5 h-5 text-yellow-500" />;
//             case 'validated':
//                 return <CheckCircle className="w-5 h-5 text-green-500" />;
//             case 'rejected':
//                 return <XCircle className="w-5 h-5 text-red-500" />;
//             default:
//                 return <Truck className="w-5 h-5 text-blue-500" />;
//         }
//     }




//     return (
//         <>
//             <GestionBreadcrumb title="Gestion des commandes" />
//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="grid grid-cols-1">
//                             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                                 <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                                     <h4 className="text-xl font-semibold text-gray-800 uppercase">
//                                         Liste des Commandes
//                                     </h4>
//                                 </div>

//                                 <div className="p-6">
//                                     <div className="flex mb-4">
//                                         <div className="relative flex-1">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Rechercher par numéro de commande ou nom du client..."
//                                                 value={filter}
//                                                 onChange={(e) => setFilter(e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                                             />
//                                             <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                     </div>

//                                     <div className="overflow-x-auto">
//                                         <table className="min-w-full divide-y divide-gray-200">
//                                             <thead className="bg-gray-50">
//                                                 <tr>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numéro</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white divide-y divide-gray-200">
//                                                 {currentItems.map((order) => (
//                                                     <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.type_sale}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {new Date(order.date_order).toLocaleDateString()}
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {order.amount_total ? order.amount_total.toLocaleString() : 0} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                             <div className="flex items-center">
//                                                                 {getStatusIcon(order.state)}
//                                                                 <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
//                                                             </div>
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap">
//                                                             <div className="flex items-center">
//                                                                 {getStatusIconValidation(order.validation_rh_state)}
//                                                                 <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_rh_state)}</span>
//                                                             </div>
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                             <Link
//                                                                 to={`/gestion/commandes/${order.id}/details`}
//                                                                 className="text-primary hover:text-primary-700 transition-colors duration-200"
//                                                             >
//                                                                 Détails
//                                                             </Link>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>

//                                     <div className="flex items-center justify-between mt-4">
//                                         <div className="text-sm text-gray-700">
//                                             Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredOrders.length)} sur {filteredOrders.length} entrées
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <button
//                                                 onClick={() => paginate(currentPage - 1)}
//                                                 disabled={currentPage === 1}
//                                                 className={cn(
//                                                     "px-3 py-1 rounded-md",
//                                                     currentPage === 1 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                                 )}
//                                             >
//                                                 <LuChevronLeft className="h-5 w-5" />
//                                             </button>
//                                             {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }).map((_, index) => (
//                                                 <button
//                                                     key={index}
//                                                     onClick={() => paginate(index + 1)}
//                                                     className={cn(
//                                                         "px-3 py-1 rounded-md",
//                                                         currentPage === index + 1 ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50"
//                                                     )}
//                                                 >
//                                                     {index + 1}
//                                                 </button>
//                                             ))}
//                                             <button
//                                                 onClick={() => paginate(currentPage + 1)}
//                                                 disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
//                                                 className={cn(
//                                                     "px-3 py-1 rounded-md",
//                                                     currentPage === Math.ceil(filteredOrders.length / itemsPerPage) ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-gray-50"
//                                                 )}
//                                             >
//                                                 <LuChevronRight className="h-5 w-5" />
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };





// export default CommandeGestion;

"use client"

import { GestionBreadcrumb } from "@/components"
import { useState, useEffect } from "react"
import { LuSearch, LuChevronLeft, LuChevronRight, LuMoreHorizontal } from "react-icons/lu"
import { Link } from "react-router-dom"
import { cn } from "@/utils"
import { useAuthContext } from "@/context/useAuthContext"
import { CheckCircle, Package, Truck, XCircle } from "lucide-react"
import { getCommandes } from "@/services/gestionService"

const CommandeGestion = () => {
    const orderType = "order"
    const { isAuthenticated, userInfo, parent } = useAuthContext()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    useEffect(() => {
        const fetchCommandes = async () => {
            setLoading(true)
            try {
                const res = await getCommandes()
                setOrders(res)
            } catch (error) {
                console.error("Error fetching orders:", error)
                setError("Une erreur est survenue lors du chargement des commandes.")
            } finally {
                setLoading(false)
            }
        }

        fetchCommandes()
    }, [])

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [filter])

    if (loading) return <div className="flex justify-center items-center h-screen">Chargement des commandes...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>

    const filteredOrders = orders.filter(
        (order) =>
            order.name.toLowerCase().includes(filter.toLowerCase()) ||
            order.partner_name.toLowerCase().includes(filter.toLowerCase()),
    )

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) return
        setCurrentPage(pageNumber)
    }

    // Génère les boutons de pagination avec un nombre limité de pages affichées
    const renderPaginationButtons = () => {
        const pageButtons = []
        const maxVisibleButtons = 5 // Nombre maximum de boutons à afficher

        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
        const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

        // Ajuster si on est proche de la fin
        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1)
        }

        // Ajouter le premier bouton et éventuellement les points de suspension
        if (startPage > 1) {
            pageButtons.push(
                <button
                    key="1"
                    onClick={() => paginate(1)}
                    className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                >
                    1
                </button>,
            )

            if (startPage > 2) {
                pageButtons.push(
                    <span key="start-ellipsis" className="px-2 py-1">
                        <LuMoreHorizontal className="h-5 w-5 text-gray-400" />
                    </span>,
                )
            }
        }

        // Ajouter les boutons de page
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={cn(
                        "px-3 py-1 rounded-md",
                        currentPage === i ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-50",
                    )}
                >
                    {i}
                </button>,
            )
        }

        // Ajouter les points de suspension et le dernier bouton si nécessaire
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageButtons.push(
                    <span key="end-ellipsis" className="px-2 py-1">
                        <LuMoreHorizontal className="h-5 w-5 text-gray-400" />
                    </span>,
                )
            }

            pageButtons.push(
                <button
                    key={totalPages}
                    onClick={() => paginate(totalPages)}
                    className="px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                >
                    {totalPages}
                </button>,
            )
        }

        return pageButtons
    }

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case "sale":
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case "cancel":
                return <XCircle className="w-5 h-5 text-red-500" />
            case "draft":
                return <Package className="w-5 h-5 text-yellow-500" />
            default:
                return <Truck className="w-5 h-5 text-blue-500" />
        }
    }

    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case "sale":
                return "Confirmé"
            case "cancel":
                return "Annulé"
            case "draft":
                return "Brouillon"
            default:
                return "En cours"
        }
    }

    const getStatusTextValidation = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "En cours de validation"
            case "validated":
                return "Validé"
            case "rejected":
                return "Rejeté"
            default:
                return "En cours"
        }
    }

    const getStatusIconValidation = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return <XCircle className="w-5 h-5 text-yellow-500" />
            case "validated":
                return <CheckCircle className="w-5 h-5 text-green-500" />
            case "rejected":
                return <XCircle className="w-5 h-5 text-red-500" />
            default:
                return <Truck className="w-5 h-5 text-blue-500" />
        }
    }

    return (
        <>
            <GestionBreadcrumb title="Gestion des commandes" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                    <h4 className="text-xl font-semibold text-gray-800 uppercase">Liste des Commandes</h4>
                                </div>

                                <div className="p-6">
                                    <div className="flex mb-4">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Rechercher par numéro de commande ou nom du client..."
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
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Numéro
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Type
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Client
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Total
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Statut
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Validation
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {currentItems.length > 0 ? (
                                                    currentItems.map((order) => (
                                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {order.name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {order.type_sale}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {order.partner_name}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {new Date(order.date_order).toLocaleDateString()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {order.amount_total ? order.amount_total.toLocaleString() : 0} FCFA
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    {getStatusIcon(order.state)}
                                                                    <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    {getStatusIconValidation(order.validation_rh_state)}
                                                                    <span className="ml-2 capitalize">
                                                                        {getStatusTextValidation(order.validation_rh_state)}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <Link
                                                                    to={`/gestion/commandes/${order.id}/details`}
                                                                    className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                                >
                                                                    Détails
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                                                            Aucune commande trouvée
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredOrders.length > 0 && (
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                                            <div className="text-sm text-gray-700">
                                                Affichage de {filteredOrders.length > 0 ? indexOfFirstItem + 1 : 0} à{" "}
                                                {Math.min(indexOfLastItem, filteredOrders.length)} sur {filteredOrders.length} entrées
                                            </div>
                                            <div className="flex items-center justify-center sm:justify-end space-x-1">
                                                <button
                                                    onClick={() => paginate(currentPage - 1)}
                                                    disabled={currentPage === 1}
                                                    className={cn(
                                                        "px-3 py-1 rounded-md",
                                                        currentPage === 1
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-white text-gray-700 hover:bg-gray-50",
                                                    )}
                                                    aria-label="Page précédente"
                                                >
                                                    <LuChevronLeft className="h-5 w-5" />
                                                </button>

                                                {renderPaginationButtons()}

                                                <button
                                                    onClick={() => paginate(currentPage + 1)}
                                                    disabled={currentPage === totalPages}
                                                    className={cn(
                                                        "px-3 py-1 rounded-md",
                                                        currentPage === totalPages
                                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                            : "bg-white text-gray-700 hover:bg-gray-50",
                                                    )}
                                                    aria-label="Page suivante"
                                                >
                                                    <LuChevronRight className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CommandeGestion

