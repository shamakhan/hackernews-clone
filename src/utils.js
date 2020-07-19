
export const getDataFromStorage = () => {
  return JSON.parse(localStorage.getItem('storyActions') || '{}');
}

export const saveDataToStorage = (data) => {
  localStorage.setItem('storyActions', JSON.stringify(data));
}

export const getUrlParams = () => {
  const { search } = window.location;
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