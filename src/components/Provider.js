import React from 'react'
import Context from './Context'

export default ({ children, ledger }) => <Context.Provider value={ledger}>{children}</Context.Provider>


