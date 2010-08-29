var dsp = require("./dsp_wrapper"),
	byteDigester = require("./byteDigester")
var sys = require("sys"),
	events = require("events")

exports.fft = function(_bufferSize, _wordSize, _rate, _step, _dataSrc) {

	var dataSrc = _dataSrc, // src to read in from
		width = _wordSize / 8, // number of bytes in a word
		bufferSize = _bufferSize,
		rate = _rate,
		buffer = [],
		step = _step,
		pos = - bufferSize + step,
		event = new events.EventEmitter(),
		digester = byteDigester.byteDigester(_wordSize, _dataSrc),
		fft = new dsp.FFT(bufferSize, rate)

	digester.on("data",function(appends) {
		
		for(var i = 0 ; i < appends.length; ++i) {
			buffer.push(appends[i])
			while(buffer.length > bufferSize)
				buffer.shift()
			if(++pos >= step) {
				var spectrum = fft.forward(buffer)
				pos = 0
			}
		}
	})	
}

