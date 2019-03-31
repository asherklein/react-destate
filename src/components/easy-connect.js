import connect from './connect'
import { state } from '../util/common-reducers'

export default (Component) => connect({ state }, Component)