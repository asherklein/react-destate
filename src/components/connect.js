import React, { Component } from 'react'
import Context from './Context'

import { equals } from 'ramda'


class DestatedComponent extends Component {
    constructor(props) {
        super(props)
        const { goal, reducers, rulebook: { query } } = this.props
        this.state = query(goal, reducers)

    }

    initSub = () => {
        const { goal, reducers } = this.props
        const { subscribe } = this.props.rulebook

        this.sub = subscribe(goal, reducers, (state) => this.setState(state))

        this.setState(this.sub.query())
    }

    unSub = () => this.sub && this.sub.unSubscribe()

    componentDidMount = () => this.initSub()

    componentWillUnmount = () => this.unSub()

    componentDidUpdate = ({ goal: oldgoal = {} }) => {
        const { goal: newgoal = {} } = this.props
        if(!equals(oldgoal, newgoal)){
            this.unSub()
            this.initSub()
        }
    }

    render = () => {
        const { RawComponent, goal, rulebook, reducers, ...props } = this.props
        return <RawComponent
            {...this.state}
            {...props}
            me={goal}
            rulebook={rulebook}
        />
    }
}

export default (reducers, RawComponent) =>
    (props) => <Context.Consumer>
        {(rulebook) => <DestatedComponent
            {...{
                ...props,
                rulebook,
                reducers,
                RawComponent
            }}
        />}
    </Context.Consumer>



