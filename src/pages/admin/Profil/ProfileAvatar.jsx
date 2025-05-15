"use client"

import { useState, useRef, useEffect } from "react"
import { Camera } from "lucide-react"
import { toast } from "sonner"


const ProfileAvatar = ({
    userId,
    urlApi,
    initialAvatar = "avatar.png",
    onAvatarChange,
}) => {
    const [profileImg, setProfileImg] = useState < string > (initialAvatar)
    const fileInputRef = useRef < HTMLInputElement > (null)

    useEffect(() => {
        const name = "avatar_" + userId
        const savedAvatar = localStorage.getItem(name)
        if (savedAvatar) {
            setProfileImg(savedAvatar)
        }
    }, [userId])

    const profileImgChangeHandler = (e) => {
        const file = e.target.files?.[0]
        const name = "avatar_" + userId

        if (file) {
            const imgReader = new FileReader()
            imgReader.onload = async (event) => {
                const result = event.target?.result
                setProfileImg(result)
                localStorage.setItem(name, result)

                try {
                    const response = await fetch(`${urlApi}companies/clients/compte/update-avatar`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: userId,
                            avatar: result,
                        }),
                    })

                    const data = await response.json()
                    if (data.status === "success") {
                        toast.success(data.message || "Photo de profil mise à jour avec succès", {
                            duration: 5000,
                        })
                        setProfileImg(data.avatar)
                        if (onAvatarChange) {
                            onAvatarChange(data.avatar)
                        }
                    } else {
                        throw new Error(data.message || "Erreur lors de la mise à jour de la photo de profil")
                    }
                } catch (error) {
                    console.error("Erreur:", error)
                    toast.error("Erreur lors de la mise à jour de la photo de profil")
                }
            }
            imgReader.readAsDataURL(file)
        } else {
            setProfileImg("avatar.png")
            localStorage.removeItem(name)
        }
    }

    // return (
    //     <div className="flex justify-center mb-6">
    //         <div className="relative">
    //             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
    //                 <img
    //                     src={profileImg !== "avatar.png" ? profileImg : "/avatar.png"}
    //                     alt="Photo de profil"
    //                     className="w-full h-full object-cover"
    //                 />
    //             </div>
    //             <button
    //                 type="button"
    //                 onClick={() => fileInputRef.current?.click()}
    //                 className="absolute bottom-0 right-0 bg-blueLogo text-white p-2 rounded-full hover:bg-blueClaire transition-colors"
    //             >
    //                 <Camera size={20} />
    //             </button>
    //             <input type="file" ref={fileInputRef} onChange={profileImgChangeHandler} accept="image/*" className="hidden" />
    //         </div>
    //     </div>
    // )
    return (
        <>
            <AdminBreadcrumb title="Profil" subTitle="Modifier votre profil" />
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
                                            <span className="flex items-center">{parent.name}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <strong className="w-1/3">Code Entreprise :</strong>
                                            <span className="flex items-center">{parent.entreprise_code}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <strong className="w-1/3">Email :</strong>
                                            <span className="flex items-center">{parent.email ? parent.email : "Non renseigné"}</span>
                                        </div>

                                        <div className="flex items-center">
                                            <strong className="w-1/3">Téléphone :</strong>
                                            <span className="flex items-center">{parent.phone ? parent.phone : "Non renseigné"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-2xl font-semibold mb-4">Profil Utilisateur</h2>
                                    <div className="flex justify-center mb-6">
                                        <div className="relative">
                                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
                                                <img
                                                    src={profileImg !== "avatar.png" ? profileImg : "/avatar.png"}
                                                    alt="Photo de profil"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()}
                                                className="absolute bottom-0 right-0 bg-blueLogo text-white p-2 rounded-full hover:bg-blueClaire transition-colors"
                                            >
                                                <Camera size={20} />
                                            </button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={profileImgChangHandler}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                    <form onSubmit={handleUpdateUser} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Nom
                                                </label>
                                                <div className="relative">
                                                    <User2
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
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
                                                    <MailCheck
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
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
                                                    <MapPin
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
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
                                                    <MapPin
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
                                                    <input
                                                        id="street"
                                                        name="street"
                                                        type="text"
                                                        value={userInfo.street || ""}
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
                                                    <Globe
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
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
                                                    <Phone
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
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
                                                    <Briefcase
                                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                                        size={20}
                                                    />
                                                    <input
                                                        id="function"
                                                        name="function"
                                                        type="text"
                                                        value={userInfo.function || ""}
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
                                                    isSubmitting && "opacity-50 cursor-not-allowed",
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <Loader2 className="animate-spin mr-2" size={20} />
                                                ) : (
                                                    <Save className="mr-2" size={20} />
                                                )}
                                                {isSubmitting ? "Mise à jour..." : "Mettre à jour le profil"}
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

export default ProfileAvatar
