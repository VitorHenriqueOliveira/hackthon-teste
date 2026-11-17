package br.com.taskflow.config;

import br.com.taskflow.entity.Prioridade;
import br.com.taskflow.entity.StatusTarefa;
import br.com.taskflow.entity.Tarefa;
import br.com.taskflow.repository.TarefaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Cadastra algumas tarefas ao iniciar, para a listagem não começar vazia.
 */
@Configuration
public class DadosIniciais {

    @Bean
    CommandLineRunner carregarTarefas(TarefaRepository repository) {
        return args -> {
            if (repository.count() > 0) return;
            repository.save(nova("Configurar repositório", "Criar repo, branches e board", "Pedro", StatusTarefa.CONCLUIDA, Prioridade.ALTA));
            repository.save(nova("Criar API de tarefas", "CRUD com Spring Boot e H2", "Vitor", StatusTarefa.EM_ANDAMENTO, Prioridade.ALTA));
            repository.save(nova("Tela de listagem Angular", "Listar e filtrar por status", "Emerson", StatusTarefa.PENDENTE, Prioridade.MEDIA));
            repository.save(nova("Tela de detalhes Expo", "Detalhes e troca de status", "Carlos", StatusTarefa.PENDENTE, Prioridade.BAIXA));
        };
    }

    private Tarefa nova(String titulo, String descricao, String responsavel, StatusTarefa status, Prioridade prioridade) {
        Tarefa t = new Tarefa();
        t.setTitulo(titulo);
        t.setDescricao(descricao);
        t.setResponsavel(responsavel);
        t.setStatus(status);
        t.setPrioridade(prioridade);
        return t;
    }
}
