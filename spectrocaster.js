var playlist = require("playlist"),
	stream = require("stream"),
	dspjs = require("dsp_wrapper")
var fs = require("fs")

var streams = {},
	playlistDir = "./playlists",
	streamStarter,
	playlistRefresh

var playlistRefresh = function() {
	fs.read(playlistDir,function(err,files) {
		for(var f in files) {
			var stream = files[f]
			if(!streams[stream])
				streamStarter[stream]
		}
	})
}

var streamStarter = function(stream) {
	var addrStream = playlist.playlist(stream),
		done = false
		title

	var attempConnect = function(addr) {
		if(streams[stream])
			return
		var child = stream.stream(addr)
		child.title = title
		child.stdout.on("data",function() {
			
		})
		child.on("exit", function() {
			streams[stream] = null
		})
		
	}
	addrStream.on("url",attemptconnect)
	addrStream.on("title", function(_title) { title = _title })
	addrStream.on("end", function() { done = true })
}


