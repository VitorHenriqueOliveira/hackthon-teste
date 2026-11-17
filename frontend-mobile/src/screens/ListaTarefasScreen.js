import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import StatusBadge from '../components/StatusBadge';
import { listarTarefas } from '../services/tarefaService';

export default function ListaTarefasScreen({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      setErro('');
      const dados = await listarTarefas();
      setTarefas(dados);
    } catch (e) {
      setErro('Não foi possível conectar à API. Confira o IP em src/config/api.js.');
    } finally {
      setCarregando(false);
    }
  }

  // Recarrega a lista sempre que a tela volta a aparecer (ex.: depois de mudar o status)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  if (carregando) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#4f46e5" />;
  }

  return (
    <View style={styles.container}>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <FlatList
        data={tarefas}
        keyExtractor={(item) => String(item.id)}
        refreshing={carregando}
        onRefresh={carregar}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma tarefa cadastrada.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { id: item.id })}
          >
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.responsavel}>Responsável: {item.responsavel}</Text>
            <StatusBadge status={item.status} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6fa', padding: 12 },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    gap: 6,
    elevation: 1,
  },
  titulo: { fontSize: 16, fontWeight: 'bold' },
  responsavel: { color: '#555' },
  erro: { backgroundColor: '#fee2e2', color: '#991b1b', padding: 10, borderRadius: 6, marginBottom: 10 },
  vazio: { textAlign: 'center', color: '#666', marginTop: 40 },
});
