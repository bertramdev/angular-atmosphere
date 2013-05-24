var $ = $ || {};
$.atmosphere = {
	AtmosphereRequest: function () {

	},
	subscribe: function () {
		return {
			onError : function(response) {
			},
			onClose : function(response) {
			},
			onOpen : function(response) {
			},
			onMessage : function(response) {
			},
			onReconnect : function(request, response) {
			},
			onMessagePublished : function(response) {
			},
			onTransportFailure : function (reason, request) {
			},
			onLocalMessage : function (response) {
			},
			push: function(data){
				this.onMessage({responseBody:data});
			}
		}
	}
}