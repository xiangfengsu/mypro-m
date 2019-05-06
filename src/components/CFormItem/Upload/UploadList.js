import React from 'react';
import classNames from 'classnames';
import { Icon } from 'antd-mobile';
import { Circle } from 'rc-progress';
import './index.less';

const extname = url => {
  if (!url) {
    return '';
  }
  const temp = url.split('/');
  const filename = temp[temp.length - 1];
  const filenameWithoutSuffix = filename.split(/#|\?/)[0];
  return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
};
const isImageFileType = type => !!type && type.indexOf('image/') === 0;
const isImageUrl = file => {
  if (isImageFileType(file.type)) {
    return true;
  }
  const url = file.thumbUrl || file.url;
  const extension = extname(url);
  if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(extension)) {
    return true;
  } else if (/^data:/.test(url)) {
    // other file types of base64
    return false;
  } else if (extension) {
    // other file types which have extension
    return false;
  }
  return false;
};

class UploadList extends React.Component {
  previewFile = (file, callback) => {
    if (!isImageFileType(file.type)) {
      return callback('');
    }
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  componentDidUpdate() {
    (this.props.items || []).forEach(file => {
      if (
        typeof document === 'undefined' ||
        typeof window === 'undefined' ||
        !window.FileReader ||
        !window.File ||
        !(file.originFileObj instanceof File) ||
        file.thumbUrl !== undefined
      ) {
        return;
      }
      file.thumbUrl = '';
      this.previewFile(file.originFileObj, previewDataUrl => {
        file.thumbUrl = previewDataUrl;
        this.forceUpdate();
      });
    });
  }
  renderUploadBtn = () => {
    const { maxFileCounts, items } = this.props;
    const isHidden = items.length >= maxFileCounts;
    const uploadCls = classNames('r-image-picker-list-item', {
      'r-image-picker-list-item__hidden': isHidden,
    });

    return (
      <div className={uploadCls} key="upload-btn">
        <div className="r-image-picker-list-item-container">{this.props.children}</div>
      </div>
    );
  };

  renderList = () => {
    const { items = [] } = this.props;
    let lists = [];
    const count = 4;
    const len = items.length;

    if (len > 0) {
      lists = items.map(file => {
        let progress = null;
        const thumbnail = isImageUrl(file) ? (
          <img src={file.thumbUrl || file.url} alt={file.name} />
        ) : null;
        if (file.status === 'uploading' && 'percent' in file) {
          const percent = Math.floor(file.percent);
          progress = (
            <div className="r-image-picker-list-item-container-progress" key="progress">
              <Circle
                percent={percent}
                strokeWidth="4"
                trailWidth="4"
                trailColor="#f5f5f5"
                strokeColor="#1890ff"
              />
              <span className="r-image-picker-list-item-container-progress-text">{percent}%</span>
            </div>
          );
        } else {
          progress = null;
        }

        return (
          <div className="r-image-picker-list-item" key={file.uid}>
            <div className="r-image-picker-list-item-container">
              {progress}
              <div
                className="r-image-picker-list-item-container-remove"
                onClick={() => {
                  this.props.onRemove(file);
                }}
              >
                <Icon type="cross-circle" size="xs" color="red" />
              </div>
              <div className="r-image-picker-list-item-container-content">{thumbnail}</div>
            </div>
          </div>
        );
      });
    }
    lists.push(this.renderUploadBtn());

    return lists;
  };
  render() {
    const rootCls = classNames('r-image-picker-list');

    return <div className={rootCls}>{this.renderList()}</div>;
  }
}

export default UploadList;
