export default {
  setCookie (obj: {name: string, value?: any, time?: number, path?: string}) {
    const date: any = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * (obj.time || 1))
    document.cookie = obj.name + '='+ (obj.value || 1) +';expires=' + date.toGMTString() + ';path=' + (obj.path || '/')
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
  },
  removeCookie (names: [string]) {
    for (const name of names) {
      this.setCookie({name, time: -1})
    }
  }
}
