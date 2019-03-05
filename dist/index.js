'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var Context = React__default.createContext(null);

var connect = ((reducers, RawComponent) => {
  class DestatedComponent extends React.Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "componentDidMount", () => {
        const {
          address
        } = this.props;
        const {
          receive,
          subscribe
        } = this.context;
        this.sub = subscribe(address, reducers, state => this.setState(state));
        this.setState(receive(address, reducers));
      });

      _defineProperty(this, "componentWillMount", () => this.sub && this.sub.unSubscribe());

      _defineProperty(this, "render", () => React__default.createElement(RawComponent, _extends({}, this.state, this.props, {
        send: this.context.send,
        me: this.props.address
      })));

      this.state = {};
    }

  }

  DestatedComponent.contextType = Context;
  return DestatedComponent;
});

var Provider = (({
  children,
  ledger
}) => React__default.createElement(Context.Provider, {
  value: ledger
}, children));

var index = {
  connect,
  Provider
};

module.exports = index;
