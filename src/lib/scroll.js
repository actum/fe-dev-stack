// @flow

export default {
  /**
   * Find the current top offset of element
   * @param {HTMLCollection|NodeList|DOMElement} element - Element to find the offset for
   */
  getOffsetTop(element: any) {
    const currentScrollPosition =
      window.pageYOffset ||
      (document.documentElement: any).scrollTop ||
      (document.body: any).scrollTop ||
      0

    return element.getBoundingClientRect().top + currentScrollPosition
  },

  /**
   * Scroll to the target element with offset
   * @param {Event} event
   * @param {Number} customOffset - Extra space for the scrolled element position
   */
  toElement(targetId: string, customOffset: number = 0): void {
    const target = document.getElementById(targetId)
    const targetOffsetTop = this.getOffsetTop(target)

    window.scroll({
      behavior: 'smooth',
      top: targetOffsetTop - customOffset,
    })
  },
}
