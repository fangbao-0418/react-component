import events from '../decorations/events'
@events()
class Events {
  public on: any
  public trigger: any
  public off: any
}
export default new Events()
