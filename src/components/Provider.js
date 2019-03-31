import React from 'react'
import Context from './Context'

export default ({ children, rulebook }) => <Context.Provider value={rulebook}>{children}</Context.Provider>


