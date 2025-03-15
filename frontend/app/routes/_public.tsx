import { Outlet } from "@remix-run/react";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="font-bold text-xl text-blue-600">SorteAr</div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login" className="text-gray-700 hover:text-blue-600">Entrar</a>
              <a href="/cadastro" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Cadastrar
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-gray-500 text-center">© 2025 SorteAr - Todos os direitos reservados</p>
        </div>
      </footer>
    </div>
  );
}
