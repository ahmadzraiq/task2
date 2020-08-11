import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
const resources = {
  en: {
    translation: {
      projects: 'Projects',
      add: 'ADD',
      edit: 'Edit',
      delete: 'Delete',
      close: 'Close',
      projectTasks: 'Project Tasks',
      detailsTask: 'Details Task',
      tasks: 'Tasks',
      others: 'Others',
      language: 'Language',
      about: 'About',
      text: `A language is a structured system of communication. Language, in a
      broader sense, is the method of communication that involves the use of –
      particularly human – languages. The scientific study of language is
      called linguistics`,
    },
  },
  ar: {
    translation: {
      projects: 'المشاريع',
      add: 'اضافة',
      edit: 'تعديل',
      delete: 'حذف',
      close: 'إغلاق',
      projectTasks: 'مهام المشروع',
      detailsTask: 'تفاصيل المهمة',
      tasks: 'المهام',
      others: 'الاخرين',
      language: 'اللغات',
      about: 'حول',
      text: `اللغة هي نظام اتصال منظم. اللغة ، في بمعنى أوسع ، هو طريقة الاتصال التي تنطوي على استخدام - خاصة البشرية - اللغات. الدراسة العلمية للغة تسمى اللغويات`,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: I18nManager.isRTL ? 'ar' : 'en',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
