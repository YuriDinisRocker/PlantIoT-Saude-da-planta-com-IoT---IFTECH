import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from './api.jsx';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CulturaDetails() {
  const { id, id_ref } = useParams();
  const navigate = useNavigate();
  const [monitoramentoAtual, setMonitoramentoAtual] = useState(null);
  const [historicoMonitoramentos, setHistoricoMonitoramentos] = useState([]);
  const [valoresReferencia, setValoresReferencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [amostras, setAmostras] = useState([]);
  const [numAmostras, setNumAmostras] = useState(2);
  const [statusColeta, setStatusColeta] = useState('idle'); // 'idle' | 'coletando' | 'sucesso'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');

        const [responseAtual, responseHistorico, responseReferencia] = await Promise.all([
          api.post("/consultaMonitoramento", { idCultura: id }),
          api.post("/historicoMonitoramento", { idCultura: id }),
          id_ref ? api.post("/referencia", { id_ref }) : Promise.resolve({ data: null })
        ]);

        

        setMonitoramentoAtual(responseAtual.data[0]);
        setHistoricoMonitoramentos(responseHistorico.data || []);

        if (responseReferencia?.data?.length) {
          setValoresReferencia(responseReferencia.data[0]);
        }

      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError(err.message || 'Erro ao carregar dados de monitoramento');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, id_ref]);

  const excluirCultura = async () => {
    if (!window.confirm("Tem certeza que deseja excluir esta cultura?")) return;

    try {
      await api.delete("/cultura", {
        data: { idCultura: id }
      });

      alert("Cultura excluída com sucesso!");
      navigate("/")
    } catch (err) {
      console.error("Erro ao excluir cultura:", err);
      alert("Erro ao excluir cultura.");
    }
  };

  const coletarAmostras = async () => {
    setStatusColeta('coletando');
    setError('');
    
    try {
      const novasAmostras = [];
      for (let i = 0; i < numAmostras; i++) {
        if(i>0){
            alert("Reposicione o dispositivo")
        }
        const { data } = await api.post("/recebeDados");
        novasAmostras.push(data);
        await new Promise(resolve => setTimeout(resolve, 1000));
         // Intervalo de 1s
      }
      setAmostras(novasAmostras);
      setStatusColeta('sucesso');
    } catch (err) {
      setError("Falha na comunicação com o dispositivo");
      setStatusColeta('idle');
    }
  };

  const cadastrarMedias = async () => {
    if (amostras.length === 0) return;
    
    try {
      const calcularMedia = (param) => {
        const total = amostras.reduce((sum, a) => sum + parseFloat(a[param]), 0);
        return (total / amostras.length).toFixed(2);
      };

      const dadosMedios = {
        idCultura: id,
        N: calcularMedia('n'),
        P: calcularMedia('p'),
        K: calcularMedia('k'),
        Ph: calcularMedia('ph'),
        Umidade: calcularMedia('umidade')
      };

      await api.post("/monitoramento", {idCultura:dadosMedios.idCultura, N:dadosMedios.N, P:dadosMedios.P, K:dadosMedios.K, Ph:dadosMedios.Ph, Umidade:dadosMedios.Umidade});
      
      // Atualiza a visualização
      const [responseAtual, responseHistorico] = await Promise.all([
          api.post("/consultaMonitoramento", { idCultura: id }),
          api.post("/historicoMonitoramento", { idCultura: id })
        ]);
      setMonitoramentoAtual(responseAtual.data[0]);
      setHistoricoMonitoramentos(responseHistorico.data || []);
      setAmostras([]);
      setStatusColeta('idle');

//////////////////////////////////////////
      
      
      
      
      alert("Monitoramento cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao cadastrar médias");
    }
  };

  const checkStatus = (valor, min, max) => {
    if (valor === null || valor === undefined) return 'neutral';
    const numValor = parseFloat(valor);
    const numMin = parseFloat(min);
    const numMax = parseFloat(max);
    return numValor < numMin ? 'low' : numValor > numMax ? 'high' : 'ideal';
  };

  const chartData = {
    labels: historicoMonitoramentos.map(m => new Date(m.data_monitoria).toLocaleDateString()).reverse(),
    datasets: [
      {
        label: 'Nitrogênio (N)',
        data: historicoMonitoramentos.map(m => m.n_media).reverse(),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Fósforo (P)',
        data: historicoMonitoramentos.map(m => m.p_media).reverse(),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Potássio (K)',
        data: historicoMonitoramentos.map(m => m.k_media).reverse(),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'pH',
        data: historicoMonitoramentos.map(m => m.ph_media).reverse(),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        yAxisID: 'y1',
      },
      {
        label: 'Umidade (%)',
        data: historicoMonitoramentos.map(m => m.umidade_media).reverse(),
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        yAxisID: 'y1',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Histórico de Monitoramento' },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'NPK (mg/kg)' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'pH e Umidade' }
      },
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-56"></div>
          <div className="h-4 bg-gray-200 rounded w-72"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-red-500 mb-4 font-medium">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4 mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
          Voltar
        </button>

        <button 
          onClick={excluirCultura}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Excluir Cultura
        </button>
      </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dados de Monitoramento</h2>

        {/* Seção de Coleta de Amostras */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-lg font-semibold mb-4">Coleta de Amostras</h3>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <select
              value={numAmostras}
              onChange={(e) => setNumAmostras(Number(e.target.value))}
              className="p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n} amostra{n > 1 ? 's' : ''}</option>
              ))}
            </select>

            <button
              onClick={coletarAmostras}
              disabled={statusColeta === 'coletando'}
              className={`px-4 py-2 rounded text-white ${
                statusColeta === 'coletando' 
                  ? 'bg-gray-400' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {statusColeta === 'coletando' ? 'Coletando...' : 'Iniciar Coleta'}
            </button>

            {amostras.length > 0 && (
              <button
                onClick={cadastrarMedias}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Cadastrar Médias ({amostras.length} amostras)
              </button>
            )}
          </div>

          {/* Listagem de Amostras */}
          {amostras.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Amostras coletadas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {amostras.map((amostra, index) => (
                  <div key={index} className="border p-3 rounded-lg bg-gray-50">
                    <p className="font-bold text-sm">Amostra #{index + 1}</p>
                    <div className="grid grid-cols-2 gap-1 mt-2 text-sm">
                      <span>N: {amostra.n}</span>
                      <span>P: {amostra.p}</span>
                      <span>K: {amostra.k}</span>
                      <span>pH: {amostra.ph}</span>
                      <span>Umidade: {amostra.umidade}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {monitoramentoAtual && valoresReferencia && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nutrientes */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Nutrientes (NPK)</h3>
                <div className="space-y-4">
                  {['n', 'p', 'k'].map(param => {
                    const valorAtual = monitoramentoAtual[`${param}_media`];
                    const min = valoresReferencia[`${param}_min`];
                    const max = valoresReferencia[`${param}_max`];
                    const status = checkStatus(valorAtual, min, max);
                    const nome = param === 'n' ? 'Nitrogênio' : param === 'p' ? 'Fósforo' : 'Potássio';

                    return (
                      <div key={param} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 font-medium">{nome} ({param.toUpperCase()})</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            status === 'ideal' ? 'bg-green-100 text-green-700' :
                            status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {status === 'ideal' ? 'Ideal' : status === 'low' ? 'Baixo' : 'Alto'}
                          </span>
                        </div>
                        <p className="text-base font-semibold">{valorAtual || 'N/A'} mg/kg</p>
                        <p className="text-xs text-gray-500">Ideal: {min} - {max} mg/kg</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Parâmetros adicionais */}
              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Outros Parâmetros</h3>
                <div className="space-y-4">
                  {['ph', 'umidade'].map(param => {
                    const valorAtual = monitoramentoAtual[`${param}_media`];
                    const min = valoresReferencia[`${param}_min`];
                    const max = valoresReferencia[`${param}_max`];
                    const status = checkStatus(valorAtual, min, max);
                    const nome = param === 'ph' ? 'pH do Solo' : 'Umidade';
                    const unidade = param === 'umidade' ? '%' : '';

                    return (
                      <div key={param} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-700 font-medium">{nome}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            status === 'ideal' ? 'bg-green-100 text-green-700' :
                            status === 'low' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {status === 'ideal' ? 'Ideal' : status === 'low' ? 'Baixo' : 'Alto'}
                          </span>
                        </div>
                        <p className="text-base font-semibold">{valorAtual || 'N/A'}{unidade}</p>
                        <p className="text-xs text-gray-500">Ideal: {min} - {max}{unidade}</p>
                      </div>
                    );
                  })}

                  <div className="pt-2">
                    <span className="text-sm text-gray-600">Data:</span>
                    <p className="font-medium">
                      {new Date(monitoramentoAtual.data_monitoria).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {historicoMonitoramentos.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Histórico de Monitoramento</h3>
            <div className="h-96">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CulturaDetails;