import { apiClient } from './api-client';

const TOKEN_KEY = 'sortear_token';
const USER_KEY = 'sortear_user';

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  radio: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Classe para gerenciar autenticação do usuário
 */
export class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    // Inicializa autenticação a partir do localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem(TOKEN_KEY);
      const userData = localStorage.getItem(USER_KEY);
      
      if (this.token) {
        apiClient.setToken(this.token);
        
        if (userData) {
          try {
            this.user = JSON.parse(userData);
          } catch (error) {
            console.error('Erro ao recuperar dados do usuário:', error);
            this.logout();
          }
        }
      }
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Retorna o usuário logado
   */
  getUser(): User | null {
    return this.user;
  }

  /**
   * Realiza login na aplicação
   */
  async login(credentials: LoginCredentials): Promise<User> {
    // Converte para FormData para usar o endpoint de login padrão do FastAPI/OAuth2
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    // Obtenha o token
    const tokenData = await apiClient.postForm<AuthToken>('/login', formData);
    this.token = tokenData.access_token;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, this.token);
    }
    
    // Configure o cliente de API com o novo token
    apiClient.setToken(this.token);
    
    // Obtenha os dados do usuário
    const userData = await apiClient.get<User>('/usuarios/me');
    this.user = userData;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    }
    
    return userData;
  }

  /**
   * Realiza logout da aplicação
   */
  logout(): void {
    this.token = null;
    this.user = null;
    apiClient.setToken(null);
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }
}

// Exporta uma instância do serviço para ser usada em toda a aplicação
export const authService = new AuthService();