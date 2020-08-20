/**
 * @param {Element} elem
 *
 * @return {number}
 */
export function getParentId(elem) {
  while (elem) {
    if (elem.tagName === 'TR') {
      // @ts-ignore
      return elem.data_id;
    }
    // @ts-ignore
    elem = elem.parentNode;
  }
  return undefined;
}
