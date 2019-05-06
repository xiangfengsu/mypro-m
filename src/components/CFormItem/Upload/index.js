import React from 'react';
import RcUpload from 'rc-upload';
import { Modal, Toast, List } from 'antd-mobile';
import findIndex from 'lodash/findIndex';
import { noop, fileToObject, getFileItem, removeFileItem } from './utils';
import UploadList from './UploadList';
import './index.less';

class Upload extends React.Component {
  static defaultProps = {
    type: 'select',
    multiple: false,
    maxFileSize: null,
    maxFileCounts: 1,
    action: '',
    data: {},
    accept: '',
    beforeUpload: noop,
    showUploadList: true,
    listType: 'picture',
    className: '',
    disabled: false,
  };

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        fileList: nextProps.value || [],
      };
    }
    return null;
  }

  recentUploadStatus = false;

  progressTimer = -1;

  upload = null;

  constructor(props) {
    super(props);

    this.state = {
      fileList: props.fileList || props.defaultFileList || [],
    };
  }

  //  是否超出文件大小
  isMatchSize = (file = {}) => {
    const { maxFileSize = null } = this.props;
    const maxSize = maxFileSize * 1024 * 1024;
    if (maxSize && file.size > maxSize) {
      console.error('超出上传文件大小！');
    }
  };

  onStart = file => {
    const targetItem = fileToObject(file);
    targetItem.status = 'uploading';

    const nextFileList = this.state.fileList.concat();

    const fileIndex = findIndex(nextFileList, ({ uid }) => uid === targetItem.uid);
    if (fileIndex === -1) {
      nextFileList.push(targetItem);
    } else {
      nextFileList[fileIndex] = targetItem;
    }

    this.onChange({
      file: targetItem,
      fileList: nextFileList,
    });
    // fix ie progress
  };

  onSuccess = (response, file) => {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response);
      }
    } catch (e) {
      /* do nothing */
    }
    const fileList = this.state.fileList;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.status = 'done';
    targetItem.response = response;
    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  onProgress = (e, file) => {
    const fileList = this.state.fileList;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.percent = e.percent;
    this.onChange({
      event: e,
      file: { ...targetItem },
      fileList: this.state.fileList,
    });
  };

  onError = (error, response, file) => {
    const fileList = this.state.fileList;
    const targetItem = getFileItem(file, fileList);
    // removed
    if (!targetItem) {
      return;
    }
    targetItem.error = error;
    targetItem.response = response;
    targetItem.status = 'error';
    Toast.fail('图片上传失败', 2);

    this.onChange({
      file: { ...targetItem },
      fileList,
    });
  };

  handleRemove(file) {
    Modal.alert(null, '确认删除?', [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {
          file.status = 'removed'; // eslint-disable-line

          const removedFileList = removeFileItem(file, this.state.fileList);
          if (removedFileList) {
            this.onChange({
              file,
              fileList: removedFileList,
            });
          }
        },
      },
    ]);
  }

  handleManualRemove = file => {
    if (this.upload) {
      this.upload.abort(file);
    }
    this.handleRemove(file);
  };

  onChange = info => {

    const { onChange } = this.props;
    if (onChange) {
      const { maxFileCounts } = this.props;
      const newFileList = info.fileList.filter(file => file.status !== 'error');
      const len = newFileList.length;

      console.log('newFileList', newFileList);

      if (len > maxFileCounts) {
         onChange(newFileList.slice(0, maxFileCounts))
      } else {
        onChange(newFileList);
      }

    }
  };

  beforeUpload = (file, fileList) => {

    return true;
  };

  saveUpload = node => {
    this.upload = node;
  };

  renderUpload = () => {
    const { maxFileCounts } = this.props;

    const prefixCls = 'upload';

    const rcUploadProps = {
      onStart: this.onStart,
      onError: this.onError,
      onProgress: this.onProgress,
      onSuccess: this.onSuccess,
      ...this.props,
      prefixCls,
      className: 'r-image-picker-upload-btn',
      beforeUpload: this.beforeUpload,
    };

    return (
      <UploadList
        items={this.state.fileList}
        onRemove={this.handleManualRemove}
        maxFileCounts={maxFileCounts}
      >
        <RcUpload {...rcUploadProps} ref={this.saveUpload} />
      </UploadList>
    );
  };

  render() {
    const { fileList } = this.state;
    const { formitemprops = {}, maxFileCounts } = this.props;
    const { label } = formitemprops;
    const len = fileList.length;

    return (
      <div style={{ paddingBottom: '2px' }}>
        <List.Item extra={`${len}/${maxFileCounts}`}>{label}</List.Item>
        {this.renderUpload()}
      </div>
    );
  }
}

export default Upload;
