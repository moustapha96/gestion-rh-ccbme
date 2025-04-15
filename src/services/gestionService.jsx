import { HttpClient } from '../helpers';

const urlApi = import.meta.env.VITE_API_URL;



export async function getCommandes() {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/orders/liste`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}


/**
 * 🔹 Récupérer la liste des clients
 */
export const getClients = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/clients/liste`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
        throw error;
    }
};

export async function getCommandesClient(id) {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/clients/${id}/commandes`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// la liste des commentaires
export const getCommentaires = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/commentaires/liste`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
        throw error;
    }
};

/**
 * 🔹 Activer/Désactiver un client
 */
export const toggleClientStatus = async (id, state) => {
    try {
        const response = await HttpClient.put(`${urlApi}gestion/clients/${id}/changeAdhesion`, {
            state: state
        });
        return response.data;
    } catch (error) {
        console.error(`Erreur lors du changement du statut du client ${id}:`, error);
        throw error;
    }
};

/**
 * 🔹 Récupérer la liste des commandes
 */
export const getOrders = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/commandes`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des commandes:', error);
        throw error;
    }
};

/**
 * 🔹 Récupérer les détails d'une commande
 */
export const getOrderDetails = async (orderId) => {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/commandes/${orderId}/details`);
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la récupération des détails de la commande ${orderId}:`, error);
        throw error;
    }
};

/**
 * 🔹 Changer l'état RH d'une commande
 */
export const changeOrderStateRH = async (orderId, state) => {
    try {
        const response = await HttpClient.put(`${urlApi}gestion/commande/changeStateRH/${orderId}`, { state });
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la modification de l'état RH de la commande ${orderId}:`, error);
        throw error;
    }
};

/**
 * 🔹 Changer l'état Admin d'une commande
 */
export const changeOrderStateAdmin = async (orderId, state) => {
    try {
        const response = await HttpClient.put(`${urlApi}gestion/commande/changeStateAdmin/${orderId}`, { state });
        return response.data;
    } catch (error) {
        console.error(`Erreur lors de la modification de l'état Admin de la commande ${orderId}:`, error);
        throw error;
    }
};

export const getTermeRecherche = async () => {
    try {
        const response = await HttpClient.get(`${urlApi}gestion/terme_recherche`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération des termes de recherche:', error);
        throw error;
    }
}

export const updateUserAvatar = async (id, formData) => {

    const partner_id = localStorage.getItem("partner_id");
    try {
        const response = await HttpClient.put(
            `${urlApi}users/avatar/${id}`,
            { formData },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'avatar", error);
        throw error;
    }
};


