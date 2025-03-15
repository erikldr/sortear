import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authService } from "~/lib/auth";
import { promocoesService, PromocaoWithCount } from "~/lib/promocoes";

export default function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(authService.getUser());
  const [promocoes, setPromocoes] = useState<PromocaoWithCount[]>([]);
  
  const [stats, setStats] = useState({
    promocoesAtivas: 0,
    totalParticipantes: 0,
    totalSorteios: 0
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Carregar promoções
        const promocoesData = await promocoesService.getPromocoes();
        setPromocoes(promocoesData);
        
        // Calcular estatísticas
        const ativas = promocoesData.filter(p => p.status === 'ativa').length;
        const participantes = promocoesData.reduce((total, p) => total + p.participantes_count, 0);
        const sorteios = promocoesData.reduce((total, p) => total + p.sorteios_count, 0);
        
        setStats({
          promocoesAtivas: ativas,
          totalParticipantes: participantes,
          totalSorteios: sorteios
        });
        
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar dados do dashboard:", err);
        setError("Não foi possível carregar os dados. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);
  
  // Função para formatar data para dd/mm/yyyy
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen -mt-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Erro</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bem-vindo, {user?.nome}</h1>
        <p className="mt-2 text-gray-600">
          Gerencie suas promoções, participantes e sorteios com facilidade.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-lg text-gray-800">Promoções Ativas</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.promocoesAtivas}</p>
          <p className="mt-1 text-sm text-gray-600">
            <Link to="/dashboard/promocoes" className="text-blue-600 hover:underline">
              Ver todas as promoções
            </Link>
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-lg text-gray-800">Participantes</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalParticipantes}</p>
          <p className="mt-1 text-sm text-gray-600">
            <Link to="/dashboard/participantes" className="text-blue-600 hover:underline">
              Ver todos os participantes
            </Link>
          </p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-lg text-gray-800">Sorteios Realizados</h2>
          <p className="mt-2 text-3xl font-bold text-blue-600">{stats.totalSorteios}</p>
          <p className="mt-1 text-sm text-gray-600">
            <Link to="/dashboard/sorteios" className="text-blue-600 hover:underline">
              Ver todos os sorteios
            </Link>
          </p>
        </div>
      </div>
      
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg text-gray-800">Promoções Recentes</h2>
          <Link
            to="/dashboard/promocoes"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todas
          </Link>
        </div>
        
        {promocoes.length === 0 ? (
          <div className="py-8 text-center">
            <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-gray-500 mb-2">Você ainda não tem promoções</p>
            <Link
              to="/dashboard/promocoes/nova"
              className="text-blue-600 font-semibold hover:text-blue-800"
            >
              Criar minha primeira promoção
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Participantes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Final</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promocoes.slice(0, 5).map((promocao) => (
                  <tr key={promocao.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <Link to={`/dashboard/promocoes/${promocao.id}`} className="hover:text-blue-600">
                        {promocao.nome}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        promocao.status === 'ativa' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {promocao.status === 'ativa' ? 'Ativa' : 'Inativa'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {promocao.participantes_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(promocao.data_fim)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
