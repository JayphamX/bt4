import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { t } from '../i18n';

export default function ConfirmDialog({ visible, message, onYes, onNo }) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onNo}>
      <View style={s.overlay}>
        <View style={s.box}>
          <Text style={s.title}>{t('confirm')}</Text>
          <Text style={s.msg}>{message}</Text>
          <View style={s.row}>
            <TouchableOpacity style={[s.btn, s.no]} onPress={onNo}>
              <Text style={s.noText}>{t('no')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.yes]} onPress={onYes}>
              <Text style={s.yesText}>{t('yes')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', padding: 24 },
  box: { backgroundColor: '#fff', borderRadius: 12, padding: 20, width: '100%', maxWidth: 360 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  msg: { fontSize: 16, marginBottom: 20, color: '#333' },
  row: { flexDirection: 'row', justifyContent: 'flex-end' },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  no: { backgroundColor: '#eceff1' },
  yes: { backgroundColor: '#1976d2' },
  noText: { color: '#333', fontWeight: '600' },
  yesText: { color: '#fff', fontWeight: '600' },
});
