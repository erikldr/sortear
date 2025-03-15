import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Cadastro - SorteAr" },
    { name: "description", content: "Crie sua conta no SorteAr e comece a gerenciar promoções para sua rádio" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const nome = formData.get("nome");
  const radio = formData.get("radio");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const termos = formData.get("termos") === "on";
  
  // Adicionando um pequeno atraso para simular chamada de API
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Validação básica
  const errors: Record<string, string> = {};
  
  if (!nome) errors.nome = "Nome é obrigatório";
  if (!radio) errors.radio = "Nome da rádio é obrigatório";
  
  if (!email) errors.email = "E-mail é obrigatório";
  else if (!/^\S+@\S+\.\S+$/.test(email.toString())) errors.email = "E-mail inválido";
  
  if (!password) errors.password = "Senha é obrigatória";
  else if (password.toString().length < 6) errors.password = "Senha deve ter pelo menos 6 caracteres";
  
  if (!confirmPassword) errors.confirmPassword = "Confirmação de senha é obrigatória";
  else if (password !== confirmPassword) errors.confirmPassword = "As senhas não coincidem";
  
  if (!termos) errors.termos = "Você precisa aceitar os termos de uso";
  
  if (Object.keys(errors).length > 0) {
    return { 
      errors, 
      fields: { 
        nome, 
        radio, 
        email,
        termos 
      } 
    };
  }
  
  // Simulando criação de conta bem-sucedida
  // Em produção, você faria uma chamada à API
  return { success: true };
};

export default function Cadastro() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [step, setStep] = useState(1);
  
  // Simular redirecionamento após cadastro bem-sucedido
  useEffect(() => {
    if (actionData?.success && !redirecting) {
      setRedirecting(true);
      // Em produção, você usaria useNavigate ou redirect
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  }, [actionData?.success, redirecting]);
  
  // Multi-step form navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <img src="/logo-dark.png" alt="SorteAr Logo" className="h-12 mx-auto" />
            <span className="text-blue-600 text-2xl font-bold mt-2 block">SorteAr</span>
          </Link>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-6">
            Crie sua conta
          </h2>
          
          {actionData?.success && (
            <div className="mb-4 rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Conta criada com sucesso! Redirecionando...</p>
                </div>
              </div>
            </div>
          )}

          {/* Progresso do formulário */}
          <div className="mb-8">
            <div className="flex justify-between">
              <div className={`flex flex-col items-center ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${step >= 1 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  {step > 1 ? (
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>1</span>
                  )}
                </div>
                <span className="text-xs">Dados da Rádio</span>
              </div>
              
              <div className="w-full flex items-center">
                <div className={`h-1 w-full ${step > 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${step >= 2 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  {step > 2 ? (
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>2</span>
                  )}
                </div>
                <span className="text-xs">Acesso</span>
              </div>
              
              <div className="w-full flex items-center">
                <div className={`h-1 w-full ${step > 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              </div>
              
              <div className={`flex flex-col items-center ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`rounded-full w-8 h-8 flex items-center justify-center mb-2 ${step >= 3 ? 'bg-blue-100 border-2 border-blue-600' : 'bg-gray-100 border-2 border-gray-300'}`}>
                  <span>3</span>
                </div>
                <span className="text-xs">Finalizar</span>
              </div>
            </div>
          </div>

          <Form method="post" className="space-y-6">
            {/* Passo 1: Dados da Rádio */}
            {step === 1 && (
              <>
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium leading-6 text-gray-900">
                    Seu nome
                  </label>
                  <div className="mt-2">
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      autoComplete="name"
                      defaultValue={actionData?.fields?.nome || ''}
                      required
                      className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                        actionData?.errors?.nome ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      placeholder="Seu nome completo"
                    />
                    {actionData?.errors?.nome && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.nome}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="radio" className="block text-sm font-medium leading-6 text-gray-900">
                    Nome da rádio
                  </label>
                  <div className="mt-2">
                    <input
                      id="radio"
                      name="radio"
                      type="text"
                      defaultValue={actionData?.fields?.radio || ''}
                      required
                      className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                        actionData?.errors?.radio ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      placeholder="Ex: Rádio Cidade FM"
                    />
                    {actionData?.errors?.radio && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.radio}</p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-150"
                  >
                    Próximo
                  </button>
                </div>
              </>
            )}

            {/* Passo 2: Dados de Acesso */}
            {step === 2 && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    E-mail
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      defaultValue={actionData?.fields?.email || ''}
                      required
                      className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                        actionData?.errors?.email ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      placeholder="seuemail@exemplo.com"
                    />
                    {actionData?.errors?.email && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Senha
                  </label>
                  <div className="mt-2 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                        actionData?.errors?.password ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 pr-10`}
                      placeholder="Mínimo 6 caracteres"
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      )}
                    </button>
                    {actionData?.errors?.password && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.password}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirme sua senha
                  </label>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
                        actionData?.errors?.confirmPassword ? 'ring-red-300 focus:ring-red-500' : 'ring-gray-300 focus:ring-blue-600'
                      } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                      placeholder="Repita sua senha"
                    />
                    {actionData?.errors?.confirmPassword && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex w-1/2 justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition duration-150"
                  >
                    Voltar
                  </button>
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex w-1/2 justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition duration-150"
                  >
                    Próximo
                  </button>
                </div>
              </>
            )}

            {/* Passo 3: Termos e Finalização */}
            {step === 3 && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="text-base font-semibold mb-3">Resumo do cadastro</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Rádio:</span> {actionData?.fields?.radio || "Sua rádio"}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Nome:</span> {actionData?.fields?.nome || "Seu nome"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">E-mail:</span> {actionData?.fields?.email || "seu@email.com"}
                  </p>
                </div>

                <div className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id="termos"
                      name="termos"
                      type="checkbox"
                      defaultChecked={actionData?.fields?.termos}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor="termos" className="text-gray-700">
                      Concordo com os 
                      <Link to="/termos" className="text-blue-600 hover:text-blue-500 mx-1">
                        termos de serviço
                      </Link> 
                      e 
                      <Link to="/privacidade" className="text-blue-600 hover:text-blue-500 ml-1">
                        política de privacidade
                      </Link>
                    </label>
                    {actionData?.errors?.termos && (
                      <p className="text-red-500 text-xs mt-1">{actionData.errors.termos}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex w-1/2 justify-center rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition duration-150"
                  >
                    Voltar
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || redirecting}
                    className="flex w-1/2 justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300 transition duration-150"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Criando conta...
                      </span>
                    ) : "Criar conta"}
                  </button>
                </div>
              </>
            )}
          </Form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                Google
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1877F2] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0c64cf]"
              >
                <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Já tem uma conta?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition duration-150">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}