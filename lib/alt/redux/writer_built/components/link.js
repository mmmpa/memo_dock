var React = require('react');
var react_router_1 = require('react-router');
function createIndexLink(children) {
    return React.createElement(react_router_1.Link, {"to": "/w/memos/"}, children);
}
exports.createIndexLink = createIndexLink;
function createNewMemoLink(children) {
    return React.createElement(react_router_1.Link, {"to": "/w/memos/new"}, children);
}
exports.createNewMemoLink = createNewMemoLink;
//# sourceMappingURL=link.js.map