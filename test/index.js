const AsyncResolver = require('../index.js');
const assert = require('assert')

describe('AsyncResolver', () => {
    describe('itself', () => {
        it('should be a function', () => {
            assert.equal('function', typeof AsyncResolver)
        })
    })

    describe('instance of AsyncResolver', () => {
        it('should be an object', () => {
            const resolver = new AsyncResolver();
            assert.equal('object', typeof resolver)
        })

        it('should define publish and subscribe functions', () => {
            const resolver = new AsyncResolver();
            assert.equal('function', typeof resolver.publish)
            assert.equal('function', typeof resolver.subscribe)
        })
    })

    describe('publish function', () => {
        it('should resolve when no subscriber is attached', (done) => {
            const resolver = new AsyncResolver();
            resolver
                .publish('locationChange')
                .then(() => {
                    assert.equal(true, true);
                    done();
                })
                .catch(() => {
                    assert.equal(false, true);
                    done();
                });
        })

        describe('with ANY as promiseMethod', () => {
            it('should resolve when no subscribers attached', (done) => {
                const resolver = new AsyncResolver();
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(() => {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should resolve and when one of the subscribers resolves', (done) => {
                const resolver = new AsyncResolver();
                resolver.subscribe('locationChange', () => Promise.resolve());
                resolver.subscribe('locationChange', () => Promise.reject());
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(() => {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should reject and when none of the subscribers resolves', (done) => {
                const resolver = new AsyncResolver();
                resolver.subscribe('locationChange', () => Promise.reject());
                resolver.subscribe('locationChange', () => Promise.reject());
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'any'
                    })
                    .then(() => {
                        assert.equal(false, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(true, true);
                        done();
                    });
            })
        })

        describe('with ALL as promiseMethod', () => {
            it('should resolve and when no subscribers attached', (done) => {
                const resolver = new AsyncResolver();
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(() => {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should resolve and when all of the subscribers resolves', (done) => {
                const resolver = new AsyncResolver();
                resolver.subscribe('locationChange', () => Promise.resolve());
                resolver.subscribe('locationChange', () => Promise.resolve());
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(() => {
                        assert.equal(true, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(false, true);
                        done();
                    });
            })

            it('should reject and when one of the subscribers rejects', (done) => {
                const resolver = new AsyncResolver();
                resolver.subscribe('locationChange', () => Promise.resolve());
                resolver.subscribe('locationChange', () => Promise.reject());
                resolver
                    .publish('locationChange', {
                        promiseMethod: 'all'
                    })
                    .then(() => {
                        assert.equal(false, true);
                        done();
                    })
                    .catch(() => {
                        assert.equal(true, true);
                        done();
                    });
            })
        })
    })
})