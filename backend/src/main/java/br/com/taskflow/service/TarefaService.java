package br.com.taskflow.service;

import br.com.taskflow.dto.TarefaRequestDTO;
import br.com.taskflow.dto.TarefaResponseDTO;
import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.entity.Tarefa;
import br.com.taskflow.exception.TarefaNaoEncontradaException;
import br.com.taskflow.repository.TarefaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TarefaService {

    private final TarefaRepository repository;

    public TarefaService(TarefaRepository repository) {
        this.repository = repository;
    }

    public List<TarefaResponseDTO> listar(StatusTarefa status) {
        List<Tarefa> tarefas = (status == null)
                ? repository.findAll()
                : repository.findByStatus(status);
        return tarefas.stream().map(TarefaResponseDTO::fromEntity).toList();
    }

    public TarefaResponseDTO buscarPorId(Long id) {
        return TarefaResponseDTO.fromEntity(buscarEntidade(id));
    }

    public TarefaResponseDTO cadastrar(TarefaRequestDTO dto) {
        Tarefa tarefa = new Tarefa();
        copiarDados(dto, tarefa);
        return TarefaResponseDTO.fromEntity(repository.save(tarefa));
    }

    public TarefaResponseDTO editar(Long id, TarefaRequestDTO dto) {
        Tarefa tarefa = buscarEntidade(id);
        copiarDados(dto, tarefa);
        return TarefaResponseDTO.fromEntity(repository.save(tarefa));
    }

    public TarefaResponseDTO alterarStatus(Long id, StatusTarefa status) {
        Tarefa tarefa = buscarEntidade(id);
        tarefa.setStatus(status);
        return TarefaResponseDTO.fromEntity(repository.save(tarefa));
    }

    public void excluir(Long id) {
        Tarefa tarefa = buscarEntidade(id);
        repository.delete(tarefa);
    }

    private Tarefa buscarEntidade(Long id) {
        return repository.findById(id).orElseThrow(() -> new TarefaNaoEncontradaException(id));
    }

    private void copiarDados(TarefaRequestDTO dto, Tarefa tarefa) {
        tarefa.setTitulo(dto.titulo());
        tarefa.setDescricao(dto.descricao());
        tarefa.setResponsavel(dto.responsavel());
        tarefa.setPrioridade(dto.prioridade());
        // Se o status não vier no corpo, a tarefa fica PENDENTE (ou mantém o atual na edição)
        if (dto.status() != null) {
            tarefa.setStatus(dto.status());
        }
    }
}
