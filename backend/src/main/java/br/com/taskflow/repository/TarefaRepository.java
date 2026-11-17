package br.com.taskflow.repository;

import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    List<Tarefa> findByStatus(StatusTarefa status);
}
