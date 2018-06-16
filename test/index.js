const AsyncResolver = require('../index.js');
const assert = require('assert')

describe('AsyncResolver', () => {
    describe('AsyncResolver', () => {
        it('should be a function', () => {
            assert.equal('function', typeof AsyncResolver)
        })
    })

    describe('instance of AsyncResolver', () => {
        it('should be an object', () => {
            var resolver = new AsyncResolver();
            assert.equal('object', typeof resolver)
        })

        it('should define publish and subscribe functions', () => {
            var resolver = new AsyncResolver();
            assert.equal('function', typeof resolver.publish)
            assert.equal('function', typeof resolver.subscribe)
        })
    })

    describe('publish function', () => {
        it('should resolve when no subscriber is attached', (done) => {
            var resolver = new AsyncResolver();
            resolver
                .publish('locationChange')
                .then(function() {
                    assert.equal(true, true);
                    done();
                })
                .catch(function() {
                    assert.equal(false, true);
                    done();
                });
        })

        describe('with ANY as promiseMethod', () => {
            it('should resolve when no subscribers attached', (done) => {
                var resolver = new AsyncResolver();
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(function() {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should resolve and when one of the subscribers resolves', (done) => {
                var resolver = new AsyncResolver();
                resolver.subscribe('locationChange', function() {
                    return Promise.resolve();
                });
                resolver.subscribe('locationChange', function() {
                    return Promise.reject();
                });
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(function() {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should reject and when none of the subscribers resolves', (done) => {
                var resolver = new AsyncResolver();
                resolver.subscribe('locationChange', function() {
                    return Promise.reject();
                });
                resolver.subscribe('locationChange', function() {
                    return Promise.reject();
                });
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(function() {
                        assert.equal(false, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(true, true);
                        done();
                    });
            })
        })

        describe('with ALL as promiseMethod', () => {
            it('should resolve and when no subscribers attached', (done) => {
                var resolver = new AsyncResolver();
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(function() {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should resolve and when all of the subscribers resolves', (done) => {
                var resolver = new AsyncResolver();
                resolver.subscribe('locationChange', function() {
                    return Promise.resolve();
                });
                resolver.subscribe('locationChange', function() {
                    return Promise.resolve();
                });
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(function() {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should reject and when one of the subscribers rejects', (done) => {
                var resolver = new AsyncResolver();
                resolver.subscribe('locationChange', function() {
                    return Promise.resolve();
                });
                resolver.subscribe('locationChange', function() {
                    return Promise.reject();
                });
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(function() {
                        assert.equal(false, true);
                        done();
                    })
                    .catch(function() {
                        assert.equal(true, true);
                        done();
                    });
            })
        })
    })
})