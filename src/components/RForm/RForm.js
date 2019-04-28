import React from 'react';
import createDOMForm from 'rc-form/lib/createDOMForm';
import createFormField from 'rc-form/lib/createFormField';
import RFormItem from './RFormItem';

export default class RForm extends React.Component {
  static Item = RFormItem;
  static createFormField = createFormField;

  static create = function(options) {
    return createDOMForm({
      fieldNameProp: 'id',
      ...options,
      fieldMetaProp: 'data-__meta',
      fieldDataProp: 'data-__field',
    });
  };

  render() {
    return <form {...this.props} />;
  }
}
