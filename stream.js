var assert = require("assert"),
	events = require("events"),
	child_process = require('child_process'),
	sys = require("sys")

var ua = "spectrogram001",
	launch = "gst-launch",
	opts = {ua:ua, timeout:15, width:24, depth:24}

exports.stream = function (url) {
	var samples = new events.EventEmitter()
	var pipelineArgs = [ "-q", 
		"souphttpsrc", "location="+url, "user-agent="+opts.ua, "timeout="+opts.timeout, "!",
		"mad", "!",
		"audioconvert", "!",
		"audioresample", "!",
		"audio/x-raw-int,channels=2,width="+opts.width+",depth="+opts.depth, "!",
		"fakesink", "silent=true" ]
		//"fdsink", "fd=1" ]
	sys.log("spawning gstreamer pipeline for "+url+": "+pipelineArgs.join(" "))
	return child_process.spawn(launch,pipelineArgs)
}
