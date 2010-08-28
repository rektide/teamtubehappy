var fs = require("fs"),
	events = require("events")

exports.playlist = function(filename) {
	var event = events.EventListener()
	fs.readFile(filename, null, function(err,data) {
		if(err) {
			event.emit("error","readFile error: "+err)
			return
		}
		var lines = data.split("\n")
		var parseExp = /^(\w+\d*)=(.*?)\r?$/
		for(var l in lines) {
			var e = parseExp(lines[l])
			if(e[1].indexOf("File") == 0)
				event.emit("data",e[2])
		}
	})
	return event
}

