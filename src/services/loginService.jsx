
import { HttpClient } from '../helpers';




const urlApi = import.meta.env.VITE_API_URL


const api = "http://localhost:8016/api/"
export async function login(email, password) {
    try {
        const response = await HttpClient.post(`${urlApi}login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
}
export async function inscription(datas) {
    console.log(datas)
    console.log("datas")
    try {
        const response = await HttpClient.postWithoutToken(`${api}companies/new_compte`, datas);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        console.log(error)
        throw error;
    }
}

export async function resendOtp(email) {
    try {
        const response = await HttpClient.get(`/api/partner/${email}/otp-resend`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du modèle", error);
        throw error;
    }
}

export async function verifierCodeOTP(body) {
    try {
        const response = await HttpClient.postWithoutToken(`/api/partner/otp-verification`, body);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification du code", error);
        throw error;
    }
}

export async function actualiseInfoUser(id) {
    try {
        const response = await HttpClient.get(`/api/partner/compte/${id}`,);
        return response.data;
    } catch (error) {
        console.error(
            `Erreur lors de la mise à jour du modèle avec l'ID ${id}`,
            error
        );
        throw error;
    }
}
export async function verifiedCompte(mail) {
    try {
        const response = await HttpClient.get(`/api/users/verified/${mail}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la vérification de votre compte", error);
        throw error;
    }
}

export async function resetPasswordMail(email) {
    try {
        const response = await HttpClient.get(`/api/reset-password-email/${email}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tokens", error);
        throw error;
    }
}

export async function resetPasswordBySMS(phone) {
    try {
        const response = await HttpClient.get(`/api/reset-password-sms/${phone}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tokens", error);
        throw error;
    }
}

export async function newPassword(modelData) {
    try {
        const response = await HttpClient.post(`/api/new-password`, modelData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des tokens", error);
        throw error;
    }
}