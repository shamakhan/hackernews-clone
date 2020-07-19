
export const getDataFromStorage = () => {
  return JSON.parse(localStorage.getItem('storyActions') || '{}');
}

export const saveDataToStorage = (data) => {
  localStorage.setItem('storyActions', JSON.stringify(data));
}

export const getUrlParams = () => {
  const { search } = window.location;
  console.log(search);
  if (search) {
    const paramArr = search.substr(1).split('&');
    console.log(paramArr);
    return paramArr.reduce((acc, param) => {
      const [key, value] = param.split('=');
      console.log({ param, key, value});
      acc[key] = value;
      return acc;
    }, {})
  }
  return {};
}