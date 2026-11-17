import { StyleSheet, Text } from 'react-native';

export const STATUS = {
  PENDENTE: { label: 'Pendente', fundo: '#fff3cd', cor: '#8a6d00' },
  EM_ANDAMENTO: { label: 'Em andamento', fundo: '#dbeafe', cor: '#1e40af' },
  CONCLUIDA: { label: 'Concluída', fundo: '#dcfce7', cor: '#166534' },
};

export default function StatusBadge({ status }) {
  const info = STATUS[status] ?? STATUS.PENDENTE;
  return (
    <Text style={[styles.badge, { backgroundColor: info.fundo, color: info.cor }]}>
      {info.label}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    fontSize: 12,
    overflow: 'hidden',
  },
});
