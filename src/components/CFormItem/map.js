import { InputItem, Picker, DatePicker, TextareaItem } from 'antd-mobile';
import DynamicSelect from './DynamicSelect';
import Upload from './Upload';



export default {
  CInput: {
    component: InputItem,
    formitemprops: {
    },
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
  CUpload: {
    component: Upload,
    formitemprops: {},
    props: {},
    rules: [],
    fieldDecoratorOptions: {},
    action: '/sys/file/upload',
    multiple: true,
    accept: '*', // .jpg,.png,.pdf,.mp4,.gif,.word
    maxFileSize: 10, // 单位是M
    maxFileCounts: 5,
    initialValue: [
      {
        uid: -1, // 不能为空
        name: 'xxx.png',
        status: 'done', // 不能为空
        url: 'http://dummyimage.com/1000x1000/f2b079/FFF&text=@word.jpg', // 不能为空
        thumbUrl: 'http://dummyimage.com/1000x1000/f2b079/FFF&text=@word.jpg', // 不能为空  值同url
      },
      {
        uid: -2, // 不能为空
        name: 'xxx.png',
        status: 'done', // 不能为空
        url: 'http://dummyimage.com/1000x1000/8d79f2/FFF&text=@word.jpg', // 不能为空
        thumbUrl: 'http://dummyimage.com/1000x1000/8d79f2/FFF&text=@word.jpg', // 不能为空  值同url
      },
    ],
  },
  CTextArea: {
    component: TextareaItem,
    formitemprops: {},
    props: {
      rows:5
    },
    rules: [],
    fieldDecoratorOptions: {},
  },
};
