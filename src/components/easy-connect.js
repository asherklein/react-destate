import connect from './connect'
import { state } from 'destate-common-reducers'

export default (Component) => connect({ state }, Component)