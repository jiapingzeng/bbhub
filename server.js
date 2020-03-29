var path = require('path')
var express = require('express')
var five = require('johnny-five')
var BeagleBone = require('beaglebone-io')

const DEFAULT_FREQ = 1000 // sample sensor every second

var board = new five.Board({
	io: new BeagleBone()
})

board.on('ready', () => {

	// initialize sensors/controls
	const led = new five.Led() // default LED (USR3)
	const button = new five.Button('GPIO115')
	const buzzer = new five.Piezo('GPIO117')
	const rotary = new five.Sensor({
		pin: 'A0',
		freq: DEFAULT_FREQ
	})
	const thermo = new five.Thermometer({
		pin: 'A2',
		freq: DEFAULT_FREQ,
		toCelsius: get_temperature
	})

	// start web app
	var app = express()
	app.listen(process.env.PORT || 8080)
	app.use(express.static(path.join(__dirname, 'build')))

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, 'build', index.html))
	})

	app.post('/', (req, res) => {
		res.send({
			temperature: {
				C: thermo.C,
				F: thermo.F,
				K: thermo.K
			},
			rotation: get_rotation(rotary.raw)
		})
	})
})

/**
 * Convert raw thermometer reading to Celsius
 */
function get_temperature(raw) {
	const B = 4275, R0 = 100000
	var R = R0 * (1023.0 / raw - 1.0)
	return Math.round(1.0 / (Math.log(R / R0) / B + 1 / 298.15) - 273.15)
}

/**
 * Convert raw rotary potentiometer reading to percentage
 */
function get_rotation(raw) {
	const min = 0, max = 937
	return Math.round((raw - min) * 100 / (max - min))
}

module.exports = app