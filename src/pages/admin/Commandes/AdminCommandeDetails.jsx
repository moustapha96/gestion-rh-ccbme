

import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/useAuthContext";
import { checkCodeEntreprise, getCommandeDetailsEntreprise, setValidationStateCommande } from "../../../services/entrepriseFunctionService";
import { AdminBreadcrumb } from "@/components";
import { Link, useParams } from "react-router-dom";
import { CheckCircle, XCircle, Clock, CreditCard, Truck, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";

const AdminCommandeDetails = () => {
    const { id } = useParams();
    const { userInfo, parent } = useAuthContext();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingState, setLoadingState] = useState(false);
    const [error, setError] = useState(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [companyCode, setCompanyCode] = useState("")
    const [newStatus, setNewStatus] = useState("")

    useEffect(() => {
        if (id) fetchOrder(id);
    }, [id, parent.id]);

    const fetchOrder = async (id) => {
        setLoading(true);
        try {
            const res = await getCommandeDetailsEntreprise({ order_id: id, parent_id: parent.id });
            console.log(res)
            setOrder(res);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen">Chargement des détails de la commande...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>;
    if (!order) return null;



    const getPaymentStatusIcon = (status) => {
        const iconClass = "w-5 h-5";
        switch (status) {
            case 'paid': return <CreditCard className={`${iconClass} text-green-500`} />;
            case 'partial': return <Clock className={`${iconClass} text-yellow-500`} />;
            default: return <XCircle className={`${iconClass} text-red-500`} />;
        }
    };
    const getPaymentStatutText = (status) => {
        switch (status) {
            case 'paid': return 'Payé';
            case 'partial': return 'Partiellement payé';
            default: return 'Non payé';
        }
    }


    const getStatusText = (status) => {
        switch (status.toLowerCase()) {
            case 'sale':
                return 'Confirmé';
            case 'cancel':
                return 'Annulé';
            case 'draft':
                return 'Brouillon';
            default:
                return 'En cours';
        }
    };
    const getStatusIcon = (status) => {
        const iconClass = "w-5 h-5";
        switch (status.toLowerCase()) {
            case 'sale': return <CheckCircle className={`${iconClass} text-green-500`} />;
            case 'cancel': return <XCircle className={`${iconClass} text-red-500`} />;
            case 'draft': return <Package className={`${iconClass} text-yellow-500`} />;
            default: return <Truck className={`${iconClass} text-blue-500`} />;
        }
    };
    const getStatusTextValidation = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'En cours de validation';
            case 'validated':
                return 'Validé';
            case 'rejected':
                return 'Rejeté';
            default:
                return 'En cours';
        }
    };

    const getStatusIconValidation = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <XCircle className="w-5 h-5 text-yellow-500" />;
            case 'validated':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'rejected':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Truck className="w-5 h-5 text-blue-500" />;
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Non définie";
        return new Date(dateString).toLocaleDateString();
    };
    const handleStatusChangee = (orderId, status) => {
        setNewStatus(status)
        setIsPopupOpen(true)
    }

    const handleStatusChange = async (orderId, newStatus) => {
        // confirmation dialog
        setLoadingState(true)
        if (!window.confirm("Confirmer la modification du statut de la commande ?")) {
            return;
        }

        const resultat = await setValidationStateCommande(orderId, newStatus);
        if (resultat) {
            toast.success("Opération reussie.", {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
            })
            fetchOrder(orderId)
            setLoadingState(false)
        } else {
            toast.error("Une erreur s'est produite lors de la modification du statut.", {
                position: "top-right",
                autoClose: 5000,
            })
            setLoadingState(false)
        }
    };

    const confirmStatusChange = async () => {

        setLoading(true)
        try {

            const result = await checkCodeEntreprise({ entreprise_code: companyCode, partner_id: userInfo.id })
            console.log(result)
            if (!result.entreprise_code_exist) {
                toast.error("Code d'entreprise incorrect.", {
                    position: "top-right",
                    autoClose: 5000,
                })
                setLoading(false)
                return
            }

            const resultat = await setValidationStateCommande(order.id, newStatus)
            if (resultat) {

                toast.success("Opération reussie.", {
                    position: "top-right",
                    autoClose: 5000,
                })
                setTimeout(() => {
                    fetchOrder(order.id)
                }, 5000)

            } else {
                toast.error("Une erreur s'est produite lors de la modification du statut.", {
                    position: "top-right",
                    autoClose: 5000,
                })
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false)
            setIsPopupOpen(false)
            setCompanyCode("")
        }
    }

    const getStatutColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300'
            case 'validated':
                return 'bg-green-100 text-green-800 border-green-300'
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-300'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300'
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (!order) return null;


    return (
        <>
            <AdminBreadcrumb title="Détails de la commande" />
            <section>
                <div className="container">

                    <div className="my-6 space-y-6">
                        <div className="bg-gray-100 min-h-screen p-8">
                            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6 bg-blueLogo text-white">
                                    <h1 className="text-3xl font-bold">Commande {order.name}</h1>
                                    <p className="text-blue-100">Date: {new Date(order.date_order).toLocaleDateString()}</p>
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">Informations client</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex items-center">
                                                <strong className="w-1/3">Nom:</strong>
                                                <span className="flex items-center">
                                                    {order.partner_name}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <strong className="w-1/3">Adresse:</strong>
                                                <span className="flex items-center">
                                                    {order.partner_city}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <strong className="w-1/3">Pays:</strong>
                                                <span className="flex items-center">
                                                    {order.partner_country_name}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <strong className="w-1/3">Email:</strong>
                                                <span className="flex items-center">
                                                    {order.partner_email}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <strong className="w-1/3">Téléphone:</strong>
                                                <span className="flex items-center">
                                                    {order.partner_phone}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <strong className="w-1/3"></strong>
                                                <span className="flex items-center">
                                                    <Link to={`/admin/clients/${order.partner_id}/details`} className="text-blueLogo" >voir détails </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-xl font-semibold">Détails de la commande</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                            <div className="flex items-center">
                                                <strong className="w-1/3">État:</strong>
                                                <span className="flex items-center">
                                                    {getStatusIcon(order.state)}
                                                    <span className="ml-2 capitalize">{getStatusText(order.state)}</span>
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <strong className="w-1/3">Paiement:</strong>
                                                <span className="flex items-center">
                                                    {getPaymentStatusIcon(order.advance_payment_status)}
                                                    <span className="ml-2 capitalize">{getPaymentStatutText(order.advance_payment_status)} </span>
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <strong className="w-1/3">Validation RH:</strong>
                                                {getStatusIconValidation(order.validation_rh_state)}
                                                <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_rh_state)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <strong className="w-1/3">Validation Final:</strong>
                                                {getStatusIconValidation(order.validation_admin_state)}
                                                <span className="ml-2 capitalize">{getStatusTextValidation(order.validation_admin_state)}</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Produits commandés</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th className="p-3">Produit</th>
                                                    <th className="p-3">Quantité</th>
                                                    <th className="p-3">Prix unitaire</th>
                                                    <th className="p-3">Total HT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.order_lines.map((line) => (
                                                    <tr key={line.id} className="border-t">
                                                        <td className="p-3">{line.product_name}</td>
                                                        <td className="p-3">{line.product_uom_qty} {line.product_uom_name}</td>
                                                        <td className="p-3">{line.price_unit.toLocaleString()} FCFA</td>
                                                        <td className="p-3">{line.price_subtotal.toLocaleString()} FCFA</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Détails des paiements</h2>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="font-semibold">Premier versement</h3>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Montant:</strong>
                                                    <span className="flex items-center">
                                                        {order.first_payment_amount.toLocaleString()} FCFA
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Date:</strong>
                                                    <span className="flex items-center">
                                                        {formatDate(order.first_payment_date)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">État:</strong>
                                                    <span className="flex items-center">
                                                        {order.first_payment_state ? "Payé" : "Non payé"}
                                                    </span>
                                                </div>

                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Deuxième versement</h3>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Montant:</strong>
                                                    <span className="flex items-center">
                                                        {order.second_payment_amount.toLocaleString()} FCFA
                                                    </span>
                                                </div>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Date:</strong>
                                                    <span className="flex items-center">
                                                        {formatDate(order.second_payment_date)}
                                                    </span>
                                                </div>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">État:</strong>
                                                    <span className="flex items-center">
                                                        {order.second_payment_state ? "Payé" : "Non payé"}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <h3 className="font-semibold">Troisième versement</h3>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Montant:</strong>
                                                    <span className="flex items-center">
                                                        {order.third_payment_amount.toLocaleString()} FCFA
                                                    </span>
                                                </div>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Date:</strong>
                                                    <span className="flex items-center">
                                                        {formatDate(order.third_payment_date)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">État:</strong>
                                                    <span className="flex items-center">
                                                        {order.third_payment_state ? "Payé" : "Non payé"}
                                                    </span>
                                                </div>

                                            </div>
                                            <div>
                                                <h3 className="font-semibold">Quatrième versement</h3>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Montant:</strong>
                                                    <span className="flex items-center">
                                                        {order.fourth_payment_amount.toLocaleString()} FCFA
                                                    </span>
                                                </div>

                                                <div className="flex items-center">
                                                    <strong className="w-1/3">Date:</strong>
                                                    <span className="flex items-center">
                                                        {formatDate(order.fourth_payment_date)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center">
                                                    <strong className="w-1/3">État:</strong>
                                                    <span className="flex items-center">
                                                        {order.fourth_payment_state ? "Payé" : "Non payé"}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-semibold">Montant payer: {order.amount_total - order.amount_residual} FCFA</p>
                                        </div>
                                        <div className="mt-4">
                                            <p className="font-semibold">Montant restant à payer: {order.amount_residual.toLocaleString()} FCFA</p>
                                        </div>

                                    </div>
                                </div>

                                <div className="p-6 bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h2 className="text-xl font-semibold">Total</h2>
                                            <p className="text-3xl font-bold text-blueLogo">{order.amount_total.toLocaleString()} FCFA</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Changer le statut:</label>
                                            <select
                                                className={`block w-full pl-3 pr-10 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary ${getStatutColor(order.validation_rh_state)}`}

                                                value={order.validation_rh_state}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                disabled={loadingState}
                                            >
                                                <option value="pending">En cours de validation</option>
                                                <option value="validated">Validé</option>
                                                <option value="rejected">Rejeté</option>
                                            </select>


                                        </div>
                                    </div>
                                </div>
                            </div>

                            {isPopupOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                                        <h2 className="text-2xl font-bold mb-4">Confirmer le changement de statut</h2>
                                        <p className="mb-4">Veuillez entrer le code de l'entreprise pour confirmer le changement de statut.</p>
                                        <input
                                            type="text"
                                            value={companyCode}
                                            onChange={(e) => setCompanyCode(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md mb-4"
                                            placeholder="Code de l'entreprise"
                                        />
                                        <div className="flex justify-end space-x-2">
                                            <button
                                                onClick={() => setIsPopupOpen(false)}
                                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
                                            >
                                                Annuler
                                            </button>
                                            <button
                                                onClick={confirmStatusChange}
                                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
                                                disabled={loadingState}
                                            >
                                                {loadingState ? <Loader2 className="animate-spin mr-2" size={20} /> : null}
                                                Confirmer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </section>

        </>
    );
};

export default AdminCommandeDetails;