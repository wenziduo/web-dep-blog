export function arrGroup(array, subGroupLength) {
  let index = 0
  let newArray = []
  while (index < array.length) {
    newArray.push(array.slice(index, (index += subGroupLength)))
  }
  return newArray
}

export function isServer() {
  return typeof window === 'undefined'
}

export const getUrlParam = (name, url) => {
  if (!name) {
    return '';
  }
  url = url || location.search || location.hash;
  name = name.replace(/(?=[\\^$*+?.():|{}])/, '\\');
  const reg = new RegExp('(?:[?&]|^)' + name + '=([^?&#]*)', 'i');
  const match = url.match(reg);
  return !match ? '' : decodeURIComponent(match[1]);
};