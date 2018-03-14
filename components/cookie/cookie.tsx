export default {
  set (obj: object | any, options: {path?: string, expires?: Date, domain?: string, secure?: 0 | 1}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        document.cookie = `${key}=${obj[key]}
        ;expires=${options.expires}
        ;path=${options.path || '/'}
        ${(options.domain  === undefined ? (';domain=' + options.domain) : '')}
        ${(options.secure === undefined ? (';secure=0' + options.secure) : '')}`
      }
    }
  },
  get (name: string) {
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
  remove (names: [string]) {
    const date: any = new Date()
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000 * -1)
    for (const name of names) {
      document.cookie = name + '=' + name + ';expires=' + date
    }
  }
}
