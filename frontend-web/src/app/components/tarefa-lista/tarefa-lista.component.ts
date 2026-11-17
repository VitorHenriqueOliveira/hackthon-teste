import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PRIORIDADE_LABEL, STATUS_LABEL, Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  templateUrl: './tarefa-lista.component.html',
  styleUrl: './tarefa-lista.component.css'
})
export class TarefaListaComponent {
  @Input() tarefas: Tarefa[] = [];
  @Output() editar = new EventEmitter<Tarefa>();
  @Output() excluir = new EventEmitter<Tarefa>();

  statusLabel = STATUS_LABEL;
  prioridadeLabel = PRIORIDADE_LABEL;
}
