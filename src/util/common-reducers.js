const { 
    compose: c, curry, __, flip, uncurryN, always, identity,
    map, append, zipObj, concat,
    merge, path, pathEq, pick, propOr,
    add, T, not, is
    
 } = require('ramda')

// type reducer s = state s -> rule -> state s
// type toReducer a = a -> reducer s 
//                 OR a -> state s -> rule -> state s



const mfReducer = curry((reducer, zero, when, what, acc, next) => when(next) ? reducer(acc || zero, what(next)) : acc || zero) 

// body :: rule -> {}
const body = propOr({}, 'body')

// state :: reducer
const state = mfReducer(merge, {}, T, body)

// collect :: (rule -> bool) -> (rule -> s) -> reducer [s]
const collect = mfReducer(flip(append), [])

// concatter :: (rule -> bool) -> (rule -> [s]) -> reducer [s]
const concatter = mfReducer(concat, [])

const collectOrConcatReducer = (xs, xOrXs) => is(Array, xOrXs) ? concat(xs, xOrXs) : append(xOrXs, xs)
// collectOrConcat :: (rule -> bool) -> (rule -> s | [s]) -> reducer [s]
const collectOrConcat = mfReducer(collectOrConcatReducer, [])

// typeEq :: string -> rule -> bool
const typeEq = pathEq(['body', 'type'])

// mapToProp :: String -> rule -> *
const mapToProp = uncurryN(2, propName => path(['body', propName]))

// collectProp :: string -> string -> reducer [s]
const collectProp = uncurryN(4, (type, propName) => collect(typeEq(type), mapToProp(propName))) 

// concatterProp :: string -> string -> reducer [s]
const concatterProp = uncurryN(4, (type, propName) => concatter(typeEq(type), mapToProp(propName))) 

// collectOrConcatProp :: string -> string -> reducer [s]
const collectOrConcatProp = uncurryN(4, (type, propName) => collectOrConcat(typeEq(type), mapToProp(propName))) 

const sumProp = (type, propName) => mfReducer(add, typeEq(type), mapToProp(propName), 0)

const count = (type) => mfReducer(add, typeEq(type), always(1), 0)

// similiar to state, but only for a VALS type and for specific vals
const VALS = '@@__VALS__@@'
const vals = (vals) => mfReducer(merge, zipObj(vals, map(always(''), vals)), typeEq(VALS), c(pick(vals), body))

const TOGGLE = '@@__TOGGLE__@@'
const toggle = mfReducer(not, false, typeEq(TOGGLE), identity)

module.exports = { state, collect, concatter, collectOrConcat, collectProp, concatterProp, collectOrConcatProp, sumProp, count, vals, toggle,
    types: {
        VALS, TOGGLE
    }
}