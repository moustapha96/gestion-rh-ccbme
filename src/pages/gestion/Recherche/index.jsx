

"use client"

import { GestionBreadcrumb } from "@/components"
import { useEffect, useState, useMemo } from "react"
import { cn } from "@/utils"
import { LuChevronLeft, LuChevronRight, LuSearch, LuMoreHorizontal } from "react-icons/lu"
import { getTermeRecherche } from "@/services/gestionService"
import Papa from "papaparse"

const RechercheGestion = () => {
    const [search, setSearch] = useState("")
    const [termeRecherche, setTermeRecherche] = useState({})
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(5)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch data
    useEffect(() => {
        const fetchTermeRecherche = async () => {
            try {
                const response = await getTermeRecherche()
                setTermeRecherche(response)
                setLoading(false)
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error)
                setError("Erreur de chargement des données")
                setLoading(false)
            }
        }
        fetchTermeRecherche()
    }, [])

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1)
    }, [search]) // Ajout de la dépendance search pour réinitialiser la page lors d'une recherche

    // Format and filter data
    const formattedData = useMemo(() => {
        if (!termeRecherche) return []

        const formatted = []
        Object.entries(termeRecherche).forEach(([date, categories]) => {
            Object.entries(categories).forEach(([category, items]) => {
                Object.entries(items).forEach(([item, count]) => {
                    formatted.push({
                        date,
                        category,
                        item,
                        count,
                    })
                })
            })
        })
        return formatted
    }, [termeRecherche])

    const filteredData = useMemo(() => {
        return formattedData.filter(
            (entry) =>
                entry.item.toLowerCase().includes(search.toLowerCase()) ||
                entry.category.toLowerCase().includes(search.toLowerCase()) ||
                entry.date.toLowerCase().includes(search.toLowerCase()),
        )
    }, [formattedData, search])

    // Pagination
    const { currentItems, indexOfFirstItem, indexOfLastItem, totalPages } = useMemo(() => {
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage
        const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
        const totalPages = Math.ceil(filteredData.length / itemsPerPage)
        return { currentItems, indexOfFirstItem, indexOfLastItem, totalPages }
    }, [currentPage, itemsPerPage, filteredData])


    const exportToCSV = () => {
        const csvData = filteredData.map(entry => ({
            Date: entry.date,
            Catégorie: entry.category,
            Article: entry.item,
            Quantité: entry.count
        }))

        const csv = Papa.unparse(csvData)
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "termes_recherche.csv"
        link.click()
    }


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

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Chargement des termes de recherche...</div>
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">Erreur: {error}</div>
    }

    return (
        <>
            <GestionBreadcrumb title="Gestion des termes de recherche" />
            <section>
                <div className="container">
                    <div className="my-6 space-y-6">
                        <div className="grid grid-cols-1">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <div className="flex mb-4">
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                placeholder="Rechercher par date, catégorie ou article..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        </div>

                                        <button
                                            onClick={exportToCSV}
                                            className="bg-primary text-white px-4 py-2 rounded-md mb-4"
                                        >
                                            Exporter en CSV
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Catégorie
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Article
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Quantité
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {currentItems.length > 0 ? (
                                                    currentItems.map((entry, index) => (
                                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                {entry.date}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.category}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.item}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.count}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                                                            Aucun résultat trouvé
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {filteredData.length > 0 && (
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                                            <div className="text-sm text-gray-700">
                                                Affichage de {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} à{" "}
                                                {Math.min(indexOfLastItem, filteredData.length)} sur {filteredData.length} entrées
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

export default RechercheGestion

