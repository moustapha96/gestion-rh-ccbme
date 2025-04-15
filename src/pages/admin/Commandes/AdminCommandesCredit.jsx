
// import { AdminBreadcrumb } from "@/components";
// import { useState, useEffect } from "react";
// import { LuSearch, LuChevronLeft, LuChevronRight } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { cn } from "@/utils";
// import { useAuthContext } from "@/context/useAuthContext";

// import { CheckCircle, Package, Truck, XCircle } from "lucide-react";
// import { getCommandesCreditClientsEntreprise } from "../../../services/entrepriseFunctionService";

// const AdminCommandesCredit = () => {
//     const { isAuthenticated, userInfo, parent } = useAuthContext();
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [filter, setFilter] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(10);

//     useEffect(() => {
//         const fetchOrders = async (id) => {
//             setLoading(true);
//             try {
//                 let res = await getCommandesCreditClientsEntreprise(id);
//                 setOrders(res);
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//                 setError("Une erreur est survenue lors du chargement des commandes.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         if (userInfo && parent.id) {
//             fetchOrders(parent.id);
//         }
//     }, [userInfo, parent]);

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

//     const getStatusColor = (status) => {
//         switch (status) {
//             case 'approved':
//                 return 'bg-green-100 text-green-800';
//             case 'pending':
//                 return 'bg-yellow-100 text-yellow-800';
//             case 'rejected':
//                 return 'bg-red-100 text-red-800';
//             default:
//                 return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const sommeEchoue = (orders) => {
//         let somme = 0;
//         if (orders.first_payment_date > Date.now()) {
//             somme += orders.first_payment_amount;
//         } else if (orders.second_payment_date > Date.now()) {
//             somme += orders.second_payment_amount;
//         } else if (orders.third_payment_date > Date.now()) {
//             somme += orders.third_payment_amount;
//         } else if (orders.fourth_payment_date > Date.now()) {
//             somme += orders.fourth_payment_amount;
//         }
//         return somme;
//     }


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
//                 return 'En cours';
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
//             <AdminBreadcrumb title="Liste des Commandes à credit" />
//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="grid grid-cols-1">
//                             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                                 <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                                     <h4 className="text-xl font-semibold text-gray-800 uppercase">
//                                         Liste des Commandes à credit
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
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validation</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impayé</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Echoue</th>
//                                                     <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white divide-y divide-gray-200">
//                                                 {currentItems.map((order) => (
//                                                     <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {new Date(order.date_order).toLocaleDateString()}
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
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {order.amount_total.toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {order.amount_residual.toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {(sommeEchoue(order)).toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                             <Link
//                                                                 to={`/admin/commandes/${order.id}/details`}
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
//             </section >
//         </>
//     );
// };




// export default AdminCommandesCredit;




// import { AdminBreadcrumb } from "@/components"
// import { useState, useEffect } from "react"
// import { LuSearch, LuChevronLeft, LuChevronRight, LuFilter } from "react-icons/lu"
// import { Link } from "react-router-dom"
// import { cn } from "@/utils"
// import { useAuthContext } from "@/context/useAuthContext"

// import { CheckCircle, Package, Truck, XCircle } from "lucide-react"
// import { getCommandesCreditClientsEntreprise } from "../../../services/entrepriseFunctionService"

// const AdminCommandesCredit = () => {
//     const { isAuthenticated, userInfo, parent } = useAuthContext()
//     const [orders, setOrders] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [filter, setFilter] = useState("")
//     const [currentPage, setCurrentPage] = useState(1)
//     const [itemsPerPage] = useState(10)
//     const [filters, setFilters] = useState({
//         orderNumber: "",
//         clientName: "",
//         status: "",
//         validationState: "",
//         startDate: "",
//         endDate: "",
//     })

//     useEffect(() => {
//         const fetchOrders = async (id) => {
//             setLoading(true)
//             try {
//                 const res = await getCommandesCreditClientsEntreprise(id)
//                 setOrders(res)
//                 console.log(res)
//             } catch (error) {
//                 console.error("Error fetching orders:", error)
//                 setError("Une erreur est survenue lors du chargement des commandes.")
//             } finally {
//                 setLoading(false)
//             }
//         }
//         if (userInfo && parent.id) {
//             fetchOrders(parent.id)
//         }
//     }, [userInfo, parent])

//     if (loading) return <div className="flex justify-center items-center h-screen">Chargement des commandes...</div>
//     if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>

//     const filteredOrders = orders.filter(
//         (order) =>
//             (filters.orderNumber === "" || order.name.toLowerCase().includes(filters.orderNumber.toLowerCase())) &&
//             (filters.clientName === "" || order.partner_name.toLowerCase().includes(filters.clientName.toLowerCase())) &&
//             (filters.status === "" || order.state.toLowerCase() === filters.status.toLowerCase()) &&
//             (filters.validationState === "" ||
//                 order.validation_rh_state.toLowerCase() === filters.validationState.toLowerCase()) &&
//             (filters.startDate === "" || new Date(order.date_order) >= new Date(filters.startDate)) &&
//             (filters.endDate === "" || new Date(order.date_order) <= new Date(filters.endDate)),
//     )

//     const indexOfLastItem = currentPage * itemsPerPage
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage
//     const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

//     const paginate = (pageNumber) => setCurrentPage(pageNumber)

//     const handleFilterChange = (key, value) => {
//         setFilters((prev) => ({ ...prev, [key]: value }))
//         setCurrentPage(1)
//     }

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "approved":
//                 return "bg-green-100 text-green-800"
//             case "pending":
//                 return "bg-yellow-100 text-yellow-800"
//             case "rejected":
//                 return "bg-red-100 text-red-800"
//             default:
//                 return "bg-gray-100 text-gray-800"
//         }
//     }

//     const sommeEchoue = (orders) => {
//         let somme = 0
//         if (orders.first_payment_date > Date.now()) {
//             somme += orders.first_payment_amount
//         } else if (orders.second_payment_date > Date.now()) {
//             somme += orders.second_payment_amount
//         } else if (orders.third_payment_date > Date.now()) {
//             somme += orders.third_payment_amount
//         } else if (orders.fourth_payment_date > Date.now()) {
//             somme += orders.fourth_payment_amount
//         }
//         return somme
//     }

//     const getStatusIcon = (status) => {
//         switch (status.toLowerCase()) {
//             case "sale":
//                 return <CheckCircle className="w-5 h-5 text-green-500" />
//             case "cancel":
//                 return <XCircle className="w-5 h-5 text-red-500" />
//             case "draft":
//                 return <Package className="w-5 h-5 text-yellow-500" />
//             default:
//                 return <Truck className="w-5 h-5 text-blue-500" />
//         }
//     }

//     const getStatusText = (status) => {
//         switch (status.toLowerCase()) {
//             case "sale":
//                 return "Confirmé"
//             case "cancel":
//                 return "Annulé"
//             case "draft":
//                 return "Brouillon"
//             default:
//                 return "En cours"
//         }
//     }

//     const getStatusTextValidation = (status) => {
//         switch (status.toLowerCase()) {
//             case "pending":
//                 return "En cours"
//             case "validated":
//                 return "Validé"
//             case "rejected":
//                 return "Rejeté"
//             default:
//                 return "En cours"
//         }
//     }

//     const getStatusIconValidation = (status) => {
//         switch (status.toLowerCase()) {
//             case "pending":
//                 return <XCircle className="w-5 h-5 text-yellow-500" />
//             case "validated":
//                 return <CheckCircle className="w-5 h-5 text-green-500" />
//             case "rejected":
//                 return <XCircle className="w-5 h-5 text-red-500" />
//             default:
//                 return <Truck className="w-5 h-5 text-blue-500" />
//         }
//     }

//     return (
//         <>
//             <AdminBreadcrumb title="Liste des Commandes à credit" />
//             <section>
//                 <div className="container">
//                     <div className="my-6 space-y-6">
//                         <div className="grid grid-cols-1">
//                             <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//                                 <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
//                                     <h4 className="text-xl font-semibold text-gray-800 uppercase">Liste des Commandes à credit</h4>
//                                 </div>

//                                 <div className="p-6">
//                                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Numéro de commande"
//                                                 value={filters.orderNumber}
//                                                 onChange={(e) => handleFilterChange("orderNumber", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                                             />
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Nom du client"
//                                                 value={filters.clientName}
//                                                 onChange={(e) => handleFilterChange("clientName", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                                             />
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                         <div className="relative">
//                                             <select
//                                                 value={filters.status}
//                                                 onChange={(e) => handleFilterChange("status", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
//                                             >
//                                                 <option value="">Tous les statuts</option>
//                                                 <option value="sale">Confirmé</option>
//                                                 <option value="cancel">Annulé</option>
//                                                 <option value="draft">Brouillon</option>
//                                             </select>
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                         <div className="relative">
//                                             <select
//                                                 value={filters.validationState}
//                                                 onChange={(e) => handleFilterChange("validationState", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
//                                             >
//                                                 <option value="">Tous les états de validation</option>
//                                                 <option value="pending">En cours</option>
//                                                 <option value="validated">Validé</option>
//                                                 <option value="rejected">Rejeté</option>
//                                             </select>
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type="date"
//                                                 placeholder="Date de début"
//                                                 value={filters.startDate}
//                                                 onChange={(e) => handleFilterChange("startDate", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                                             />
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                         <div className="relative">
//                                             <input
//                                                 type="date"
//                                                 placeholder="Date de fin"
//                                                 value={filters.endDate}
//                                                 onChange={(e) => handleFilterChange("endDate", e.target.value)}
//                                                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                                             />
//                                             <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                                         </div>
//                                     </div>
//                                     <div className="flex justify-end mb-4">
//                                         <button
//                                             onClick={() =>
//                                                 setFilters({
//                                                     orderNumber: "",
//                                                     clientName: "",
//                                                     status: "",
//                                                     validationState: "",
//                                                     startDate: "",
//                                                     endDate: "",
//                                                 })
//                                             }
//                                             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
//                                         >
//                                             Réinitialiser les filtres
//                                         </button>
//                                     </div>

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
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Numéro
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Client
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Date
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Statut
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Validation
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Total
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Impayé
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Echoue
//                                                     </th>
//                                                     <th
//                                                         scope="col"
//                                                         className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                                                     >
//                                                         Actions
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody className="bg-white divide-y divide-gray-200">
//                                                 {currentItems.map((order) => (
//                                                     <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                                                             {order.name}
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {new Date(order.date_order).toLocaleDateString()}
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
//                                                                 <span className="ml-2 capitalize">
//                                                                     {getStatusTextValidation(order.validation_rh_state)}
//                                                                 </span>
//                                                             </div>
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {order.amount_total.toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {order.amount_residual.toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                                                             {sommeEchoue(order).toLocaleString()} FCFA
//                                                         </td>
//                                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                             <Link
//                                                                 to={`/admin/commandes/${order.id}/details`}
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
//                                             Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredOrders.length)} sur{" "}
//                                             {filteredOrders.length} entrées
//                                         </div>
//                                         <div className="flex items-center space-x-2">
//                                             <button
//                                                 onClick={() => paginate(currentPage - 1)}
//                                                 disabled={currentPage === 1}
//                                                 className={cn(
//                                                     "px-3 py-1 rounded-md",
//                                                     currentPage === 1
//                                                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                                         : "bg-white text-gray-700 hover:bg-gray-50",
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
//                                                         currentPage === index + 1
//                                                             ? "bg-primary text-white"
//                                                             : "bg-white text-gray-700 hover:bg-gray-50",
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
//                                                     currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
//                                                         ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                                                         : "bg-white text-gray-700 hover:bg-gray-50",
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
//     )
// }

// export default AdminCommandesCredit






import { AdminBreadcrumb } from "@/components"
import { useState, useEffect } from "react"
import { LuSearch, LuChevronLeft, LuChevronRight, LuFilter } from "react-icons/lu"
import { Link } from "react-router-dom"
import { cn } from "@/utils"
import { useAuthContext } from "@/context/useAuthContext"

import { CheckCircle, Package, Truck, XCircle } from "lucide-react"
import { getCommandesCreditClientsEntreprise } from "../../../services/entrepriseFunctionService"

const AdminCommandesCredit = () => {
    const { isAuthenticated, userInfo, parent } = useAuthContext()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)
    const [filters, setFilters] = useState({
        orderNumber: "",
        clientName: "",
        status: "",
        validationState: "",
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        const fetchOrders = async (id) => {
            setLoading(true)
            try {
                const res = await getCommandesCreditClientsEntreprise(id)
                setOrders(res)
            } catch (error) {
                console.error("Error fetching orders:", error)
                setError("Une erreur est survenue lors du chargement des commandes.")
            } finally {
                setLoading(false)
            }
        }
        if (userInfo && parent.id) {
            fetchOrders(parent.id)
        }
    }, [userInfo, parent])

    if (loading) return <div className="flex justify-center items-center h-screen">Chargement des commandes...</div>
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>

    const filteredOrders = orders.filter(
        (order) =>
            (filters.orderNumber === "" || order.name.toLowerCase().includes(filters.orderNumber.toLowerCase())) &&
            (filters.clientName === "" || order.partner_name.toLowerCase().includes(filters.clientName.toLowerCase())) &&
            (filters.status === "" || order.state.toLowerCase() === filters.status.toLowerCase()) &&
            (filters.validationState === "" ||
                order.validation_rh_state.toLowerCase() === filters.validationState.toLowerCase()) &&
            (filters.startDate === "" || new Date(order.date_order) >= new Date(filters.startDate)) &&
            (filters.endDate === "" || new Date(order.date_order) <= new Date(filters.endDate)),
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
        setCurrentPage(1)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            case "rejected":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const sommeEchoue = (order) => {
        const currentDate = new Date()
        let somme = 0

        const checkPayment = (date, amount) => {
            if (new Date(date) < currentDate) {
                somme += amount
            }
        }

        checkPayment(order.first_payment_date, order.first_payment_amount)
        checkPayment(order.second_payment_date, order.second_payment_amount)
        checkPayment(order.third_payment_date, order.third_payment_amount)
        checkPayment(order.fourth_payment_date, order.fourth_payment_amount)

        return somme
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
                return "En cours"
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
            <AdminBreadcrumb title="Liste des Commandes à credit" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                    <h4 className="text-xl font-semibold text-gray-800 uppercase">Liste des Commandes à credit</h4>
                                </div>

                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Numéro de commande"
                                                value={filters.orderNumber}
                                                onChange={(e) => handleFilterChange("orderNumber", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Nom du client"
                                                value={filters.clientName}
                                                onChange={(e) => handleFilterChange("clientName", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        {/* <div className="relative">
                                            <select
                                                value={filters.status}
                                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                                            >
                                                <option value="">Tous les statuts</option>
                                                <option value="sale">Confirmé</option>
                                                <option value="cancel">Annulé</option>
                                                <option value="draft">Brouillon</option>
                                            </select>
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div> */}
                                        <div className="relative">
                                            <select
                                                value={filters.validationState}
                                                onChange={(e) => handleFilterChange("validationState", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                                            >
                                                <option value="">Tous les états de validation</option>
                                                <option value="pending">En cours</option>
                                                <option value="validated">Validé</option>
                                                <option value="rejected">Rejeté</option>
                                            </select>
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                placeholder="Date de début"
                                                value={filters.startDate}
                                                onChange={(e) => handleFilterChange("startDate", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                placeholder="Date de fin"
                                                value={filters.endDate}
                                                onChange={(e) => handleFilterChange("endDate", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="flex justify-end mb-4">
                                        <button
                                            onClick={() =>
                                                setFilters({
                                                    orderNumber: "",
                                                    clientName: "",
                                                    // status: "",
                                                    validationState: "",
                                                    startDate: "",
                                                    endDate: "",
                                                })
                                            }
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                        >
                                            Réinitialiser les filtres
                                        </button>
                                    </div>

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
                                                        Total
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Impayé
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Echoue
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
                                                {currentItems.map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {order.name}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(order.date_order).toLocaleDateString()}
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
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {order.amount_total.toLocaleString()} FCFA
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {order.amount_residual.toLocaleString()} FCFA
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {sommeEchoue(order).toLocaleString()} FCFA
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <Link
                                                                to={`/admin/commandes/${order.id}/details`}
                                                                className="text-primary hover:text-primary-700 transition-colors duration-200"
                                                            >
                                                                Détails
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-700">
                                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredOrders.length)} sur{" "}
                                            {filteredOrders.length} entrées
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => paginate(currentPage - 1)}
                                                disabled={currentPage === 1}
                                                className={cn(
                                                    "px-3 py-1 rounded-md",
                                                    currentPage === 1
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-700 hover:bg-gray-50",
                                                )}
                                            >
                                                <LuChevronLeft className="h-5 w-5" />
                                            </button>
                                            {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }).map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => paginate(index + 1)}
                                                    className={cn(
                                                        "px-3 py-1 rounded-md",
                                                        currentPage === index + 1
                                                            ? "bg-primary text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-50",
                                                    )}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => paginate(currentPage + 1)}
                                                disabled={currentPage === Math.ceil(filteredOrders.length / itemsPerPage)}
                                                className={cn(
                                                    "px-3 py-1 rounded-md",
                                                    currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
                                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                        : "bg-white text-gray-700 hover:bg-gray-50",
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
    )
}

export default AdminCommandesCredit



