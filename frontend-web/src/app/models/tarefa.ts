export type StatusTarefa = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA';

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: StatusTarefa;
  prioridade: Prioridade;
}

export const STATUS_LABEL: Record<StatusTarefa, string> = {
  PENDENTE: 'Pendente',
  EM_ANDAMENTO: 'Em andamento',
  CONCLUIDA: 'Concluída'
};

export const PRIORIDADE_LABEL: Record<Prioridade, string> = {
  BAIXA: 'Baixa',
  MEDIA: 'Média',
  ALTA: 'Alta'
};
