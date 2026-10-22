import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Avatar from '../components/Avatar';
import { t } from '../i18n';

// TRANG 3: thêm mới / sửa thông tin sinh viên
export default function StudentFormScreen({ student, onSubmit, onCancel }) {
  const [name, setName] = useState(student?.name || '');
  const [studentId, setStudentId] = useState(student?.studentId || '');
  const [email, setEmail] = useState(student?.email || '');
  const [avatar, setAvatar] = useState(student?.avatar || '');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.5,
      base64: true,
    });
    if (!result.canceled && result.assets?.length) {
      const a = result.assets[0];
      setAvatar(`data:${a.mimeType || 'image/jpeg'};base64,${a.base64}`);
    }
  };

  return (
    <View style={s.container}>
      <View style={s.header}>
        <Text style={s.title}>{student ? t('editTitle') : t('addTitle')}</Text>
      </View>
      <ScrollView contentContainerStyle={s.body}>
        <View style={s.center}>
          <Avatar uri={avatar} name={name} size={96} />
        </View>

        <Text style={s.label}>{t('name')}</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} />

        <Text style={s.label}>{t('studentId')}</Text>
        <TextInput style={s.input} value={studentId} onChangeText={setStudentId} />

        <Text style={s.label}>{t('email')}</Text>
        <TextInput style={s.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <Text style={s.label}>{t('avatarUrl')}</Text>
        <TextInput
          style={s.input}
          value={avatar.startsWith('data:') ? '' : avatar}
          onChangeText={setAvatar}
          autoCapitalize="none"
          placeholder="https://..."
        />
        <TouchableOpacity style={s.pick} onPress={pickImage}>
          <Text style={s.pickText}>{t('pickImage')}</Text>
        </TouchableOpacity>

        <View style={s.row}>
          <TouchableOpacity style={[s.btn, s.grey]} onPress={onCancel}>
            <Text style={s.greyText}>{t('cancel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.btn, s.blue]}
            onPress={() => onSubmit({ name: name.trim(), studentId: studentId.trim(), email: email.trim(), avatar })}
          >
            <Text style={s.whiteText}>{t('save')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: '#1976d2' },
  title: { color: '#fff', fontSize: 20, fontWeight: '700' },
  body: { padding: 16, width: '100%', maxWidth: 500, alignSelf: 'center' },
  center: { alignItems: 'center', marginBottom: 12 },
  label: { color: '#555', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16 },
  pick: { marginTop: 10, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#1976d2', alignItems: 'center' },
  pickText: { color: '#1976d2', fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 24 },
  btn: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  grey: { backgroundColor: '#eceff1' },
  blue: { backgroundColor: '#1976d2' },
  greyText: { color: '#333', fontWeight: '600' },
  whiteText: { color: '#fff', fontWeight: '600' },
});
