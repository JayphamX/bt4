import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from '../components/Avatar';
import { t } from '../i18n';

// TRANG 1: danh sách sinh viên
export default function StudentListScreen({ students, onSelect, onAdd }) {
  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>{t('listTitle')}</Text>
        <TouchableOpacity style={s.addBtn} onPress={onAdd}>
          <Text style={s.addText}>+ {t('add')}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={s.empty}>{t('empty')}</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.item} onPress={() => onSelect(item)}>
            <Avatar uri={item.avatar} name={item.name} size={52} />
            <View style={s.info}>
              <Text style={s.name}>{item.name}</Text>
              <Text style={s.sub}>{item.studentId}</Text>
              <Text style={s.sub}>{item.email}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#1976d2' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  addBtn: { backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  addText: { color: '#1976d2', fontWeight: '700' },
  empty: { textAlign: 'center', marginTop: 40, color: '#777' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginHorizontal: 12, marginTop: 10, borderRadius: 10 },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 16, fontWeight: '700' },
  sub: { color: '#555', marginTop: 2 },
});
