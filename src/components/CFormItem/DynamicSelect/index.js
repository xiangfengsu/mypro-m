import React, { Component } from 'react';
import { connect } from 'dva';
import { List, Picker } from 'antd-mobile';

import { formatterSelectValue } from '@/utils/utils';

@connect(state => ({
  dictionary: state.dictionary,
}))
class DynamicSelect extends Component {
  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      const { value } = nextProps;
      return {
        selectValue: value,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      selectValue: value,
    };
  }

  componentDidMount() {
    const {
      dispatch = window.g_app._store.dispatch,
      fetchUrl,
      dictionaryKey,
      cache = false,
    } = this.props;
    if (fetchUrl !== undefined) {
      dispatch({
        type: 'dictionary/query',
        payload: {
          fetchUrl,
          dictionaryKey,
          cache,
        },
      });
    }
  }

  handleChange = selectValue => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    this.triggerChange(selectValue);
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {

    const { dictionary = {}, dictionaryKey, formitemprops={}, ...restProps } = this.props;
    const { label='' } = formitemprops;
    const dicList = dictionary[dictionaryKey] || [];
    return (
      <Picker data={formatterSelectValue(dicList)} onChange={this.handleChange} {...restProps}>
        <List.Item arrow="horizontal" {...formitemprops}>
          {label}
        </List.Item>
      </Picker>
    );
  }
}
export default DynamicSelect;
