import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

export async function listarTarefas() {
  const resposta = await api.get('/tarefas');
  return resposta.data;
}

export async function buscarTarefa(id) {
  const resposta = await api.get(`/tarefas/${id}`);
  return resposta.data;
}

export async function alterarStatus(id, status) {
  const resposta = await api.patch(`/tarefas/${id}/status`, { status });
  return resposta.data;
}
