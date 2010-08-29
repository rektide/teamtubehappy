var playlist = require("./playlist"),
	stream = require("./stream"),
	dspjs = require("./dsp_wrapper")
var fs = require("fs"),
	sys = require("sys")

var streams = {},
	playlistDir = "./playlists",
	streamStarter,
	playlistRefresh,
	playlistRefreshMS = 4000

var playlistRefresh = function() {
	fs.readdir(playlistDir,function(err,files) {
		for(var f in files) {
			var stream = playlistDir + "/" + files[f]
			if(!streams[stream]) {
				sys.log("adding playlist file "+stream)
				streamStarter[stream] = streamStarter(stream)
			}
		}
	})
}

var streamStarter = function(streamUrl) {
	var addrStream = playlist.playlist(streamUrl),
		done = false,
		title

	var attemptConnect = function(addr) {
		if(streams[streamUrl])
			return
		var child = stream.stream(addr)
		child.title = title
		child.stdout.on("data",function() {
			streams[streamUrl] = child
		})
		var exceptionHandler = function(err) {
			sys.log("ending stream "+streamUrl+"; "+sys.inspect(arguments))
			try {
				child.kill()
			} catch(ex) {}
			streams[streamUrl] = null
		}
		child.on("exit", exceptionHandler)
		child.stderr.setEncoding("ascii")
		child.stderr.on("data", exceptionHandler)
		child.stderr.on("close", exceptionHandler)
		child.stderr.on("end", exceptionHandler)
		
	}
	addrStream.on("url",attemptConnect)
	addrStream.on("title", function(_title) { title = _title })
	addrStream.on("end", function() { done = true })
}

setInterval(playlistRefresh, playlistRefreshMS)
playlistRefresh()

