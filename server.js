var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require("socket.io")(http)
var path = require('path')

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', index.html))
})

io.on('connection', (socket) => {
	console.log('Client connected')
	socket.emit("temperature", 30)
})

http.listen(process.env.PORT || 8080, () => {
	console.log("Server started")
})