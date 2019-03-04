const React = require('react')
const Context = require('./Context')


module.exports = (reducers, RawComponent) => {
    class DestatedComponent extends React.Component{
        constructor(props){
            super(props)
            this.state = {}
        }

        componentDidMount = () => {
            const { address } = this.props
            const { receive, subscribe } = this.context
            
            this.sub = subscribe(address, reducers, (state) => this.setState(state))

            this.setState(receive(address, reducers))
        }

        componentWillMount = () => this.sub && this.sub.unSubscribe()
        
        render = () => <RawComponent 
            {...this.state} 
            {...this.props}
            send={this.context.send}
            me={this.props.address} 
        />
    }

    DestatedComponent.contextType = Context

    return DestatedComponent
}


