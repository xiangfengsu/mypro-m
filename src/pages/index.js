import React from 'react';
import { List, InputItem, Picker, Button } from 'antd-mobile';

import RForm from '@/components/RForm';
import renderFormItem from '@/core/common/renderFormItem';

const detailFormItems = [
  {
    formType: 'CInput',
    isRequired: true,
    key: 'id',
    label: 'id',
    colSpan: 0,
    props: {
      disabled: false,

      // labelNumber:2
    },
  },
  {
    formType: 'CInputPhone',
    isRequired: true,
    key: 'CInputPhone',
    label: 'Phone',
    colSpan: 0,
    props: {
      disabled: false,
      maxLength: 11,
      // labelNumber:2
    },
  },
  {
    formType: 'CSelect',
    isRequired: true,
    key: 'select1',
    label: 'CSelect',
    props: {
      disabled: false,
      cols: 2,
    },
    formitemprops: {},
    selectOptions: [
      {
        key: 'select1',
        value: 'select1',
        children: [
          {
            key: 'select1_1',
            value: 'select1_1',
          },
        ],
      },
      {
        key: 'select2',
        value: 'select2',
        children: [
          {
            key: 'select2_1',
            value: 'select2_1',
          },
        ],
      },
    ],
  },
  {
    formType: 'CSelect',
    isRequired: true,
    key: 'select2',
    label: 'CSelect2',
    props: {
      disabled: false,
      cols: 2,
      cascade: false,
    },
    formitemprops: {},
    selectOptions: [
      [
        {
          key: '2013',
          value: '2013',
        },
      ],
      [
        {
          key: '春',
          value: '春',
        },
      ],
    ],
  },
  {
    formType: 'CSelect',
    isRequired: true,
    key: 'CSelectCascade',
    label: 'CSelectCascade',
    props: {
      disabled: false,
      cols: 1,
      // cascade:false
    },
    formitemprops: {},
    selectOptions: [
      {
        key: '2013',
        value: '2013',
      },
    ],
  },
  {
    formType: 'CSelectDynamic',
    isRequired: true,
    key: 'selectDynamic',
    label: 'CSelectDynamic',
    initialValue: [2],
    props: {
      disabled: false,
      cols: 1,
    },
    formitemprops: {},
    dictionaryKey: 'CSelectDynamicDic',
    fetchUrl: '/api/selectLists2',
  },
  {
    formType: 'CDatePicker',
    isRequired: true,
    key: 'datePicker',
    label: 'CDatePicker',
    props: {
      disabled: false,
      mode: 'date',
    },
    formitemprops: {},
  },
  {
    formType: 'CUpload',
    isRequired: true,
    key: 'upload1',
    label: '上传图片',
    colSpan: 24,
    initialValue: [
      {
        uid: -1,
        name: 'xxx.png',
        status: 'done', // 不能为空
        url: 'http://img.souche.com/files/default/21460c50f16c4d8f0d4bf91873b99d84.jpg',
        thumbUrl: 'http://img.souche.com/files/default/21460c50f16c4d8f0d4bf91873b99d84.jpg',
      },
    ],

    props: {
      disabled: false,
      placeholder: 'CUpload',
      multiple: true,
      accept: 'image/*',
    },
    formitemprops: {
      hasFeedback: false,
    },

    action: '/sys/file/upload_test',
    listType: 'picture-card',

    maxFileCounts: 3,
    maxFileSize: 1,
  },
  {
    formType: 'CTextArea',
    isRequired: true,
    key: 'CTextarea',
    label: 'CTextarea',
    colSpan: 0,
    props: {
      disabled: false,
      // labelNumber:2
    },
  },
];

const seasons = [
  {
    label: '2013',
    value: '2013',
  },
  {
    label: '2014',
    value: '2014',
  },
];

class BasicInputExample extends React.Component {
  componentDidMount() {}

  renderFormItem = () => {
    const { form } = this.props;
    const formItemList = detailFormItems.map(item => {
      const InputType = renderFormItem(item, form);
      return <div key={item.key}>{InputType}</div>;
    });
    return formItemList;
  };

  handleClick = () => {
    this.props.form.validateFields((error, value) => {
      if (error) return;
      console.log(error, value);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <RForm>
          {this.renderFormItem()}
          {/* <RForm.Item>
            {getFieldDecorator('district', { rules: [{ required: true, message: '请选择' }] })(
              <Picker extra="请选择" data={seasons} cols={1}>
                <List.Item arrow="horizontal">选择</List.Item>
              </Picker>,
            )}
          </RForm.Item> */}
          {/* <RForm.Item>
            {getFieldDecorator('name', { rules: [{ required: true, message: '请输入姓名' }] })(
              <InputItem clear>姓名</InputItem>,
            )}
          </RForm.Item>
          <RForm.Item>
            {getFieldDecorator('age', { rules: [{ required: true, message: '请输入年龄' }] })(
              <InputItem clear>年龄</InputItem>,
            )}
          </RForm.Item> */}

          <Button type="primary" onClick={this.handleClick}>
            提交
          </Button>
        </RForm>
      </div>
    );
  }
}

export default RForm.create()(BasicInputExample);
