
"use client"

import { AdminBreadcrumb } from "@/components"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import {
    User,
    Mail,
    Phone,
    Globe,
    MapPin,
    Briefcase,
    ArrowLeft,
    XCircle,
    CheckCircle,
    Truck,
    Package,
    Award,
    Loader2,
} from "lucide-react"
import {
    getAllCompanies,
    getDetailsCompte,
    setCompanieCompte,

    requestOTPCode,
} from "../../../services/entrepriseFunctionService"
import { LuChevronLeft, LuChevronRight, LuSearch } from "react-icons/lu"
import { cn } from "@/utils"
import { getCommandesClient } from "@/services/gestionService"
import { toast } from "sonner"
import { useAuthContext } from "@/context"
import OTPVerificationModal from "./component/otp-verification-modal"
const GestionClientDetails = () => {
    const { userInfo } = useAuthContext()

    const { id } = useParams()
    const [client, setClient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [orders, setOrders] = useState([])
    const [companies, setCompanies] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(client?.company_id || null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [isRequestingOtp, setIsRequestingOtp] = useState(false)
    const [showOtpModal, setShowOtpModal] = useState(false)

    const [filter, setFilter] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)

    const fetchClient = async () => {
        try {
            const data = await getDetailsCompte(id)
            setClient(data)
            console.log(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchCommandes = async (id) => {
            try {
                const data = await getCommandesClient(id)
                setOrders(data)
                console.log(data)
            } catch (err) {
                setError(err.message)
            }
        }
        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies()
                setCompanies(data)
                console.log(data)
            } catch (err) {
                setError(err.message)
            }
        }
        fetchCompanies()
        fetchCommandes(id)
        fetchClient()
    }, [id])

    useEffect(() => {
        if (client?.parent_id) {
            setSelectedCompany(client.parent_id)
        }
    }, [client])

    const handleAssignCompany = async () => {
        if (!selectedCompany) return

        setIsUpdating(true)
        try {
            console.log(`Assigning client ${id} to company ${selectedCompany}`)
            const data = {
                client_id: id,
                company_id: selectedCompany,
            }
            console.log(data)
            const resp = await setCompanieCompte(data)
            console.log(resp)
            toast.success("Assignation effectuée avec succès !")
            // Simulate API call success
            setUpdateSuccess(true)
        } catch (err) {
            setError(err.message)
            setUpdateSuccess(false)
        } finally {
            setLoading(false)
            setIsUpdating(false)
        }
    }

    const handleRequestOTP = async () => {
        setIsRequestingOtp(true)
        try {
            const response = await requestOTPCode(id)
            console.log(response)
            toast.success("Code de vérification envoyé avec succès!")
            setShowOtpModal(true)
        } catch (error) {
            console.error("Error requesting OTP:", error)
            toast.error("Erreur lors de la demande de vérification.")
        } finally {
            setIsRequestingOtp(false)
        }
    }

    const handleVerificationSuccess = () => {
        // Rafraîchir les données du client
        fetchClient()
        toast.success("Compte vérifié avec succès!")
    }

    if (loading) return <LoadingSkeleton />
    if (error) return <ErrorDisplay error={error} />

    const filteredOrders = orders.filter(
        (order) =>
            order.name.toLowerCase().includes(filter.toLowerCase()) ||
            order.partner_name.toLowerCase().includes(filter.toLowerCase()),
    )

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
            <AdminBreadcrumb title="Détails client" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="container mx-auto px-4 py-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h1 className="text-3xl font-bold">Détails du Client</h1>
                                        <div className="flex gap-2">
                                            {client && !client.is_verified && (
                                                <button
                                                    onClick={handleRequestOTP}
                                                    disabled={isRequestingOtp}
                                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                                >
                                                    {isRequestingOtp ? (
                                                        <>
                                                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                                            Envoi en cours...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <CheckCircle className="mr-2 h-4 w-4" />
                                                            Vérifier le compte
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                            {client && client.is_verified && (
                                                <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md">
                                                    <CheckCircle className="mr-1 h-4 w-4" />
                                                    Compte vérifié
                                                </div>
                                            )}
                                            <Link
                                                to="/gestion/clients"
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blueLogo hover:bg-blueClaire focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                <ArrowLeft className="mr-2 h-5 w-5" />
                                                Retour à la liste
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                        <div className="px-6 py-4 border-b border-gray-200">
                                            <h2 className="text-xl font-semibold text-gray-800">{client.name}</h2>
                                        </div>
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <InfoItem
                                                icon={<User />}
                                                label="Adhésion"
                                                value={
                                                    client.adhesion == "pending"
                                                        ? "En Attente"
                                                        : client.adhesion == "accepted"
                                                            ? "Accepté"
                                                            : "Rejeté"
                                                }
                                            />
                                            <InfoItem icon={<User />} label="Nom" value={client.name} />
                                            <InfoItem icon={<Mail />} label="Email" value={client.email} />
                                            <InfoItem icon={<Phone />} label="Téléphone" value={client.phone} />
                                            {/* <InfoItem icon={<Phone />} label="Mobile" value={client.mobile} /> */}
                                            <InfoItem icon={<MapPin />} label="Ville" value={client.city} />
                                            <InfoItem icon={<MapPin />} label="Rue" value={client.street} />
                                            <InfoItem icon={<Globe />} label="Pays" value={client.country_name.name} />
                                            {/* <InfoItem icon={<LinkIcon />} label="Site Web" value={client.website} /> */}
                                            <InfoItem icon={<Briefcase />} label="Fonction Ou Poste" value={client.function} />
                                            {client.company && <InfoItem icon={<Award />} label="Compagnie" value={client.company.name} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-6 mb-6">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-800">Association à une entreprise</h2>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                            <div className="w-full md:w-1/2">
                                                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Sélectionner une entreprise
                                                </label>
                                                <select
                                                    id="company"
                                                    value={selectedCompany || ""}
                                                    onChange={(e) => setSelectedCompany(e.target.value ? Number(e.target.value) : null)}
                                                    className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent px-4 py-2"
                                                >
                                                    <option value="">-- Sélectionner une entreprise --</option>
                                                    {companies.map((company) => (
                                                        <option key={company.id} value={company.id} selected={company.id === client.parent_id}>
                                                            {company.name} ({company.email})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mt-4 md:mt-6">
                                                <button
                                                    onClick={handleAssignCompany}
                                                    disabled={isUpdating || !selectedCompany}
                                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white ${isUpdating || !selectedCompany
                                                        ? "bg-gray-400 cursor-not-allowed"
                                                        : "bg-blueLogo hover:bg-blueClaire focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                                        }`}
                                                >
                                                    {isUpdating ? (
                                                        <>
                                                            <svg
                                                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Mise à jour...
                                                        </>
                                                    ) : (
                                                        "Associer à cette entreprise"
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        {updateSuccess && (
                                            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md flex items-center">
                                                <CheckCircle className="w-5 h-5 mr-2" />
                                                Client associé à l'entreprise avec succès!
                                            </div>
                                        )}
                                        {client?.company_id && !selectedCompany && (
                                            <div className="mt-4 p-2 bg-yellow-100 text-yellow-700 rounded-md flex items-center">
                                                <Briefcase className="w-5 h-5 mr-2" />
                                                Attention: Désélectionner une entreprise supprimera l'association existante.
                                            </div>
                                        )}
                                    </div>
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
                                                        Statut
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
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            {order.type_sale}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.partner_name}</td>
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
            {client && (
                <OTPVerificationModal
                    isOpen={showOtpModal}
                    onClose={() => setShowOtpModal(false)}
                    clientId={id}
                    onSuccess={handleVerificationSuccess}
                />
            )}
        </>
    )
}

const InfoItem = ({ icon, label, value }) => (
    <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 text-gray-400">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="mt-1 text-sm text-gray-900">{value || "Non spécifié"}</p>
        </div>
    </div>
)

const LoadingSkeleton = () => (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                        <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

const ErrorDisplay = ({ error }) => (
    <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Erreur!</strong>
            <span className="block sm:inline"> {error}</span>
        </div>
    </div>
)

export default GestionClientDetails
