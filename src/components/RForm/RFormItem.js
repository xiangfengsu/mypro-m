import React from 'react';
import classNames from 'classnames';
import './index.less';

function intersperseSpace(list=[]){
  return list.reduce((current, item) => [...current, ' ', item], []).slice(1);
}

export default class RFormItem extends React.Component {
  getControls(children, recursively) {
    let controls = [];
    const childrenArray = React.Children.toArray(children);
    for (let i = 0; i < childrenArray.length; i++) {
      if (!recursively && controls.length > 0) {
        break;
      }

      const child = childrenArray[i];
      if (!child.props) {
        continue;
      }
      if ('data-__meta' in child.props) {
        // And means FIELD_DATA_PROP in child.props, too.
        controls.push(child);
      } else if (child.props.children) {
        controls = controls.concat(this.getControls(child.props.children, recursively));
      }
    }
    return controls;
  }
  getOnlyControl() {
    const child = this.getControls(this.props.children, false)[0];
    return child !== undefined ? child : null;
  }

  getChildProp(prop) {
    const child = this.getOnlyControl();
    return child && child.props && child.props[prop];
  }
  getMeta() {
    return this.getChildProp('data-__meta');
  }

  getField() {
    return this.getChildProp('data-__field');
  }
  getHelpMessage() {
    const { help } = this.props;
    if (help === undefined && this.getOnlyControl()) {
      const { errors } = this.getField();
      if (errors) {
        return intersperseSpace(
          errors.map((e, index) => {
            let node= null;

            if (React.isValidElement(e)) {
              node = e;
            } else if (React.isValidElement(e.message)) {
              node = e.message;
            }

            return node ? React.cloneElement(node, { key: index }) : e.message;
          }),
        );
      }
      return '';
    }
    return help;
  }
  getValidateStatus() {
    const onlyControl = this.getOnlyControl();
    if (!onlyControl) {
      return '';
    }
    const field = this.getField();
    if (field.validating) {
      return 'validating';
    }
    if (field.errors) {
      return 'error';
    }
    const fieldValue = 'value' in field ? field.value : this.getMeta().initialValue;
    if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
      return 'success';
    }
    return '';
  }
  renderValidateWrapper() {
    const validateStatus = this.getValidateStatus();
    if (validateStatus !== 'error') return null;
    const errCls = classNames({
      'r-field--error': validateStatus === 'error',
    });
    const help = this.getHelpMessage();
    return <div className={errCls}>{help}</div>;
  }

  renderWrapper() {
    return this.props.children;
  }

  renderFormItem() {
    // const validateStatus = this.getValidateStatus();
    const rootCls = classNames('r-field');
    const containerCls = classNames('r-field__container', {
    });
    return (
      <div className={rootCls}>
        <div className={containerCls}>
          {this.renderWrapper()}
          {this.renderValidateWrapper()}
        </div>
      </div>
    );
  }
  render() {
    return this.renderFormItem();
  }
}
