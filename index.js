const { createLedger } = require('destate')
const { send, receive, subscribe } = createLedger()

send({ firstName: 'steve' }, { greeting: 'hi there steve' })
send({ firstName: 'steve', lastName: 'jobs' }, { greeting: 'hi there steve jobs' })

const reds = { greeting: (acc = [], { greeting }) => acc.concat(greeting)}
console.log('sent to steve', receive({ firstName: 'steve' }, reds))
console.log('sent to steve jobs', receive({ firstName: 'steve', lastName: 'jobs' }, reds))