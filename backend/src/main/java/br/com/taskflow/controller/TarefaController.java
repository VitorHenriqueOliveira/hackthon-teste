package br.com.taskflow.controller;

import br.com.taskflow.dto.StatusRequestDTO;
import br.com.taskflow.dto.TarefaRequestDTO;
import br.com.taskflow.dto.TarefaResponseDTO;
import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.service.TarefaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }

    // GET /api/tarefas  ou  GET /api/tarefas?status=PENDENTE
    @GetMapping
    public List<TarefaResponseDTO> listar(@RequestParam(required = false) StatusTarefa status) {
        return service.listar(status);
    }

    @GetMapping("/{id}")
    public TarefaResponseDTO buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<TarefaResponseDTO> cadastrar(@RequestBody @Valid TarefaRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.cadastrar(dto));
    }

    @PutMapping("/{id}")
    public TarefaResponseDTO editar(@PathVariable Long id, @RequestBody @Valid TarefaRequestDTO dto) {
        return service.editar(id, dto);
    }

    @PatchMapping("/{id}/status")
    public TarefaResponseDTO alterarStatus(@PathVariable Long id, @RequestBody @Valid StatusRequestDTO dto) {
        return service.alterarStatus(id, dto.status());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
