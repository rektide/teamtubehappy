var fs = require("fs")

var oldroot = []
for(var i in this)
	oldroot = i

var dspjs = fs.readFileSync("./lib/dsp.js/dsp.js")
eval(dspjs)

for(var i in this)
	if(!oldroot[i])
		exports[i] = this[i]
