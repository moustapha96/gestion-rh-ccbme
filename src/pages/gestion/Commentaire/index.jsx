import { GestionBreadcrumb } from "@/components";
import React, { useEffect, useState } from "react";

import { cn } from "@/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { getCommentaires } from "@/services/gestionService";


const CommentaireGestion = () => {
    const [search, setSearch] = useState("");

    const [commentaires, setCommentaires] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [loading, setLoading] = useState(true)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCommentaires = async () => {
            try {
                const response = await getCommentaires();
                setCommentaires(response);
                console.log(response);
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires:', error);
            }
        };
        fetchCommentaires();
    }, []);

    const filteredComments = commentaires.filter(comment =>
        comment.author.toLowerCase().includes(search.toLowerCase()) ||
        comment.text.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = filteredComments.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    return <>
        <>
            <GestionBreadcrumb title="Gestion des commentaires" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Filtrer par nom"
                                                value={filters.name}
                                                onChange={(e) => handleFilterChange("name", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Filtrer par email"
                                                value={filters.email}
                                                onChange={(e) => handleFilterChange("email", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Filtrer par fonction"
                                                value={filters.function}
                                                onChange={(e) => handleFilterChange("function", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Filtrer par téléphone"
                                                value={filters.phone}
                                                onChange={(e) => handleFilterChange("phone", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={filters.adhesion}
                                                onChange={(e) => handleFilterChange("adhesion", e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                                            >
                                                <option value="">Tous les statuts</option>
                                                <option value="pending">En cours</option>
                                                <option value="accepted">Accepté</option>
                                                <option value="rejected">Rejeté</option>
                                            </select>
                                            <LuFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <button
                                                onClick={resetFilters}
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                                            >
                                                Réinitialiser les filtres
                                            </button>
                                        </div>
                                    </div> */}

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Auteur
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        texte
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                    >
                                                        Date
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {currentItems.map((comment) => (
                                                    <tr key={comment.id} className="hover:bg-gray-50 transition-colors duration-200">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{comment.id}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.author}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{comment.text}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {comment.date ? new Date(comment.date).toLocaleTimeString() + " le " + new Date(comment.date).toLocaleDateString("fr-FR") : "Non défini"}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="text-sm text-gray-700">
                                            Affichage de {indexOfFirstItem + 1} à {Math.min(indexOfLastItem, filteredComments.length)} sur{" "}
                                            {filteredComments.length} entrées
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
                                            {Array.from({ length: Math.ceil(filteredComments.length / itemsPerPage) }).map((_, index) => (
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
                                                disabled={currentPage === Math.ceil(filteredComments.length / itemsPerPage)}
                                                className={cn(
                                                    "px-3 py-1 rounded-md",
                                                    currentPage === Math.ceil(filteredComments.length / itemsPerPage)
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
    </>

};

export default CommentaireGestion;
