package br.com.taskflow.service;

import br.com.taskflow.dto.TarefaRequestDTO;
import br.com.taskflow.dto.TarefaResponseDTO;
import br.com.taskflow.entity.Prioridade;
import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.exception.TarefaNaoEncontradaException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class TarefaServiceTest {

    @Autowired
    private TarefaService service;

    @Test
    void deveCadastrarTarefaComStatusPendentePorPadrao() {
        TarefaRequestDTO dto = new TarefaRequestDTO("Estudar", "Revisar Spring", "Vitor", null, Prioridade.ALTA);

        TarefaResponseDTO criada = service.cadastrar(dto);

        assertNotNull(criada.id());
        assertEquals(StatusTarefa.PENDENTE, criada.status());
    }

    @Test
    void deveAlterarStatus() {
        TarefaResponseDTO criada = service.cadastrar(
                new TarefaRequestDTO("Teste", null, "Carlos", null, Prioridade.BAIXA));

        TarefaResponseDTO alterada = service.alterarStatus(criada.id(), StatusTarefa.CONCLUIDA);

        assertEquals(StatusTarefa.CONCLUIDA, alterada.status());
    }

    @Test
    void deveLancarErroQuandoTarefaNaoExiste() {
        assertThrows(TarefaNaoEncontradaException.class, () -> service.buscarPorId(9999L));
    }
}
