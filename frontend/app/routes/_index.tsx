import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "SorteAr - Gerenciamento de Promoções e Sorteios para Rádios" },
    { name: "description", content: "Sistema completo de gerenciamento de promoções e sorteios desenvolvido especialmente para emissoras de rádio." },
  ];
};

export default function Index() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src="/logo-dark.png" alt="SorteAr Logo" className="h-8 w-auto" />
              <span className="ml-3 text-blue-600 text-2xl font-bold">SorteAr</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition duration-200">Entrar</Link>
              <Link 
                to="/cadastro" 
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Cadastrar
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
                <span className="block">Promova, Sorteie,</span>
                <span className="block text-blue-600">Fidelize Ouvintes</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                SorteAr é a plataforma completa para emissoras de rádio gerenciarem promoções 
                e sorteios de forma simples, segura e profissional.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/cadastro"
                  className="px-8 py-4 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 text-center shadow-lg hover:shadow-xl transition duration-200"
                >
                  Começar Agora
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 text-base font-medium rounded-md text-blue-600 bg-white border border-blue-200 hover:bg-gray-50 text-center shadow hover:shadow-md transition duration-200"
                >
                  Entrar
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl overflow-hidden transform rotate-1 hover:rotate-0 transition duration-300">
                <div className="p-8 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
                  <div className="flex flex-col items-center">
                    <div className="text-7xl mb-4">📻 🎁 🎯</div>
                    <div className="text-white text-xl font-bold">Transforme suas promoções</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="p-6 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-600">100+</p>
              <p className="text-gray-600">Rádios utilizando</p>
            </div>
            <div className="p-6 bg-indigo-50 rounded-lg">
              <p className="text-3xl font-bold text-indigo-600">5000+</p>
              <p className="text-gray-600">Promoções criadas</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-600">50.000+</p>
              <p className="text-gray-600">Participantes</p>
            </div>
            <div className="p-6 bg-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-600">99.9%</p>
              <p className="text-gray-600">Uptime garantido</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Funcionalidades</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tudo o que sua rádio precisa
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Gerencie todo o ciclo promocional em uma única plataforma intuitiva e profissional.
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-200">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xl">
                  📊
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Gestão de Promoções</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Crie e gerencie promoções com períodos, regras e controle de participantes em uma interface intuitiva.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Múltiplas promoções simultâneas
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Regras personalizáveis
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-200">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-xl">
                  👥
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Cadastro de Participantes</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Registro simplificado com validação automática e prevenção de duplicidades.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verificação de CPF/RG
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Detecção de participações indevidas
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition duration-200">
                <div className="flex items-center justify-center h-14 w-14 rounded-md bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xl">
                  🎯
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Sorteios Transparentes</h3>
                  <p className="mt-3 text-base text-gray-500">
                    Realize sorteios aleatórios com total transparência e registro completo dos resultados.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Algoritmo auditável
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="h-5 w-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Transmissão ao vivo
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* How it works */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Como funciona</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simples e eficiente
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Quatro passos simples para transformar suas promoções
            </p>
          </div>
          
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              <div className="relative">
                <div className="border-2 border-blue-500 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200">
                  <div className="absolute -top-4 -left-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold border-4 border-white">
                    1
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-gray-900 mt-2">Cadastre-se</h3>
                    <p className="mt-3 text-gray-600">
                      Crie sua conta em menos de 1 minuto e configure sua emissora de rádio.
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-blue-200"></div>
              </div>
              
              <div className="relative">
                <div className="border-2 border-blue-500 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200">
                  <div className="absolute -top-4 -left-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold border-4 border-white">
                    2
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-gray-900 mt-2">Configure promoções</h3>
                    <p className="mt-3 text-gray-600">
                      Defina regras, período, prêmios e critérios de participação.
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-blue-200"></div>
              </div>
              
              <div className="relative">
                <div className="border-2 border-blue-500 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200">
                  <div className="absolute -top-4 -left-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold border-4 border-white">
                    3
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-gray-900 mt-2">Divulgue</h3>
                    <p className="mt-3 text-gray-600">
                      Compartilhe o link personalizado com seus ouvintes através das redes sociais.
                    </p>
                  </div>
                </div>
                <div className="hidden lg:block absolute top-1/2 left-full w-12 h-1 bg-blue-200"></div>
              </div>
              
              <div className="relative">
                <div className="border-2 border-blue-500 bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-200">
                  <div className="absolute -top-4 -left-4 flex items-center justify-center h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold border-4 border-white">
                    4
                  </div>
                  <div className="pt-4">
                    <h3 className="text-xl font-bold text-gray-900 mt-2">Sorteie</h3>
                    <p className="mt-3 text-gray-600">
                      Realize o sorteio ao vivo com transparência e anuncie os ganhadores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Depoimentos</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              O que nossos clientes dizem
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-bold">
                  FM
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Rádio Cidade FM</h4>
                  <p className="text-sm text-gray-600">São Paulo, SP</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Desde que começamos a usar o SorteAr, nossas promoções aumentaram em 70% o engajamento dos ouvintes."
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
                  JR
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Jovem Rádio</h4>
                  <p className="text-sm text-gray-600">Rio de Janeiro, RJ</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "A transparência dos sorteios e a facilidade de gerenciar participantes é impressionante."
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-200 flex items-center justify-center text-purple-600 font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Metropolitana Rádio</h4>
                  <p className="text-sm text-gray-600">Belo Horizonte, MG</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Economizamos tempo e recursos com o SorteAr. A plataforma é intuitiva e nossas equipes adoram."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Final CTA */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Pronto para transformar suas promoções?</span>
              <span className="block text-blue-200">Cadastre-se gratuitamente hoje.</span>
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-3xl">
              Comece agora e tenha sua primeira promoção no ar em menos de 10 minutos.
              Sem custos iniciais e sem compromisso.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex">
            <Link
              to="/cadastro"
              className="px-6 py-4 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 shadow-md hover:shadow-lg transition duration-200 text-lg"
            >
              Criar minha conta grátis
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">SorteAr</h3>
              <p className="text-gray-400">
                A plataforma completa para emissoras de rádio gerenciarem promoções e sorteios.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Promoções</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Sorteios</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Participantes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Sobre</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="#" className="text-gray-400 hover:text-white">Termos</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Privacidade</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-gray-400">
              © 2025 SorteAr - Todos os direitos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}