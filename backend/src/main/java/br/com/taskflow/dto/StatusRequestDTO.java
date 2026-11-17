package br.com.taskflow.dto;

import br.com.taskflow.entity.StatusTarefa;
import jakarta.validation.constraints.NotNull;

/**
 * Corpo do PATCH /api/tarefas/{id}/status. Ex.: { "status": "CONCLUIDA" }
 */
public record StatusRequestDTO(
        @NotNull(message = "O status é obrigatório")
        StatusTarefa status
) {
}
