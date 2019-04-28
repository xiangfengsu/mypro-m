import { InputItem, Picker, DatePicker } from 'antd-mobile';
import DynamicSelect from './DynamicSelect';

export default {
  CInput: {
    component: InputItem,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
  },
  CSelect: {
    component: Picker,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    selectOptions: [
      {
        key: 'select1',
        value: 'select1',
      },
      {
        key: 'select2',
        value: 'select2',
      },
    ],
  },
  CDatePicker: {
    component: DatePicker,
    formitemprops: {},
    props: {
      style: { width: '100%' },
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
  CSelectDynamic: {
    component: DynamicSelect,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/sys/selectLists2',
    cache: false,
  },
};
