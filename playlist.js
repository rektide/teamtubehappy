var fs = require("fs"),
	events = require("events"),
	sys = require("sys")

exports.playlist = function(filename) {
	var event = new events.EventEmitter()
	sys.log("inspecting playlist "+filename)
	fs.readFile(filename, "ascii", function(err,data) {
		if(err) {
			sys.log("err reading playlist "+err)
			event.emit("error","readFile error: "+err)
			return
		}
		var lines = data.split("\n")
		var parseExp = /^(\w+\d*)=(.*?)\r?$/
		for(var l in lines) {
			var e = parseExp(lines[l])
			if(!e)
				continue;
			if(e[1].indexOf("File") == 0)
				event.emit("url",e[2])
			else if(e[1].indexOf("Title") == 0)
				event.emit("title",e[2])
		}
		event.emit("end")
	})
	return event
}

