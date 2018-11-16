import { Injectable } from '@angular/core';
import { Metawear } from 'metawear';

@Injectable()
export class SensorProvider {
	availableDevices = [];
	availableAddresses = [
		// MAC-Addresses for testing
		// TODO: remove this array when the app is up and running and make a separate list in the sensor.page view
		'E4:A2:16:63:D9:E1'
	];

	constructor(private sensor: Metawear) {
		console.log('sensor service initialized');
	}

	public connectDeviceByAddress(address: string): Metawear {
		this.sensor.discoverByAddress(address, device => {
			console.log('discovered ' + device.address);
			device.connectAndSetUp(device => {
				console.log('connected ' + device.address);
			}, error => {
				console.log(error);
			});
		});
	}

	public discoverAll() {
		this.sensor.discoverAll(this.onDiscover);
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
			this.sensor.stopDiscoverAll(this.onDiscover);
			// stream accelerometer for a short amount of time
			setTimeout(function() {
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
			this.sensor.mbl_mw_acc_set_range(device.board, 8.0);
			this.sensor.mbl_mw_acc_write_acceleration_config(device.board);
			var accSignal = this.sensor.mbl_mw_acc_get_acceleration_data_signal(device.board);
			this.sensor.mbl_mw_datasignal_subscribe(accSignal, null, this.sensor.FnVoid_VoidP_DataP.toPointer(function gotTimer(context, dataPtr) {
				var data = dataPtr.deref();
				var pt = data.parseValue();
				console.log(pt.x, pt.y, pt.z);
			}));
			this.sensor.mbl_mw_acc_enable_acceleration_sampling(device.board);
			this.sensor.mbl_mw_acc_start(device.board);

			// Stop after 5 seconds
			setTimeout(function () {
				// Stop the stream
				this.sensor.mbl_mw_acc_stop(device.board);
				this.sensor.mbl_mw_acc_disable_acceleration_sampling(device.board);
				this.sensor.mbl_mw_datasignal_unsubscribe(accSignal);
				this.sensor.mbl_mw_debug_disconnect(device.board);
			}, 5000);
		});
	}

}
