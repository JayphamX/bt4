import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from '../components/Avatar';
import { t } from '../i18n';

// TRANG 2: thông tin chi tiết (hộp thoại)
export default function StudentDetailDialog({ student, onClose, onEdit, onDelete }) {
  if (!student) return null;
  return (
    <Modal transparent animationType="fade" visible onRequestClose={onClose}>
      <View style={s.overlay}>
        <View style={s.box}>
          <Text style={s.title}>{t('detailTitle')}</Text>
          <View style={s.center}>
            <Avatar uri={student.avatar} name={student.name} size={96} />
          </View>
          <Text style={s.label}>{t('name')}</Text>
          <Text style={s.value}>{student.name}</Text>
          <Text style={s.label}>{t('studentId')}</Text>
          <Text style={s.value}>{student.studentId}</Text>
          <Text style={s.label}>{t('email')}</Text>
          <Text style={s.value}>{student.email}</Text>
          <View style={s.row}>
            <TouchableOpacity style={[s.btn, s.grey]} onPress={onClose}>
              <Text style={s.greyText}>{t('close')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.blue]} onPress={() => onEdit(student)}>
              <Text style={s.whiteText}>{t('edit')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.red]} onPress={() => onDelete(student)}>
              <Text style={s.whiteText}>{t('delete')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%', maxWidth: 400 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  center: { alignItems: 'center', marginBottom: 12 },
  label: { color: '#777', marginTop: 8, fontSize: 13 },
  value: { fontSize: 16, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
  btn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8, marginLeft: 8 },
  grey: { backgroundColor: '#eceff1' },
  blue: { backgroundColor: '#1976d2' },
  red: { backgroundColor: '#d32f2f' },
  greyText: { color: '#333', fontWeight: '600' },
  whiteText: { color: '#fff', fontWeight: '600' },
});
