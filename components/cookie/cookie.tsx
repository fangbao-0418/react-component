export default {
  setCookie (name: string, time: number) {
    const date: any = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * time)
    document.cookie = name + '=1;expires=' + date.toGMTString()
  },
  getCookie (name: string) {
    if (name) {
      const cookie = document.cookie.split(';')
      for (const i of cookie) {
        if (i.indexOf(name) > -1) {
          return true
        }
      }
      return false
    } else {
      return document.cookie
    }
  }
}
