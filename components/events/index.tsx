import event from '../decorations/event'
@event()
class Events {
  public on: any
  public trigger: any
  public off: any
}
export default new Events()
