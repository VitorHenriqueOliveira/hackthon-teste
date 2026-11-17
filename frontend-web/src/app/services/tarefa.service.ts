import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StatusTarefa, Tarefa } from '../models/tarefa';

@Injectable({ providedIn: 'root' })
export class TarefaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listar(status?: StatusTarefa | ''): Observable<Tarefa[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<Tarefa[]>(this.apiUrl, { params });
  }

  buscarPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  cadastrar(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa);
  }

  editar(id: number, tarefa: Tarefa): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefa);
  }

  alterarStatus(id: number, status: StatusTarefa): Observable<Tarefa> {
    return this.http.patch<Tarefa>(`${this.apiUrl}/${id}/status`, { status });
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
