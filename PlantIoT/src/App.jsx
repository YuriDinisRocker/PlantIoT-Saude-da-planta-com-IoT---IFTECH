import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import logoPlantIoT from './assets/logoPlantIoT.png'
import api from './api.jsx'
import CulturaDetails from './CulturaDetails'
import CadastroCultura from './CadastroCultura'

function Home() {
  const [culturas, setCulturas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get("cultura")
      .then((res) => {
        setCulturas(res.data)
      })
      .catch((err) => console.error("Erro ao buscar cultura:", err))
  }, [])

  const handleConsultarDados = (idCultura, idRef) => {
    navigate(`/cultura/${idCultura}/${idRef}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md mb-10">
        <div className="flex items-center gap-3">
          <img src={logoPlantIoT} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-gray-800">PlantIoT</h1>
        </div>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600">Culturas</Link>
          <Link to="/cadastrar" className="hover:text-blue-600">Cadastrar Cultura</Link>
        </nav>
      </header>

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Culturas Cadastradas:
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {culturas.map((cultura) => (
          <div
            key={cultura.id}
            className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900">{cultura.nome}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Data de criação: {new Date(cultura.data_criacao).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleConsultarDados(cultura.id, cultura.id_ref)}
                className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Consultar Dados
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cultura/:id/:id_ref" element={<CulturaDetails />} />
        <Route path="/cadastrar" element={<CadastroCultura />} />
      </Routes>
    </Router>
  )
}

export default App