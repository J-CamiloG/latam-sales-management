"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, Users, Settings, Package, Menu, Eye, ArrowLeft,ShoppingCart } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

//SIMULADOR PARA DETALLES, PODRIA HABERLO CREADO PERO POR TEMAS DE TIMEPO NO ME FUE POSIBLE
const salesData = [
  { id: 1, date: "2023-06-01", client: "Client A", total: 1500, currency: "USD" },
  { id: 2, date: "2023-06-02", client: "Client B", total: 2000, currency: "EUR" },
  { id: 3, date: "2023-06-03", client: "Client C", total: 1800, currency: "GBP" },
]
//SIMULADOR PARA DETALLES, PODRIA HABERLO CREADO PERO POR TEMAS DE TIMEPO NO ME FUE POSIBLE
const getSaleDetails = (id: number) => ({
  id,
  date: salesData.find(sale => sale.id === id)?.date || "",
  client: salesData.find(sale => sale.id === id)?.client || "",
  total: salesData.find(sale => sale.id === id)?.total || 0,
  currency: salesData.find(sale => sale.id === id)?.currency || "",
  branch: "Main Office",
  items: [
    { name: "Product A", quantity: 2, price: 500, subtotal: 1000 },
    { name: "Product B", quantity: 1, price: 500, subtotal: 500 },
  ]
})

export default function SalesManagement() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("sales")
  const [selectedSale, setSelectedSale] = useState<number | null>(null)
  const router = useRouter()

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const handleLogout = () => {
    router.push('/') 
  }

  const handleViewDetails = (id: number) => {
    setSelectedSale(id)
    setActiveTab("saleDetail")
  }

  const handleBackToList = () => {
    setSelectedSale(null)
    setActiveTab("sales")
  }

  const renderSalesList = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td className="px-6 py-4 whitespace-nowrap">{sale.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.client}</td>
              <td className="px-6 py-4 whitespace-nowrap">{sale.currency} {sale.total.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => handleViewDetails(sale.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderSaleDetails = () => {
    if (!selectedSale) return null
    const saleDetails = getSaleDetails(selectedSale)

    return (
      <div className="space-y-6">
        <button
          onClick={handleBackToList}
          className="flex items-center text-blue-600 hover:text-blue-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to list
        </button>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Sale Details</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details and items for sale #{saleDetails.id}</p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{saleDetails.date}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Client</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{saleDetails.client}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Branch</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{saleDetails.branch}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Currency</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{saleDetails.currency}</dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Total</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{saleDetails.currency} {saleDetails.total.toFixed(2)}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Items</h3>
          </div>
          <div className="border-t border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {saleDetails.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{saleDetails.currency} {item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{saleDetails.currency} {item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 ">
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-16 bg-white border-r flex flex-col items-center py-4 text-black"
      >
        <Link href="/dashboard" className="p-3 rounded-lg bg-blue-500 text-white mb-8">
          <Home size={24} />
        </Link>
        <nav className="flex flex-col gap-4">
          <Link href="/ventas" className="p-3 rounded-lg hover:bg-gray-100">
            <ShoppingCart size={24} />
          </Link>
          <Link href="/products" className="p-3 rounded-lg hover:bg-gray-100">
            <Package size={24} />
          </Link>
          <Link href="/clients" className="p-3 rounded-lg hover:bg-gray-100">
            <Users size={24} />
          </Link>
          <Link href="/settings" className="p-3 rounded-lg hover:bg-gray-100">
            <Settings size={24} />
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 text-black">
        <div className="mb-6 flex justify-between items-center">
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold">
            {activeTab === 'sales' ? 'Sales List' : activeTab === 'saleDetail' ? 'Sale Details' : 'Sales Management'}
          </h1>
          <div className="md:hidden">
            <Image
              src="/placeholder.svg"
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg p-6"
        >
          {activeTab === 'sales' && renderSalesList()}
          {activeTab === 'saleDetail' && renderSaleDetails()}
        </motion.div>
      </div>
    </div>
  )
}