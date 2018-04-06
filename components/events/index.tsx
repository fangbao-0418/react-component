import events from '../decorations/events'
@events()
export class Events {
  public on: any
  public trigger: any
  public off: any
}
export default new Events()
