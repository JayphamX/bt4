import { getLocales } from 'expo-localization';

const dict = {
  en: {
    appName: 'Student Manager',
    listTitle: 'Students',
    empty: 'No students yet',
    detailTitle: 'Student details',
    addTitle: 'Add student',
    editTitle: 'Edit student',
    name: 'Full name',
    studentId: 'Student ID',
    email: 'Email',
    avatarUrl: 'Avatar image link',
    pickImage: 'Upload from device',
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    confirmEdit: 'Do you want to edit this student\'s information?',
    confirmDelete: 'Do you want to delete this student\'s information?',
  },
  vi: {
    appName: 'Quản Lý Sinh Viên',
    listTitle: 'Danh sách sinh viên',
    empty: 'Chưa có sinh viên nào',
    detailTitle: 'Thông tin sinh viên',
    addTitle: 'Thêm sinh viên',
    editTitle: 'Sửa sinh viên',
    name: 'Họ tên',
    studentId: 'Mã số SV',
    email: 'Email',
    avatarUrl: 'Link ảnh avatar',
    pickImage: 'Tải ảnh từ thiết bị',
    add: 'Thêm',
    edit: 'Sửa',
    delete: 'Xóa',
    save: 'Lưu',
    cancel: 'Hủy',
    close: 'Đóng',
    confirm: 'Xác nhận',
    yes: 'Có',
    no: 'Không',
    confirmEdit: 'Bạn có muốn sửa thông tin SV không?',
    confirmDelete: 'Bạn có muốn xóa thông tin SV không?',
  },
};

// Tự động theo ngôn ngữ thiết bị / trình duyệt: "vi" -> tiếng Việt, còn lại -> tiếng Anh
const code = getLocales()[0]?.languageCode || 'en';
const lang = code === 'vi' ? 'vi' : 'en';

export const t = (key) => dict[lang][key];
