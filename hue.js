const got = require('got')

if (!process.env.BRIDGE_IP) {
	console.error('Bridge IP address is not set. Please follow the README to setup environment variables.\n')
	process.exit(1)
}

var BRIDGE_IP = process.env.BRIDGE_IP

async function authorize() {
	const { body } = await got.post(`http://${BRIDGE_IP}/api`, { json: { 'devicetype': 'bbhub#beaglebone' }, responseType: 'json' })

	if (body[0].success) {
		console.log(`Authorized successfully`)
		return body[0].success.username
	} else {
		// unable to authorize (usually due to button not pressed), wait and retry
		console.log(`Error: ${body[0].error.description}. Retrying in 5 seconds...`)
		await new Promise(r => setTimeout(r, 5000))
		return authorize()
	}
}

function switch_lights(username) {
	(async () => {
		const { body } = await got(`http://${BRIDGE_IP}/api/${username}/lights`, { responseType: 'json' })

		for (lightid in body) {
			// toggle current light on state
			on = body[lightid].state.on
			await change_light_state(username, lightid, 'on', !on)
		}
	})()
}

function change_brightness(username, percentage) {
	(async () => {
		// convert brightness from percentage to [1,254]
		brightness = Math.round(percentage * 254)

		const { body } = await got(`http://${BRIDGE_IP}/api/${username}/lights`, { responseType: 'json' })

		if (brightness > 0) {
			for (lightid in body) {
				// turn light on if it is currently off
				if (!body[lightid].state.on) {
					await change_light_state(username, lightid, 'on', true)
				}
				// change brightness to input level
				await change_light_state(username, lightid, 'bri', brightness)
			}
		} else {
			for (lightid in body) {
				// turn off lights if brightness is 0
				await change_light_state(username, lightid, 'on', false)
			}
		}
	})()
}

async function change_light_state(username, lightid, property, value) {
	return got.put(`http://${BRIDGE_IP}/api/${username}/lights/${lightid}/state`, { json: { property: value } })
}

module.exports = { authorize, switch_lights, change_brightness }