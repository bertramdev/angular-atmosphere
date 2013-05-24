'use strict';

function NoAtmospherePluginError(message) {
	this.prototype.name = 'NoAtmospherePluginError';
	this.message = (message || 'The Atmosphere plugin for jQuery was not found');
}

NoAtmospherePluginError.prototype = new Error();

angular.module('ngAtmosphere', [])
	.factory('atmosphere', [function () {

		if (!$.atmosphere) {
			throw new NoAtmospherePluginError();
		}

		var listeners = {};
		var listenerIndex = {};

		var connection;
		var request = new $.atmosphere.AtmosphereRequest();
		request.contentType = 'application/json';
		request.transport = 'websocket';
		request.fallbackTransport = 'long-polling';

		function handleResponse(response) {
			var data = angular.fromJson(response.responseBody);
			if (listeners.hasOwnProperty(data.event)) {
				angular.forEach(listeners[data.event], function (listener) {
					listener.fn.call(this, data);
				});
			}
		}

		// Public API here
		return {
			init: function (url) {
				request.url = url;
				
				connection = $.atmosphere.subscribe(request);
				connection.onMessage = handleResponse;
			},
			on: function (event, callbackFn) {

				var id = Math.random();
				
				if (!listeners.hasOwnProperty(event)) {
					listeners[event] = [];
				}
				listenerIndex[id] = event;
				listeners[event].push({id: id, fn: callbackFn});

				return id;
			},
			off: function (id) {
				var event = listenerIndex[id];
				var eventListeners = listeners[event];
				var removed = false;

				for (var i = 0; i < eventListeners.length; i++) {
					if (eventListeners[i].id === id) {
						eventListeners.splice(i, 1);
						delete listenerIndex[id];

						removed = true;
						break;
					}
				}

				return removed;
			},
			emit: function (event, data) {
				connection.push(angular.toJson({event: event, data: data}));
			}
		};
	}]);
