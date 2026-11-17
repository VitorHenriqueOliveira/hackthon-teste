package br.com.taskflow.dto;

import br.com.taskflow.entity.Prioridade;
import br.com.taskflow.entity.StatusTarefa;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Dados recebidos no POST e no PUT.
 */
public record TarefaRequestDTO(
        @NotBlank(message = "O título é obrigatório")
        String titulo,

        String descricao,

        @NotBlank(message = "O responsável é obrigatório")
        String responsavel,

        StatusTarefa status,

        @NotNull(message = "A prioridade é obrigatória")
        Prioridade prioridade
) {
}
