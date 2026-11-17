import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TarefaFormComponent } from './components/tarefa-form/tarefa-form.component';
import { TarefaListaComponent } from './components/tarefa-lista/tarefa-lista.component';
import { StatusTarefa, Tarefa } from './models/tarefa';
import { TarefaService } from './services/tarefa.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, TarefaFormComponent, TarefaListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tarefas: Tarefa[] = [];
  filtroStatus: StatusTarefa | '' = '';
  tarefaEmEdicao: Tarefa | null = null;
  mensagem = '';
  erro = '';

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.erro = '';
    this.tarefaService.listar(this.filtroStatus).subscribe({
      next: (tarefas) => (this.tarefas = tarefas),
      error: () => (this.erro = 'Não foi possível conectar à API. Verifique se o backend está rodando na porta 8080.')
    });
  }

  salvar(tarefa: Tarefa): void {
    const requisicao = this.tarefaEmEdicao?.id
      ? this.tarefaService.editar(this.tarefaEmEdicao.id, tarefa)
      : this.tarefaService.cadastrar(tarefa);

    requisicao.subscribe({
      next: () => {
        this.mostrarMensagem(this.tarefaEmEdicao ? 'Tarefa atualizada!' : 'Tarefa cadastrada!');
        this.tarefaEmEdicao = null;
        this.carregar();
      },
      error: () => (this.erro = 'Erro ao salvar a tarefa. Confira os campos obrigatórios.')
    });
  }

  editar(tarefa: Tarefa): void {
    this.tarefaEmEdicao = tarefa;
  }

  cancelarEdicao(): void {
    this.tarefaEmEdicao = null;
  }

  excluir(tarefa: Tarefa): void {
    if (!tarefa.id || !confirm(`Excluir a tarefa "${tarefa.titulo}"?`)) {
      return;
    }
    this.tarefaService.excluir(tarefa.id).subscribe({
      next: () => {
        this.mostrarMensagem('Tarefa excluída!');
        if (this.tarefaEmEdicao?.id === tarefa.id) {
          this.tarefaEmEdicao = null;
        }
        this.carregar();
      },
      error: () => (this.erro = 'Erro ao excluir a tarefa.')
    });
  }

  private mostrarMensagem(texto: string): void {
    this.mensagem = texto;
    setTimeout(() => (this.mensagem = ''), 3000);
  }
}
