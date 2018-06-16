const Promise = require('bluebird');

let Resolver = function() {
	let channels = {};

	function getSubscribers(channel) {
		channels[channel] = channels[channel] || [];
		return channels[channel];
	}

	function setSubscriber(channel, callback) {
		getSubscribers(channel);
		channels[channel].push(callback);
	}

	return {
		publish: function(channel, config, data) {
			config = config || {
				promiseMethod: 'all'
			};
			let promises = [],
				channels = getSubscribers(channel);

			if(channels.length > 0) {
				for (var i = 0; i < channels.length; i++) {
					promises.push(channels[i](data));
				}
				return Promise[config.promiseMethod](promises);
			}
			return Promise.resolve();
		},
		subscribe: function(channel, callback) {
			setSubscriber(channel, callback);
		}
	}
}

module.exports = Resolver;