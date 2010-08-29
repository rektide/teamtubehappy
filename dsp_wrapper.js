var fs = require("fs")

var oldroot = {}
for(var i in GLOBAL)
	oldroot[i] = true

var dspjs = fs.readFileSync("./lib/dsp.js/dsp.js","ascii")
eval(dspjs)

for(var i in GLOBAL)
	if(!oldroot[i])
		exports[i] = GLOBAL[i]
