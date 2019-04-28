
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';

 const memoizeFormatterSelectValue = list => {
  return list.map(item => {
    if (Array.isArray(item)) {
      return formatterSelectValue(item);
    } else {
      if (item.children) {
        return {
          value: item.key,
          label: item.value,
          children: formatterSelectValue(item.children),
        };
      }
      return {
        value: item.key,
        label: item.value,
      };
    }
  });
};

export const formatterSelectValue = memoizeOne(memoizeFormatterSelectValue, isEqual);
