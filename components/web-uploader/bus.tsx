import events from '../decorations/events'
@events()
export class Bus {
  public on: <T>(event: string, cb: (payload?: T) => void) => void
  public trigger: <T>(event: string, payload?: T) => void
  public off: (event: string) => void
}
const bus = new Bus()
export default bus
