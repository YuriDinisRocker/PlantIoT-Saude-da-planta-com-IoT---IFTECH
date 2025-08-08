// Novo componente: CadastroCultura.jsx
import { useState, useEffect } from 'react';
import api from './api.jsx';
import { useNavigate } from 'react-router-dom';

function CadastroCultura() {
  const [nome, setNome] = useState('');
  const [semanas, setSemanas] = useState(1);
  const [idRef, setIdRef] = useState('');
  const [referencias, setReferencias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/referencia")
      .then(res => setReferencias(res.data))
      .catch(err => console.error("Erro ao buscar referências:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("cultura", {
        Nome: nome,
        idRef: parseInt(idRef),
        semanas: parseInt(semanas)
      });
      alert("Cultura cadastrada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar cultura:", error);
      alert("Erro ao cadastrar cultura");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Cadastrar Nova Cultura</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nome da Cultura</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Referência</label>
          <select
            value={idRef}
            onChange={(e) => setIdRef(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
            >
            <option value="">Selecione uma referência</option>
            {referencias.map((ref) => (
                <option key={ref.id} value={ref.id}>
                {ref.cultura || `Referência ${ref.id}`}
                </option>
            ))}
        </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Semanas</label>
          <input
            type="number"
            value={semanas}
            onChange={(e) => setSemanas(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            required
            min={1}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroCultura;
