import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tarefa } from '../../models/tarefa';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.css'
})
export class TarefaFormComponent implements OnChanges {
  /** Tarefa em edição. Quando for null, o formulário cadastra uma nova. */
  @Input() tarefa: Tarefa | null = null;
  @Output() salvar = new EventEmitter<Tarefa>();
  @Output() cancelar = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    descricao: [''],
    responsavel: ['', Validators.required],
    status: ['PENDENTE', Validators.required],
    prioridade: ['MEDIA', Validators.required]
  });

  ngOnChanges(): void {
    if (this.tarefa) {
      this.form.setValue({
        titulo: this.tarefa.titulo,
        descricao: this.tarefa.descricao ?? '',
        responsavel: this.tarefa.responsavel,
        status: this.tarefa.status,
        prioridade: this.tarefa.prioridade
      });
    } else {
      this.limpar();
    }
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvar.emit(this.form.getRawValue() as Tarefa);
    if (!this.tarefa) {
      this.limpar();
    }
  }

  limpar(): void {
    this.form.reset({ titulo: '', descricao: '', responsavel: '', status: 'PENDENTE', prioridade: 'MEDIA' });
  }

  campoInvalido(nome: 'titulo' | 'responsavel'): boolean {
    const campo = this.form.controls[nome];
    return campo.invalid && campo.touched;
  }
}
