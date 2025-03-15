import { apiClient } from './api-client';

export interface Participante {
  id: number;
  nome: string;
  telefone: string;
  cpf: string | null;
  email: string | null;
  promocao_id: number;
  created_at: string;
}

export interface ParticipanteCreate {
  nome: string;
  telefone: string;
  cpf?: string;
  email?: string;
  promocao_id: number;
}

export interface ParticipanteUpdate {
  nome?: string;
  telefone?: string;
  cpf?: string;
  email?: string;
}

export class ParticipantesService {
  /**
   * Obtém a lista de participantes de uma promoção
   */
  async getParticipantesByPromocao(
    promocaoId: number, 
    params: { 
      skip?: number; 
      limit?: number; 
      search?: string 
    } = {}
  ): Promise<Participante[]> {
    return apiClient.get<Participante[]>(
      `/participantes/promocao/${promocaoId}`,
      params as Record<string, string>
    );
  }

  /**
   * Obtém detalhes de um participante
   */
  async getParticipante(id: number): Promise<Participante> {
    return apiClient.get<Participante>(`/participantes/${id}`);
  }

  /**
   * Cria um novo participante
   */
  async createParticipante(data: ParticipanteCreate): Promise<Participante> {
    return apiClient.post<Participante>('/participantes/', data);
  }

  /**
   * Atualiza um participante existente
   */
  async updateParticipante(id: number, data: ParticipanteUpdate): Promise<Participante> {
    return apiClient.put<Participante>(`/participantes/${id}`, data);
  }

  /**
   * Remove um participante
   */
  async deleteParticipante(id: number): Promise<void> {
    return apiClient.delete<void>(`/participantes/${id}`);
  }

  /**
   * Conta o número de participantes em uma promoção
   */
  async countParticipantes(promocaoId: number): Promise<number> {
    return apiClient.get<number>(`/participantes/promocao/${promocaoId}/count`);
  }
}

export const participantesService = new ParticipantesService();