// @flow

export default {
  isMobile(userAgent: any): boolean {
    return (
      userAgent.match(/iPad/i) ||
      userAgent.match(/iPhone/i) ||
      userAgent.match(/iPod/i) ||
      userAgent.match(/Android/i)
    )
  },
}
