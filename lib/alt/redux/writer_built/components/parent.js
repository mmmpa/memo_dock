var React = require('react');
exports.shared = { emitter: React.PropTypes.object };
var EventerParent = (function () {
    function EventerParent() {
    }
    Object.defineProperty(EventerParent, "childContextTypes", {
        get: function () {
            return exports.shared;
        },
        enumerable: true,
        configurable: true
    });
    ;
    EventerParent.prototype.getChildContext = function () {
        return { emitter: this.emitter };
    };
    return EventerParent;
})();
exports.EventerParent = EventerParent;
var EventerChild = (function () {
    function EventerChild() {
    }
    Object.defineProperty(EventerChild, "contextTypes", {
        get: function () {
            return exports.shared;
        },
        enumerable: true,
        configurable: true
    });
    EventerChild.prototype.dispatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return (_a = this.context.emitter).emit.apply(_a, args);
        var _a;
    };
    return EventerChild;
})();
exports.EventerChild = EventerChild;
//# sourceMappingURL=parent.js.map