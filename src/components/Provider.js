const React = require('react')
const Context = require('./Context')

module.exports = ({ children, ledger }) => <Context.Provider value={ledger}>{children}</Context.Provider>


