'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Save, Building, MapPin, Phone, Globe, Mail, Link2, Loader } from 'lucide-react'
import { AdminBreadcrumb } from "@/components";
import { toast } from 'sonner'

import { useAuthContext } from '../../../context/useAuthContext';
import { getDetailsEntreprise, updateCompanyInfo } from '../../../services/entrepriseFunctionService';
import { AppContext } from '../../../AppContext';
import axios from 'axios';


const AdminConfiguration = () => {
  const { urlApi } = useContext(AppContext);
  const { session } = useAuthContext()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    id: session?.company_id,
    name: '',
    city: '',
    street: '',
    country_name: { id: 0, name: '' },
    email: '',
    website: '',
    mobile: '',
    phone: '',
    company_details: ''
  })

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await getDetailsEntreprise(session.company_id)
        setCompanyInfo(response)
        console.log(response)
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'entreprise:', error)
        toast.error('Erreur lors de la récupération des données de l\'entreprise')
      }
    }

    if (session) fetchCompanyDetails()
  }, [session])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCompanyInfo(prev => ({
      ...prev,
      [name]: name === 'country_name' ? { ...prev.country_name, name: value } : value
    }))
  }

  const handleUpdateCompany = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    console.log(companyInfo)
    // try {
    //   const response = await updateCompanyInfo(companyInfo.id, companyInfo)
    //   console.log(response)
    //   toast.success('Informations de l\'entreprise mises à jour avec succès')
    // } catch (error) {
    //   console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error)
    //   toast.error('Erreur lors de la mise à jour des informations de l\'entreprise')
    // } finally {
    //   setIsSubmitting(false)
    // }

    try {
      const response = fetch(`${urlApi}companies/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyInfo),
      })

      console.log(response)
      toast.success('Informations de l\'entreprise mises à jour avec succès')
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de l\'entreprise:', error)
      toast.error('Erreur lors de la mise à jour des informations de l\'entreprise')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AdminBreadcrumb title="Configuration" />
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Informations Entreprise</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleUpdateCompany} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom de l'entreprise
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={companyInfo.name}
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
                      value={companyInfo.city}
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
                      value={companyInfo.street}
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
                      value={companyInfo.country_name.name}
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
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={companyInfo.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                    Site web
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={companyInfo.website}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      value={companyInfo.mobile}
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
                      value={companyInfo.phone}
                      onChange={handleInputChange}
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="company_details" className="block text-sm font-medium text-gray-700 mb-1">
                  Détails de l'entreprise
                </label>
                <textarea
                  id="company_details"
                  name="company_details"
                  value={companyInfo.company_details}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-1/2 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blueLogo hover:bg-blueClaire focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Mise à jour...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2" size={20} />
                      Mettre à jour les informations
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminConfiguration