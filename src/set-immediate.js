define(function () {
    var MSG = 'setImmediate polyfill';
    var isBaidu = /baiduboxapp/.test(window.navigator.userAgent);

    function useImmediate (global, cb) {
        var setImmediate = global.setImmediate;
        setImmediate(cb);
    }
    function useTimeout (global, cb) {
        var setImmediate = global.setTimeout;
        setImmediate(cb);
    }
    function useMessageChannel (global, cb) {
        var channel = new global.MessageChannel();
        channel.port1.onmessage = function () {
            cb();
        };
        channel.port2.postMessage(MSG);
    }
    function usePostMessage (global, cb) {
        global.addEventListener('message', function messageHandler () {
            global.removeEventListener('message', messageHandler, false);
            cb();
        }, false);
        global.postMessage(MSG, '*');
    }

    function immediate (global, cb) {
        if (isBaidu) {
            useTimeout(global, cb);
        // W3C conformant browsers, e.g. FireFox
        } else if (global.setImmediate) {
            useImmediate(global, cb);
        // Chrome, Safari, Workers
        } else if (global.MessageChannel) {
            useMessageChannel(global, cb);
        // non-IE8
        } else if (global.addEventListener && global.postMessage) {
            usePostMessage(global, cb);
        // Rest old browsers, IE8 goes here
        } else {
            useTimeout(global, cb);
        }
    }

    function getGlobal () {
        if (typeof window !== 'undefined') {
            return window;
        }

        if (typeof self !== 'undefined') {
            // eslint-disable-next-line
            return self
        }
        // eslint-disable-next-line
        return Function('return this')();
    }

    function exports (cb) {
        var global = getGlobal();
        immediate(global, cb);
    }
    exports.impl = immediate;

    return exports;
});
