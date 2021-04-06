import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
export const timeAgo = new TimeAgo('en-IN');

export const getDataFromStorage = () => {
  return JSON.parse(global.window.localStorage.getItem('storyActions') || '{}');
}

export const saveDataToStorage = (data) => {
  global.window.localStorage.setItem('storyActions', JSON.stringify(data));
}

export const getUrlParams = () => {
  const { search } = (global.window && global.window.location) || {};
  if (search) {
    const paramArr = search.substr(1).split('&');
    return paramArr.reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = value;
      return acc;
    }, {})
  }
  return {};
}

export const toQueryString = (query) => {
  return '?' + Object.entries(query).reduce((acc, q) => {
    acc.push(`${q[0]}=${q[1]}`);
    return acc;
  }, []).join('&');
}