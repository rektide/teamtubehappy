var assert = require("assert"),
	events = require("events"),
	child_process = require('child_process')

var ua = "spectrogram001",
	launch = "gst-launch",
	opts = {ua:ua, timeout:15, width:24, depth:24}

exports.stream = function (url) {
	var samples = events.EventEmitter()
	var pipelineArgs = [ "-q", 
		"souphttpsrc", "location="+url, "user-agent="+opts.ua, "timeout="+opts.timeout, "!",
		"mad", "!",
		"audioconvert", "!",
		"audio/xraw-int,channels=2,width="+opts.width+",depth="+opts.depth, "!",
		"fdsink", "fd=1" ]
	return child_process.spawn(launch,pipelineArgs)
}
