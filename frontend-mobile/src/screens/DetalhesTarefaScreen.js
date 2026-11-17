import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatusBadge, { STATUS } from '../components/StatusBadge';
import { alterarStatus, buscarTarefa } from '../services/tarefaService';

const PRIORIDADE = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' };

export default function DetalhesTarefaScreen({ route }) {
  const { id } = route.params;
  const [tarefa, setTarefa] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    buscarTarefa(id)
      .then(setTarefa)
      .catch(() => Alert.alert('Erro', 'Não foi possível carregar a tarefa.'));
  }, [id]);

  async function mudarStatus(novoStatus) {
    try {
      setSalvando(true);
      const atualizada = await alterarStatus(id, novoStatus);
      setTarefa(atualizada);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível alterar o status.');
    } finally {
      setSalvando(false);
    }
  }

  if (!tarefa) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#4f46e5" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>{tarefa.titulo}</Text>
      <StatusBadge status={tarefa.status} />

      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Descrição</Text>
        <Text>{tarefa.descricao || 'Sem descrição'}</Text>
      </View>
      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Responsável</Text>
        <Text>{tarefa.responsavel}</Text>
      </View>
      <View style={styles.bloco}>
        <Text style={styles.rotulo}>Prioridade</Text>
        <Text>{PRIORIDADE[tarefa.prioridade]}</Text>
      </View>

      <Text style={[styles.rotulo, { marginTop: 20 }]}>Alterar status</Text>
      {Object.entries(STATUS).map(([valor, info]) => {
        const atual = tarefa.status === valor;
        return (
          <Pressable
            key={valor}
            disabled={atual || salvando}
            onPress={() => mudarStatus(valor)}
            style={[styles.botao, atual && styles.botaoAtual]}
          >
            <Text style={[styles.textoBotao, atual && { color: '#fff' }]}>
              {info.label}{atual ? ' (atual)' : ''}
            </Text>
          </Pressable>
        );
      })}
      {salvando ? <ActivityIndicator style={{ marginTop: 10 }} color="#4f46e5" /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 8, backgroundColor: '#f5f6fa', flexGrow: 1 },
  titulo: { fontSize: 22, fontWeight: 'bold' },
  bloco: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 8 },
  rotulo: { fontWeight: 'bold', color: '#4f46e5', marginBottom: 4 },
  botao: { borderWidth: 1, borderColor: '#4f46e5', borderRadius: 8, padding: 12, alignItems: 'center' },
  botaoAtual: { backgroundColor: '#4f46e5' },
  textoBotao: { color: '#4f46e5', fontWeight: 'bold' },
});
