export default {
  set (obj: {[key: string]: string}, options: {path?: string, expires?: Date, domain?: string, secure?: 0 | 1}) {
    let str = ''
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        str = `${key}=${obj[key]};
        ${options.expires !== undefined ? `expires=${options.expires};` : ''}
        path=${options.path || '/'};
        ${(options.domain !== undefined ? `domain=${options.domain};` : '')}
        ${(options.secure !== undefined ? `secure=${options.secure};` : '')}`
        str = str.replace(/;\s*/g, '; ').trim()
        document.cookie = str
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
      return undefined
    } else {
      throw new Error('name is not empty')
    }
  },
  remove (names: string[] | string | undefined) {
    const type = typeof names
    const date: any = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    const expires = date.toGMTString()
    let val
    switch (type) {
    case 'string':
      if (names === '') {
        throw new Error('name is not empty string')
      }
      val = this.get(name)
      document.cookie = `${name}=${val}; expires=${expires}`
      break
    case 'object':
      if (names instanceof Array) {
        for (const name of names) {
          val = this.get(name)
          document.cookie = `${name}=${val}; expires=${expires}`
        }
      } else {
        throw new Error('type is not allowed')
      }
      break
    case 'undefined':
      this.removeAll()
      break
    default:
      throw new Error('type is not allowed')
    }
  },
  removeAll () {
    const date: any = new Date()
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
    const expires = date.toGMTString()
    const cookies = document.cookie.split('; ')
    cookies.map((item) => {
      document.cookie = `${item}; expires=${expires}`
    })
  }
}
