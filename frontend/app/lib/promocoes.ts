import { apiClient } from './api-client';

export interface Promocao {
  id: number;
  nome: string;
  descricao: string | null;
  data_inicio: string;
  data_fim: string;
  status: string;
  usuario_id: number;
  created_at: string;
  updated_at: string;
}

export interface PromocaoWithCount extends Promocao {
  participantes_count: number;
  sorteios_count: number;
}

export interface PromocaoCreate {
  nome: string;
  descricao?: string;
  data_inicio: string;
  data_fim: string;
  status: string;
}

export interface PromocaoUpdate {
  nome?: string;
  descricao?: string;
  data_inicio?: string;
  data_fim?: string;
  status?: string;
}

export class PromocoesService {
  /**
   * Obtém a lista de promoções
   */
  async getPromocoes(params: { status?: string } = {}): Promise<PromocaoWithCount[]> {
    return apiClient.get<PromocaoWithCount[]>('/promocoes/', params);
  }

  /**
   * Obtém detalhes de uma promoção
   */
  async getPromocao(id: number): Promise<Promocao> {
    return apiClient.get<Promocao>(`/promocoes/${id}`);
  }

  /**
   * Cria uma nova promoção
   */
  async createPromocao(data: PromocaoCreate): Promise<Promocao> {
    return apiClient.post<Promocao>('/promocoes/', data);
  }

  /**
   * Atualiza uma promoção existente
   */
  async updatePromocao(id: number, data: PromocaoUpdate): Promise<Promocao> {
    return apiClient.put<Promocao>(`/promocoes/${id}`, data);
  }

  /**
   * Remove uma promoção
   */
  async deletePromocao(id: number): Promise<void> {
    return apiClient.delete<void>(`/promocoes/${id}`);
  }
}

export const promocoesService = new PromocoesService();