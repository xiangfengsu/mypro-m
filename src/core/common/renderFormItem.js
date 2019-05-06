import React from 'react';
import CFormItem from '@/components/CFormItem';

const { CSelect, CInput, CDatePicker, CSelectDynamic, CUpload, CTextArea } = CFormItem;

export default (item, form) => {
  const {
    formType,
    key,
    initialValue,
    label,
    isRequired,
    props = {},
    formitemprops = {},
    rules = [],
    fieldDecoratorOptions = {},
  } = item;

  let InputType = null;
  const defaultProps = {
    form,
    name: key,
    initialValue,
    isRequired,
    formitemprops: {
      label,
      ...formitemprops,
    },
    fieldDecoratorOptions,
    ...props,
  };
  const defaultRule = [
    {
      required: isRequired,
      message: `请输入${label}`,
    },
  ];
  const defaultSelectRule = [
    {
      required: isRequired,
      message: `请选择${label}`,
    },
  ];
  switch (formType) {
    // case 'CInputNumber':
    //   InputType = (
    //     <CInputNumber
    //       placeholder={`请输入${label}`}
    //       {...defaultProps}
    //       rules={[
    //         ...defaultRule,
    //         {
    //           pattern: /^[0-9]\d*$/,
    //           message: ' 请输入正整数!',
    //         },
    //         ...rules,
    //       ]}
    //     />
    //   );
    //   break;
    // case 'CInputMoney':
    //   InputType = (
    //     <CInputMoney
    //       placeholder={`请输入${label}`}
    //       {...defaultProps}
    //       rules={[
    //         ...defaultRule,
    //         {
    //           pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/,
    //           message: ' 格式不正确(精确到小数点后2位)',
    //         },
    //         ...rules,
    //       ]}
    //     />
    //   );
    //   break;
    case 'CInputPhone':
      InputType = (
        <CInput
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[
            ...defaultRule,
            {
              pattern: /^1[345678]\d{9}$/,
              message: ' 格式不正确',
            },
            ...rules,
          ]}
        />
      );
      break;
    case 'CSelect':
      InputType = (
        <CSelect
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultSelectRule, ...rules]}
          selectOptions={item.selectOptions || []}
        />
      );
      break;
    case 'CDatePicker':
      InputType = (
        <CDatePicker
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultSelectRule, ...rules]}
        />
      );
      break;
    case 'CSelectDynamic':
      InputType = (
        <CSelectDynamic
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultSelectRule, ...rules]}
          dictionaryKey={item.dictionaryKey}
          fetchUrl={item.fetchUrl}
        />
      );
      break;
    case 'CUpload':
      InputType = (
        <CUpload
          placeholder={`请选择${label}`}
          {...defaultProps}
          rules={[...defaultSelectRule, ...rules]}
          action={item.action}
          maxFileCounts={item.maxFileCounts || 10}
          maxFileSize={item.maxFileSize || 5}
        />
      );
      break;
    case 'CTextArea':
      InputType = (
        <CTextArea
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;

    case 'CInput':
    default:
      InputType = (
        <CInput
          placeholder={`请输入${label}`}
          {...defaultProps}
          rules={[...defaultRule, ...rules]}
        />
      );
      break;
  }
  return InputType;
};
