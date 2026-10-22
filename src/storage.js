import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'students';

export async function loadStudents() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export async function saveStudents(list) {
  await AsyncStorage.setItem(KEY, JSON.stringify(list));
}
