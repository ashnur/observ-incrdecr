# Usage


```
var incrdecr = require('observ-incrdecr')

// incrdecr(step, minValue, maxValue, initialValue)

var val = incrdecr(6, -10, 10, 0)
val() // 0

val.events.increment()
val() // 6

val.events.increment()
val() // 10

val.events.decrement()
val.events.decrement()
val.events.decrement()
val() // -8

val.events.decrement()
val() // -10

val.events.change(1)
val() // 1

val.events.change(-31)
val() // -10
val.events.change(255)
val() // 10
val.events.change(6)
val() // 6
val.events.change('notanumber')
t.ok(val(), 6)

```

# Notes

uses `Math.round()` internally. No floats, because floats suck :(

all arguments are optional, the default values are
  - step: 1
  - min: Number.MIN_VALUE
  - max: Number.MAX_VALUE
  - init: 0
