export default {
  set (obj: object | any, options: {path?: string, expires?: Date, domain?: string, secure?: 0 | 1}) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        document.cookie = `${key}=${obj[key]}
        ${options.expires !== undefined ? ('; expires=' + options.expires) : ''}
        ; path=${options.path || '/'}
        ${(options.domain  !== undefined ? ('; domain=' + options.domain) : '')}
        ${(options.secure !== undefined ? ('; secure=0' + options.secure) : '')}`
      }
    }
  },
  get (name: string) {
    if (name) {
      const cookie = document.cookie.split('; ')
      for (const i of cookie) {
        if (i.indexOf(name) === 0) {
          return i.substring(name.length + 1, i.length)
        }
      }
      return null
    } else {
      return 'name is not empty'
    }
  },
  remove (names: [string]) {
    const date: any = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    for (const name of names) {
      const val = this.get(name)
      document.cookie = `${name}=${val}; expires=${date.toGMTString()}`
    }
  }
}
