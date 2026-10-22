import React, { useEffect, useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { loadStudents, saveStudents } from './src/storage';
import { t } from './src/i18n';
import StudentListScreen from './src/screens/StudentListScreen';
import StudentDetailDialog from './src/screens/StudentDetailDialog';
import StudentFormScreen from './src/screens/StudentFormScreen';
import ConfirmDialog from './src/components/ConfirmDialog';

export default function App() {
  const [students, setStudents] = useState([]);
  const [screen, setScreen] = useState('list'); // 'list' | 'form'
  const [selected, setSelected] = useState(null); // SV đang xem ở hộp thoại chi tiết
  const [editing, setEditing] = useState(null); // SV đang sửa (null = thêm mới)
  const [confirm, setConfirm] = useState(null); // { message, onYes }

  useEffect(() => {
    loadStudents().then(setStudents);
  }, []);

  // Tên app theo ngôn ngữ (tab trình duyệt)
  useEffect(() => {
    if (Platform.OS === 'web') document.title = t('appName');
  }, []);

  const persist = (next) => {
    setStudents(next);
    saveStudents(next);
  };

  const doSave = (data) => {
    if (editing) {
      persist(students.map((s) => (s.id === editing.id ? { ...s, ...data } : s)));
    } else {
      persist([...students, { id: Date.now().toString(), ...data }]);
    }
    setScreen('list');
    setEditing(null);
  };

  const handleSubmit = (data) => {
    if (editing) {
      setConfirm({ message: t('confirmEdit'), onYes: () => doSave(data) });
    } else {
      doSave(data);
    }
  };

  const handleDelete = (student) => {
    setConfirm({
      message: t('confirmDelete'),
      onYes: () => {
        persist(students.filter((s) => s.id !== student.id));
        setSelected(null);
      },
    });
  };

  return (
    <View style={styles.root}>
      {screen === 'list' ? (
        <StudentListScreen
          students={students}
          onSelect={setSelected}
          onAdd={() => {
            setEditing(null);
            setScreen('form');
          }}
        />
      ) : (
        <StudentFormScreen
          key={editing ? editing.id : 'new'}
          student={editing}
          onSubmit={handleSubmit}
          onCancel={() => {
            setScreen('list');
            setEditing(null);
          }}
        />
      )}

      <StudentDetailDialog
        student={selected}
        onClose={() => setSelected(null)}
        onEdit={(s) => {
          setSelected(null);
          setEditing(s);
          setScreen('form');
        }}
        onDelete={handleDelete}
      />

      <ConfirmDialog
        visible={!!confirm}
        message={confirm?.message}
        onNo={() => setConfirm(null)}
        onYes={() => {
          confirm.onYes();
          setConfirm(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
