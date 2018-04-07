export default function () {
  return (target: any) => {
    const events: any[] = []
    console.log(this, 'this')
    function trigger (...args: any[]) {
      events.map((item) => {
        if (item.name === args[0]) {
          item.fn.apply(null, args.slice(1))
        }
      })
      return target.prototype
    }
    function on (name: string, fn: any) {
      events.push({
        name,
        fn
      })
      return target.prototype
    }
    function off (name: string) {
      events.map((item, index) => {
        if (item.name === name) {
          events.splice(index, 1)
        }
      })
      return target.prototype
    }
    target.prototype.trigger = trigger
    target.prototype.on = on
    target.prototype.off = off
  }
}
