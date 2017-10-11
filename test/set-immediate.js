define(['src/promise', 'src/set-immediate'], function (Promise, setImmediate) {
    describe('setImmediate', function () {
        var immediate = setImmediate.impl;
        [{
            name: 'w3c-comformant browser',
            setImmediate: window.setTimeout
        }, {
            name: 'browsers support MessageChannel',
            MessageChannel: window.MessageChannel
        }, {
            name: 'browsers support postMessage',
            addEventListener: window.addEventListener.bind(window),
            removeEventListener: window.removeEventListener.bind(window),
            postMessage: window.postMessage.bind(window)
        }, {
            name: 'other browsers',
            setTimeout: window.setTimeout
        }]
    .forEach(function (item) {
        it('should work for ' + item.name, function (done) {
            var spy = sinon.spy();
            immediate(item, spy);
            setTimeout(function () {
                expect(spy).to.have.been.calledOnce;
                done();
            }, 100);
        });
        it('should support multiple calls for ' + item.name, function (done) {
            var spy = sinon.spy();
            immediate(item, spy);
            immediate(item, spy);
            setTimeout(function () {
                expect(spy).to.have.been.calledTwice;
                done();
            }, 100);
        });
    });
    });
});
