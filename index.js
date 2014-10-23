module.exports = incrdecr

var confined = require('observ-confined')
var input = require('geval/multiple')
var struct = require('observ-struct')

function restrictor(v, prev, opts){
  v = Math.round(v)
  if ( isNaN(v) ) return prev
  v = v > opts.maximumValue ? opts.maximumValue : v < opts.minimumValue ? opts.minimumValue : v
  return v
}

function incrdecr(step, min, max, init){
  step = step || 1
  min = min !== undefined ? min : Number.MIN_VALUE
  max = max !== undefined ? max : Number.MAX_VALUE
  init = init !== undefined ? init : 0

  var boundedValue = confined(restrictor, { initialValue: init
                                          , minimumValue: min
                                          , maximumValue: max
                                          })

  var state = struct({ value: boundedValue
                     , events: input(['change', 'increment', 'decrement'])
                     })

  function change(value){
    return boundedValue.set(Number(value))
  }

  function incr(value){
    return value + step
  }                                                                                                                                                    
  function decr(value){
    return value - step
  }

  state.events.change(change)

  state.events.increment(function(){
    state.events.change(incr(state.value()))
  })

  state.events.decrement(function(data){
    state.events.change(decr(state.value()))
  })


  return state

}
