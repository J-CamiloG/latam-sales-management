'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Package, 
  Users, 
  Settings, 
  PlusCircle, 
  X,
  Search,
  ShoppingCart,
  ChevronDown
} from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [clients, setClients] = useState([])
  const [branchOffices, setBranchOffices] = useState([])
  const [products, setProducts] = useState({})
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState(null)
  const [currency, setCurrency] = useState("")
  const [details, setDetails] = useState([])
  const [clientSearch, setClientSearch] = useState("")
  const [productSearch, setProductSearch] = useState("")
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [showBranchDropdown, setShowBranchDropdown] = useState(false)
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", email: "" })
  const [showNewClientModal, setShowNewClientModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [clientsResponse, branchOfficesResponse, productsResponse] = await Promise.all([
          fetch('http://localhost:3000/clients'),
          fetch('http://localhost:3000/branch_offices'),
          fetch('http://localhost:3000/products')
        ])

        if (!clientsResponse.ok || !branchOfficesResponse.ok || !productsResponse.ok) {
          throw new Error('Error fetching data')
        }

        const clientsData = await clientsResponse.json()
        const branchOfficesData = await branchOfficesResponse.json()
        const productsData = await productsResponse.json()

        setClients(clientsData)
        setBranchOffices(branchOfficesData)
        setProducts(productsData)
      } catch (error) {
        setError('Failed to fetch data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (selectedBranch) {
      setCurrency(selectedBranch.currency)
    }
  }, [selectedBranch])

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch)
    setShowBranchDropdown(false)
  }

  const handleAddProduct = (product) => {
    setDetails([...details, { ...product, quantity: 1, subtotal: product.price }])
    setShowProductDropdown(false)
  }

  const handleQuantityChange = (index, quantity) => {
    const newDetails = [...details]
    newDetails[index].quantity = quantity
    newDetails[index].subtotal = quantity * newDetails[index].price
    setDetails(newDetails)
  }

  const handleRemoveDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index))
  }

  const total = details.reduce((sum, detail) => sum + detail.subtotal, 0)

  const handleSave = () => {
    const sale = {
      client: selectedClient,
      branchOffice: selectedBranch,
      currency,
      details,
      total
    }
    console.log('Saving sale:', sale)
    // Aquí normalmente harías una llamada a la API para 
    //crear un nuevo cliente, pero por temas de timepo no me fue posible terminar al 100%
    
  }

  const handleCreateClient = () => {
    // Aquí normalmente harías una llamada a la API para 
    //crear un nuevo cliente, pero por temas de timepo no me fue posible terminar al 100%

    const client = { id: clients.length + 1, ...newClient }
    setClients([...clients, client])
    setSelectedClient(client)
    setNewClient({ name: "", email: "" })
    setShowNewClientModal(false)
  }

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(clientSearch.toLowerCase())
  )

  const filteredProducts = selectedBranch && products[selectedBranch.id]
    ? products[selectedBranch.id].filter(product => 
        product.name.toLowerCase().includes(productSearch.toLowerCase())
      )
    : []

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-black">Cargando...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
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
          <Link href="/#" className="p-3 rounded-lg hover:bg-gray-100">
            <Package size={24} />
          </Link>
          <Link href="/#" className="p-3 rounded-lg hover:bg-gray-100">
            <Users size={24} />
          </Link>
          <Link href="/#" className="p-3 rounded-lg hover:bg-gray-100">
            <Settings size={24} />
          </Link>
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 overflow-auto text-black">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <ShoppingCart className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-black">Nueva Venta</h1>
            </div>

            {/* Document section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6 text-black">Documento</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Client selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">Cliente</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                      onClick={() => setShowClientDropdown(!showClientDropdown)}
                    >
                      {selectedClient ? selectedClient.name : "Seleccionar cliente..."}
                      <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                    </button>
                    {showClientDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        <input
                          type="text"
                          className="block w-full px-4 py-2 border-b text-black"
                          placeholder="Buscar clientes..."
                          value={clientSearch}
                          onChange={(e) => setClientSearch(e.target.value)}
                        />
                        {filteredClients.map((client) => (
                          <div
                            key={client.id}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-black"
                            onClick={() => {
                              setSelectedClient(client)
                              setShowClientDropdown(false)
                            }}
                          >
                            {client.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setShowNewClientModal(true)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nuevo Cliente
                  </button>
                </div>

                {/* Branch office selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">Sucursal</label>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-black"
                      onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                    >
                      {selectedBranch ? selectedBranch.name : "Seleccionar sucursal..."}
                      <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-2" />
                    </button>
                    {showBranchDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {branchOffices.map((branch) => (
                          <div
                            key={branch.id}
                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-black"
                            onClick={() => handleBranchSelect(branch)}
                          >
                            {branch.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Currency display */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">Moneda</label>
                  <input
                    type="text"
                    value={currency}
                    disabled
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                  />
                </div>
              </div>
            </div>

            {/* Details section */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-black">Detalles</h2>
              
              {/* Products table */}
              <div className="overflow-x-auto">
                <table className="w-full mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-2 text-black">Nombre</th>
                      <th className="text-left pb-2 text-black">Cantidad</th>
                      <th className="text-left pb-2 text-black">Precio</th>
                      <th className="text-left pb-2 text-black">Subtotal</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((detail, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 text-black">{detail.name}</td>
                        <td className="py-2">
                          <input
                            type="number"
                            min="1"
                            value={detail.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                            className="w-24 border border-gray-300 rounded-md py-1 px-2 text-black"
                          />
                        </td>
                        <td className="py-2 text-black">{detail.price}</td>
                        <td className="py-2 text-black">{detail.subtotal}</td>
                        <td className="py-2">
                          <button
                            onClick={() => handleRemoveDetail(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add product button */}
              <div className="flex items-center justify-between">
                <div className="relative">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => setShowProductDropdown(!showProductDropdown)}
                  >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </button>
                  {showProductDropdown && (
                    <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      <input
                        type="text"
                        className="block w-full px-4 py-2 border-b text-black"
                        placeholder="Buscar productos..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                      />
                      {filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 text-black"
                          onClick={() => handleAddProduct(product)}
                        >
                          {product.name} - {product.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="text-right">
                    <span className="font-semibold text-black">Total:</span>{' '}
                    <span className="text-xl text-black">{total}</span>{' '}
                    <span className="text-gray-500">{currency}</span>
                  </div>
                  <button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                    disabled={!selectedClient || !selectedBranch || details.length === 0}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* New Client Modal */}
      {showNewClientModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-black" id="modal-title">
                  Crear Nuevo Cliente
                </h3>
                <div className="mt-2">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-black">Nombre</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        value={newClient.name}
                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-black"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCreateClient}
                >
                  Crear Cliente
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowNewClientModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}