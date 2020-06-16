# bbhub
A home control hub using BeagleBone Green wireless

Features:
- (WIP) Turn on/off all Philips Hue lights with a button
- (WIP) Adjust brightness of all Philips Hue lights with a dial
- (WIP) Check current room temperature with temperature sensor

Setup:
1. Get the IP address of your Philips Hue bridge by going to https://discovery.meethue.com/, then store it in an environment variable: `export BRIDGE_IP=<bridge ip address>`
2. Navigate to your BeagleBone in your browser. Default port number should be 3000 but can be changed with an environment variable: `export PORT=<desired port number>`. Press the button on your Hue bridge and click "Authorize".
3. All done! You should be able to use Hue related features now.

Note: Not sure if my specific BeagleBone is faulty but it seems to crash and reboot under moderate traffic. YMMV.
