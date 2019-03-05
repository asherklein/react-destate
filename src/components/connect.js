import React, { Component } from 'react'
import Context from './Context'



class DestatedComponent extends Component {
    constructor(props) {
        super(props)
        const { address, reducers, ledger: { receive } } = this.props
        this.state = receive(address, reducers)

    }

    componentDidMount = () => {
        const { address, reducers } = this.props
        const { receive, subscribe } = this.props.ledger

        this.sub = subscribe(address, reducers, (state) => this.setState(state))

        this.setState(receive(address, reducers))
    }

    componentWillUnmount = () => this.sub && this.sub.unSubscribe()

    render = () => {
        const { RawComponent, address, ledger, reducers, ...props } = this.props
        return <RawComponent
            {...this.state}
            {...props}
            me={address}
            ledger={ledger}
        />
    }
}

export default (reducers, RawComponent) =>
    (props) => <Context.Consumer>
        {( ledger ) => <DestatedComponent
            {...{
                ...props,
                ledger,
                reducers,
                RawComponent
            }}
        />}
    </Context.Consumer>



