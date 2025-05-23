

'use client'

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { User2, MailCheck, MapPin, Phone, Globe, Save, Loader2, Building, Smartphone, Link, Briefcase, Award, Camera, Loader, CameraIcon, Pencil } from 'lucide-react'
import { GestionBreadcrumb } from "@/components"
import { useAuthContext } from '../../../context/useAuthContext'
import { toast } from 'sonner'
import { cn } from "@/utils"
import { getDetailsCompte, updateUserAvatar } from '@/services/entrepriseFunctionService'
import { AppContext } from '../../../AppContext'
import avatar from "@/assets/avatar.png";


const GestionProfile = () => {
    const { session, parent, saveProfilImage, userInfo: user } = useAuthContext()
    console.log(parent)
    const { urlApi } = useContext(AppContext);
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isUploading, setIsUploading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const profileImgInput = useRef(null);
    const [profileImg, setprofileImg] = useState(null);

    const [userInfo, setUserInfo] = useState({
        id: 0,
        name: '',
        city: '',
        street: null,
        country_name: { id: 0, name: '' },
        email: '',
        website: null,
        mobile: null,
        phone: '',
        function: null,
        title: null
    })

    useEffect(() => {
        const fetchCompte = async (id) => {
            try {
                const res = await getDetailsCompte(id)
                setUserInfo(res)
                console.log("resultat")
                console.log(res)
            } catch (error) {
                console.error('Erreur lors de la récupération des données du compte:', error)
                toast.error('Erreur lors de la récupération des données du compte')
            }
        }

        if (session.user_info.partner_id) {
            fetchCompte(session.user_info.partner_id)
        }
    }, [session])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserInfo(prev => ({
            ...prev,
            [name]: name === 'country_name' ? { ...prev.country_name, name: value } : value
        }))
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            const response = fetch(`${urlApi}companies/clients/compte/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            })

            console.log(response)
            toast.success('Informations de profil mise a jour avec succès')
        } catch (error) {
            console.error('Erreur lors de la mise à jour des informations de lu profil:', error)
            toast.error('Erreur lors de la mise à jour des informations du profil')
        } finally {
            setIsSubmitting(false)
        }
    }


    const handleImageUpload = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Type de fichier non pris en charge");
            return;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            toast.error("Taille de fichier trop grande");
            return;
        }

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await updateUserAvatar(user.id, formData);

            if (response && response.imageUrl) {
                saveProfilImage(response.imageUrl);
                toast.success("Profile changé avec succès");
            } else {
                throw new Error(response.error || "Erreur lors du téléchargement de l'image");
            }
        } catch (error) {
            console.error('Erreur lors du téléchargement de l\'image:', error);
            toast.error("Erreur lors du téléchargement de l'image");
        } finally {
            setIsUploading(false);
        }
    }, [session.id, saveProfilImage]);



    const profileImgChangHandler = (e) => {
        const file = e.target.files[0];
        const name = "avatar_" + user.id;
        if (file) {
            const imgReader = new FileReader();
            imgReader.onload = async (event) => {
                setprofileImg(event.target.result);
                localStorage.setItem(name, event.target.result);
                const response = await updateUserAvatar(
                    user.id, event.target.result
                );
                if (response.status == "success") {
                    toast.success(response.message, {
                        position: "top-center",
                        autoClose: 5000,
                    });
                    setprofileImg(response.avatar);
                    saveProfilImage(response.avatar || result)
                }
            };
            imgReader.readAsDataURL(file);
        } else {
            setprofileImg("avatar.png");
            localStorage.removeItem(name);
        }
    };

    const browseProfileImg = () => {
        profileImgInput.current.click();
    };


    return (
        <>
            <GestionBreadcrumb title="Profile" subTitle="Modifier votre profile" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-4">Info Entreprise</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        <div className="flex items-center">
                                            <strong className="w-1/3">Nom :</strong>
                                            <span className="flex items-center">
                                                {parent.name}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <strong className="w-1/3">Code Entreprise :</strong>
                                            <span className="flex items-center">
                                                {parent.entreprise_code}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <strong className="w-1/3">Email :</strong>
                                            <span className="flex items-center">
                                                {parent.email ? parent.email : 'Non renseigné'}
                                            </span>
                                        </div>

                                        <div className="flex items-center">
                                            <strong className="w-1/3">Téléphone :</strong>
                                            <span className="flex items-center">
                                                {parent.phone ? parent.phone : 'Non renseigné'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center justify-center mb-6">

                                        {/* <div className="flex items-center justify-center mb-6">
                                            <div className="relative">
                                                <img
                                                    src={profileImage ? `data:image/jpeg;base64,${profileImage}` : avatar}
                                                    alt={"Gestion de la mairie"}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-full object-cover"
                                                />
                                                <label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 bg-white rounded-full p-1 cursor-pointer">
                                                    <CameraIcon size={20} />
                                                </label>
                                                <input
                                                    id="profile-image-upload"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/gif"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                {isUploading && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                                        <Loader2 className="animate-spin text-white" size={24} />
                                                    </div>
                                                )}
                                            </div>
                                        </div> */}

                                        <div className="relative">
                                            <div className="w-48 h-48 rounded-full overflow-hidden relative">
                                                <img
                                                    src={profileImg || `${avatar}`}
                                                    alt="CCBM Shop Profile"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <input
                                                ref={profileImgInput}
                                                onChange={profileImgChangHandler}
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                            />

                                            <button
                                                onClick={browseProfileImg}
                                                className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                                            >
                                                <Pencil className="text-white" size={20} />
                                            </button>
                                        </div>                                    </div>


                                    <h2 className="text-2xl font-semibold mb-4">Profil Utilisateur</h2>
                                    <form onSubmit={handleUpdateUser} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nom
                                                </label>
                                                <div className="relative">
                                                    <User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        value={userInfo.name}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Email
                                                </label>
                                                <div className="relative">
                                                    <MailCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={userInfo.email}
                                                        readOnly
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Ville
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="city"
                                                        name="city"
                                                        type="text"
                                                        value={userInfo.city}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Adresse
                                                </label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="street"
                                                        name="street"
                                                        type="text"
                                                        value={userInfo.street || ''}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="country_name" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Pays
                                                </label>
                                                <div className="relative">
                                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="country_name"
                                                        name="country_name"
                                                        type="text"
                                                        value={userInfo.country_name?.name ?? "Sénégal"}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Téléphone
                                                </label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="phone"
                                                        name="phone"
                                                        type="tel"
                                                        value={userInfo.phone}
                                                        readOnly
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>


                                            <div>
                                                <label htmlFor="function" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Fonction ou poste
                                                </label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="function"
                                                        name="function"
                                                        type="text"
                                                        value={userInfo.function || ''}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div>
                                            {/* <div>
                                                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Titre
                                                </label>
                                                <div className="relative">
                                                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                                    <input
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                        value={userInfo.title || ''}
                                                        onChange={handleInputChange}
                                                        className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                        <div className="flex justify-center">


                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    "w-1/2 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-blueClaire focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                                                    isSubmitting && "opacity-50 cursor-not-allowed"
                                                )}
                                            >
                                                {isSubmitting ? <Loader2 className="animate-spin mr-2" size={20} /> : <Save className="mr-2" size={20} />}
                                                {isSubmitting ? 'Mise à jour...' : 'Mettre à jour le profil'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GestionProfile