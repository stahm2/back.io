import { Injectable } from '@angular/core';
import * as sensor from 'node-metawear/src/device';
import * as http from 'http';


@Injectable()
export class SensorProvider {
	port = 8082;
	currentDevice = null;

	availableDevices = [];
	availableAddresses = [
		// MAC-Addresses for testing
		// TODO: remove this array when the app is up and running and make a separate list in the sensor.page view
		'E4:A2:16:63:D9:E1'
	];

	constructor() {
		console.log(http);
		console.log('sensor service initialized');
	}

	public connectDeviceByAddress(address: string) {
		sensor.discoverByAddress(address, device => {
			console.log('discovered ' + device.address);
			device.connectAndSetUp(device => {
				console.log('connected ' + device.address);
			}, error => {
				console.log(error);
			});
		});
	}

	/*
	public discoverAll() {
		sensor.discoverAll(this.onDiscover);
	}
	*/
	public discoverAll() {
		sensor.discover(function (device) {
			console.log('discovered device', device.address);
			device.on('disconnect', function () {
				console.log('we got disconnected! :( ');
			});

			device.connectAndSetup(function (error) {
				console.log('we are ready');
				this.currentDevice = device;
			});
		});

		console.log('start server on http://localhost:' + this.port);

		http.createServer(function (request, response) {
			function writeResponse(code, body) {
				response.writeHead(code, { "Content-Type": "text/plain" });
				response.write(body);
				response.end();
			}

			console.log('HTTP request - ' + request.url);

			if (!this.currentDevice) {
				writeResponse(503, "metawear not ready yet");
				console.error('Device not ready..');
				return;
			}

			switch (request.url) {
				case '/':
				case '/info/':
					writeResponse(200, 'OK');
					break;
				case '/temperature/':
					var temperature = new this.currentDevice.Temperature(
						this.currentDevice,
						this.currentDevice.Temperature.ON_BOARD_THERMISTOR
					);

					temperature.getValue(function (value) {
						writeResponse(200, "" + value);
					});
					break;
				case '/pressure/':
					var barometer = new this.currentDevice.Barometer(this.currentDevice);

					barometer.enablePressure(function (value) {
						writeResponse(200, "" + value);
						barometer.disable();
					});
					break;
				case '/brightness/':
					var light = new this.currentDevice.AmbiantLight(this.currentDevice);

					light.enable(function (value) {
						writeResponse(200, "" + value);
						light.disable();
					});
					break;
				default:
					writeResponse(404, "Route not found");
			}
		}).listen(this.port);

		/*
				sensor.discover((device) => {
					console.log('discovered device ', device.address);

					device.on('disconnect', function () {
						console.log('we got disconnected! :( ');
					});

					device.connectAndSetup(function (error) {
						console.log('were connected!');

						var gyro = new device.Gyro(device);

						gyro.config.setRate(1600);
						gyro.config.setRange(125);
						gyro.commitConfig();

						gyro.enable();
						gyro.onChange(function (x, y, z) {
							console.log("x:", x, "\t\ty:", y, "\t\tz:", z);
						});
					});
				});
				*/
	}

	private onDiscover(device) {
		this.availableAddresses.forEach((address) => {
			if (device.address.equalsIgnoreCase(address)) {
				console.log('discovered ' + address);
				this.availableDevices.push(device);
			}
		});
		// Complete discovery after finishing scanning for devices
		if (this.availableAddresses.length == this.availableDevices.length) {
			sensor.stopDiscoverAll(this.onDiscover);
			// stream accelerometer for a short amount of time
			setTimeout(function () {
				console.log('discover complete');
				this.availableDevices.forEach(device => {
					this.startAccelStream(device);
				});
			}, 1000);
		}
	}

	public startAccelStream(device) {
		device.connectAndSetUp(function (error) {
			if (error) {
				console.error(error);
				process.exit(1);
			}
			// Set the max range of the accelerometer /TESTING!)
			sensor.mbl_mw_acc_set_range(device.board, 8.0);
			sensor.mbl_mw_acc_write_acceleration_config(device.board);
			var accSignal = sensor.mbl_mw_acc_get_acceleration_data_signal(device.board);
			sensor.mbl_mw_datasignal_subscribe(accSignal, null, sensor.FnVoid_VoidP_DataP.toPointer(function gotTimer(context, dataPtr) {
				var data = dataPtr.deref();
				var pt = data.parseValue();
				console.log(pt.x, pt.y, pt.z);
			}));
			sensor.mbl_mw_acc_enable_acceleration_sampling(device.board);
			sensor.mbl_mw_acc_start(device.board);

			// Stop after 5 seconds
			setTimeout(function () {
				// Stop the stream
				sensor.mbl_mw_acc_stop(device.board);
				sensor.mbl_mw_acc_disable_acceleration_sampling(device.board);
				sensor.mbl_mw_datasignal_unsubscribe(accSignal);
				sensor.mbl_mw_debug_disconnect(device.board);
			}, 5000);
		});
	}

}
