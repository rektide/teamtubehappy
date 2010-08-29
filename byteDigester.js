var fft = require("./dsp_wrapper")
var sys = require("sys"),
	events = require("events")

exports.byteDigester = function(_wordSize,_dataSrc) 
{
	var dataSrc = _dataSrc, // src to read in from
		width = _wordSize / 8, // number of bytes in a word
		powTable = [], // powers of two
		byteIter = 0, // iterate through bytes
		event = new events.EventEmitter()
	
	for(var j = 0; j < width+1; ++j)
		powTable[j] = Math.pow(2,8*j)
	
	dataSrc.on("data",function(data) {
		sys.log("data packet size "+data.length)
		var num = 0,
			appends = []
		for(var i = width - byteIter; i < data.length; ++i) {
			var add = data[i] * powTable[byteIter]
			num += add
			//sys.log(" "+i+" "+add+" "+num+" "+byteIter)
			if(++byteIter == width) {
				appends.push(num)
				num = 0
				byteIter = 0
			}
		}
		event.emit("data",appends)
	})
	return event
}

