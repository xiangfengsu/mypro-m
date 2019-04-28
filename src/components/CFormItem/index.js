import React, { Component } from 'react';
import { List } from 'antd-mobile';
import RForm from '@/components/RForm';
import ItemMap from '@/components/CFormItem/map';
import { formatterSelectValue } from '@/utils/utils';

const FormItem = RForm.Item;

class WrapFormItem extends Component {
  static defaultProps = {};

  componentDidMount() {}

  getFormItemOptions = ({ onChange, initialValue, rules, fieldDecoratorOptions = {}, form }) => {
    const options = {
      rules: rules || [],
      ...fieldDecoratorOptions,
    };
    options.initialValue = initialValue;

    if (onChange) {
      options.onChange = value => {
        onChange(value, form);
      };
    }

    return options;
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const {
      name,
      type,
      component,
      onChange,
      customprops,
      formitemprops,
      initialValue,
      rules,
      fieldDecoratorOptions,
      ...restProps
    } = this.props;

    // get getFieldDecorator props
    const options = this.getFormItemOptions(this.props);

    const WrappedComponent = component;

    const otherProps = restProps || {};

    const { label } = formitemprops;

    if (type === 'CSelect') {
      const { selectOptions = [] } = otherProps;
      const data = formatterSelectValue(selectOptions);
      return (
        <FormItem>
          {getFieldDecorator(name, options)(
            <WrappedComponent {...customprops} {...otherProps} data={data}>
              <List.Item arrow="horizontal" {...formitemprops}>
                {label}
              </List.Item>
            </WrappedComponent>,
          )}
        </FormItem>
      );
    }

    if (type === 'CDatePicker') {
      return (
        <FormItem>
          {getFieldDecorator(name, options)(
            <WrappedComponent {...customprops} {...otherProps}>
              <List.Item arrow="horizontal" {...formitemprops}>
                {label}
              </List.Item>
            </WrappedComponent>,
          )}
        </FormItem>
      );
    }

    if (type === 'CInput') {
      return (
        <FormItem {...formitemprops}>
          {getFieldDecorator(name, options)(
            <WrappedComponent {...customprops} {...otherProps}>
              {label}
            </WrappedComponent>,
          )}
        </FormItem>
      );
    }

    return (
      <FormItem >
        {getFieldDecorator(name, options)(<WrappedComponent formitemprops={formitemprops}  {...customprops} {...otherProps} />)}
      </FormItem>
    );
  }
}

const CFormItem = {};
Object.keys(ItemMap).forEach(key => {
  const item = ItemMap[key];
  CFormItem[key] = props => (
    <WrapFormItem
      type={key}
      formitemprops={item.formitemprops || {}}
      customprops={item.props || {}}
      component={item.component}
      rules={item.rules || []}
      {...props}
    />
  );
});

export default CFormItem;
