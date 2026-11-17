package br.com.taskflow.dto;

import br.com.taskflow.entity.Prioridade;
import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.entity.Tarefa;

/**
 * Dados devolvidos pela API.
 */
public record TarefaResponseDTO(
        Long id,
        String titulo,
        String descricao,
        String responsavel,
        StatusTarefa status,
        Prioridade prioridade
) {
    public static TarefaResponseDTO fromEntity(Tarefa tarefa) {
        return new TarefaResponseDTO(
                tarefa.getId(),
                tarefa.getTitulo(),
                tarefa.getDescricao(),
                tarefa.getResponsavel(),
                tarefa.getStatus(),
                tarefa.getPrioridade()
        );
    }
}
