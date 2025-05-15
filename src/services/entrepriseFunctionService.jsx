import { HttpClient } from '../helpers';

const urlApi = import.meta.env.VITE_API_URL;



export async function getClientsEntreprise(data) {
    try {
        console.log(data)
        const response = await HttpClient.post(`${urlApi}companies/clients/liste`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function updateUserAvatar(id, avatar) {
    const partner_id = localStorage.getItem("partner_id");
    try {
        const response = await HttpClient.put(`${urlApi}users/avatar/${id}`
            ,
            { avatar },
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
}

export async function getAllCompanies() {
    try {
        const response = await HttpClient.get(`${urlApi}companies`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function setCompanieCompte(data) {
    try {
        const response = await HttpClient.post(`${urlApi}companies/clients/set_compte`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function createComptepartenaire(data) {
    try {
        const response = await HttpClient.post(`${urlApi}companies/create-compte`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
export async function verificationComptePartner(data) {
    try {
        const response = await HttpClient.post(`${urlApi}companies/otp-verification-compte`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}



export async function requestOTPCode(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/${id}/otp-resend`);
        return response.data
    } catch (error) {
        console.error("Erreur lors de la demande du code OTP:", error)
        throw error
    }
}

export async function setCompteEnable(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/compte/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandesClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeECDVClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesECDV/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeRejeteClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesRejete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// get commandes of partner
export async function getCommandesPartenaireEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesPartenaire/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// get commande order
export async function getCommandeOrderClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesOrder/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
// get commande preorder
export async function getCommandePreOrderClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesPreOrder/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandeApprouveClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesApprouve/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function setValidationStateCommande(id, state) {
    try {
        const response = await HttpClient.put(`${urlApi}companies/clients/commande/changeState/${id}`, {
            state: state
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

// 
export async function setValidationAdhesion(id, state) {
    try {
        const response = await HttpClient.put(`${urlApi}companies/clients/commande/changeAdhesion/${id}`, {
            state: state
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
export async function getCommandeClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getCommandesCreditClientsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/commandesCredit/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getClientDetails(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/details/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}


export async function getCommandeDetailsEntreprise(data) {
    try {
        console.log(data)
        const response = await HttpClient.post(`${urlApi}companies/clients/commandes/details`, {
            order_id: data.order_id,
            parent_id: data.parent_id
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function getDetailsEntreprise(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}

export async function updateCompanyInfo(id, data) {
    try {
        console.log(data, id)
        const response = await HttpClient.put(`${urlApi}companies/${id}/details`, data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error);
        throw error;
    }
}

export async function getDetailsCompte(id) {
    try {
        const response = await HttpClient.get(`${urlApi}companies/clients/compte/${id}/details`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}
export async function updateUserProfile(id, data) {
    try {
        console.log(data, id)
        const response = await HttpClient.put(`${urlApi}companies/clients/compte/${id}/details`, data);
        return response;
    } catch (error) {
        console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error);
        throw error;
    }
}

export async function checkCodeEntreprise(data) {
    try {
        const response = await HttpClient.post(`${urlApi}companies/check_entreprise_code`, data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la sélection des abonnements:', error);
        throw error;
    }
}