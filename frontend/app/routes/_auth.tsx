import { Outlet, useNavigate, Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { authService } from "~/lib/auth";

export default function AuthLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar autenticação ao carregar o componente
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        navigate("/login");
        return;
      }
      
      // Definir dados do usuário
      setUser(authService.getUser());
    };
    
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white fixed h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold">SorteAr</h1>
        </div>
        <nav className="mt-6">
          <a href="/dashboard" className="block py-3 px-6 hover:bg-blue-700">Dashboard</a>
          <a href="/dashboard/promocoes" className="block py-3 px-6 hover:bg-blue-700">Promoções</a>
          <a href="/dashboard/participantes" className="block py-3 px-6 hover:bg-blue-700">Participantes</a>
          <a href="/dashboard/sorteios" className="block py-3 px-6 hover:bg-blue-700">Sorteios</a>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <div className="pb-4 mb-4 border-b border-blue-700">
            <p className="text-sm text-blue-300">Logado como</p>
            <p className="text-white font-semibold">{user?.nome || 'Usuário'}</p>
            <p className="text-xs text-blue-300 truncate">{user?.radio || 'Rádio'}</p>
          </div>
          <button 
            className="w-full text-left py-2 px-4 hover:bg-blue-700 rounded"
            onClick={() => {
              // Lógica de logout real
              authService.logout();
              setIsAuthenticated(false);
              navigate("/login");
            }}
          >
            Sair
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="ml-64 flex-1">
        <header className="bg-white shadow">
          <div className="py-4 px-6">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
