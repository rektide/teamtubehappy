var assert = require("assert"),
	events = require("events"),
	child_process = require('child_process'),
	sys = require("sys")

var ua = "spectrogram001",
	launch = "gst-launch",
	opts = {ua:ua, timeout:15, width:16, depth:16}

exports.stream = function (url) {
	var samples = new events.EventEmitter()
	var pipelineArgs = [ "-q", 
		"souphttpsrc", "location="+url, "user-agent="+opts.ua, "timeout="+opts.timeout, "!",
		"mad", "!",
		"audioresample", "!",
		"audioconvert", "!",
		"audio/x-raw-int,channels=1,width="+opts.width+",depth="+opts.depth+",signed=false", "!",
		"fdsink", "fd=1" ]
	sys.log("spawning gstreamer pipeline for "+url+": "+pipelineArgs.join(" "))
	return child_process.spawn(launch,pipelineArgs)
}
