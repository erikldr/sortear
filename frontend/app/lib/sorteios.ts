import { apiClient } from './api-client';
import { Participante } from './participantes';

export interface Sorteio {
  id: number;
  promocao_id: number;
  data_sorteio: string;
  descricao: string | null;
  created_at: string;
}

export interface SorteioCreate {
  promocao_id: number;
  data_sorteio: string;
  descricao?: string;
}

export interface SorteioUpdate {
  data_sorteio?: string;
  descricao?: string;
}

export interface SorteioExecute {
  quantidade: number;
}

export interface Ganhador {
  id: number;
  sorteio_id: number;
  participante_id: number;
  created_at: string;
}

export interface GanhadorWithParticipante extends Ganhador {
  participante: Participante;
}

export class SorteiosService {
  /**
   * Obtém a lista de sorteios de uma promoção
   */
  async getSorteiosByPromocao(promocaoId: number): Promise<Sorteio[]> {
    return apiClient.get<Sorteio[]>(`/sorteios/promocao/${promocaoId}`);
  }

  /**
   * Obtém detalhes de um sorteio
   */
  async getSorteio(id: number): Promise<Sorteio> {
    return apiClient.get<Sorteio>(`/sorteios/${id}`);
  }

  /**
   * Cria um novo sorteio
   */
  async createSorteio(data: SorteioCreate): Promise<Sorteio> {
    return apiClient.post<Sorteio>('/sorteios/', data);
  }

  /**
   * Atualiza um sorteio existente
   */
  async updateSorteio(id: number, data: SorteioUpdate): Promise<Sorteio> {
    return apiClient.put<Sorteio>(`/sorteios/${id}`, data);
  }

  /**
   * Remove um sorteio
   */
  async deleteSorteio(id: number): Promise<void> {
    return apiClient.delete<void>(`/sorteios/${id}`);
  }

  /**
   * Executa um sorteio (seleciona ganhadores aleatoriamente)
   */
  async executarSorteio(id: number, data: SorteioExecute): Promise<GanhadorWithParticipante[]> {
    return apiClient.post<GanhadorWithParticipante[]>(`/sorteios/${id}/executar`, data);
  }

  /**
   * Obtém a lista de ganhadores de um sorteio
   */
  async getGanhadores(sorteioId: number): Promise<GanhadorWithParticipante[]> {
    return apiClient.get<GanhadorWithParticipante[]>(`/sorteios/${sorteioId}/ganhadores`);
  }
}

export const sorteiosService = new SorteiosService();