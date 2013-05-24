'use strict';

describe('Service: atmosphere', function () {

	// load the service's module
	beforeEach(module('ngAtmosphere'));

	// instantiate service
	var atmosphere;
	beforeEach(inject(function (_atmosphere_) {
		atmosphere = _atmosphere_;
		atmosphere.init('test');
	}));
	
	it('should add a function to the listeners object and return an id', function () {
		var fn = jasmine.createSpy('testresponse');
		var key = atmosphere.on('test',fn);

		atmosphere.emit('test','test');
		
		expect(key).toBeDefined();
		expect(fn).toHaveBeenCalled();
	});

	it('it should remove a function from the listeners object given an id', function () {
		var fn = jasmine.createSpy('testresponse');
		var key = atmosphere.on('test');

		atmosphere.off(key);

		atmosphere.emit('test','test');

		expect(key).toBeDefined();
		expect(fn).not.toHaveBeenCalled();
		//figure out how to check to see if the function was added
	});

	it('should call all the functions for a given event on a response', function () {
		var fn = jasmine.createSpy('testresponse');
		var fn2 = jasmine.createSpy('testresponse2');

		var key = atmosphere.on('test',fn);
		var key2 = atmosphere.on('test',fn2);

		atmosphere.emit('test','test');

		expect(key).toBeDefined();
		expect(key2).toBeDefined();
		
		expect(fn).toHaveBeenCalled();
		expect(fn2).toHaveBeenCalled();
	});

});
