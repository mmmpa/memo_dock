var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var menu_1 = require("../components/menu");
var _ = require('lodash');
var MemoEdit = (function (_super) {
    __extends(MemoEdit, _super);
    function MemoEdit(props) {
        _super.call(this, props);
        if (this.props.memoData) {
            var _a = this.props.memoData, title = _a.title, src = _a.src, isPublic = _a.isPublic;
            this.state = {
                title: title,
                src: src,
                isPublic: isPublic
            };
        }
        else {
            this.state = {
                title: '',
                src: '',
                isPublic: false
            };
        }
    }
    MemoEdit.prototype.componentDidUpdate = function () {
        if (this.cm.getValue() != this.state.src) {
            this.cm.setValue(this.state.src || '');
        }
    };
    MemoEdit.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.cm = CodeMirror.fromTextArea(_this.refs.editor, {
                lineNumbers: true,
                mode: "slim",
                lineWrapping: true
            });
            _this.cm.on('change', _this.changeSrc.bind(_this));
            _this.cm.setSize('100%', '100%');
            _this.cm.setValue(_this.props.memoData.src || '');
        }, 1);
    };
    MemoEdit.prototype.changeSrc = function (e) {
        this.setState(_.merge(this.state, { src: e.doc.getValue() }));
    };
    MemoEdit.prototype.changeTitle = function (e) {
        this.setState(_.merge(this.state, { title: e.target.value }));
    };
    MemoEdit.prototype.changeTags = function (e) {
        this.setState(_.merge(this.state, { tags: e.target.value }));
    };
    MemoEdit.prototype.render = function () {
        var _a = this.state, title = _a.title, src = _a.src, tags = _a.tags;
        return (React.createElement("article", {"className": "memo-edit"}, React.createElement("link", {"href": "/css/codemirror.css", "rel": "stylesheet", "type": "text/css"}), React.createElement(menu_1.default, null), React.createElement("section", {"className": "memo-edit edit-container"}, React.createElement("section", {"className": "memo-edit title"}, React.createElement("input", {"type": "text", "value": title, "onChange": this.changeTitle.bind(this)})), React.createElement("section", {"className": "memo-edit tags"}, React.createElement("input", {"type": "text", "value": tags, "onChange": this.changeTags.bind(this)})), React.createElement("section", {"className": "memo-edit content"}, React.createElement("section", {"className": "memo-edit src"}, React.createElement("textarea", {"ref": "editor"})), React.createElement("section", {"className": "memo-edit html"}, React.createElement("div", {"className": "memo-edit html-container"}))))));
    };
    return MemoEdit;
})(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MemoEdit;
//# sourceMappingURL=memo-edit.js.map