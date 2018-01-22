'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _util = require('../_util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = _setPrototypeOf2.default || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? (0, _create2.default)(b) : (__.prototype = b.prototype, new __());
    };
}();

var default_1 = /** @class */function (_super) {
    __extends(default_1, _super);
    function default_1(props) {
        var _this = _super.call(this, props) || this;
        _this.pageNum = 20;
        _this.defaultCls = 'pilipa-dropdown';
        _this.handleAllData(_this.props.data);
        _this.state = {
            page: 1,
            visible: false,
            title: _this.props.title || '',
            data: _this.allData.slice(0, _this.pageNum),
            dataTmp: _this.allData
        };
        return _this;
    }
    default_1.prototype.componentWillReceiveProps = function (props) {
        if (props.data) {
            this.handleAllData(props.data);
            this.setState({
                data: this.allData.slice(0, this.pageNum),
                dataTmp: this.allData
            });
        }
    };
    default_1.prototype.componentDidMount = function () {
        var _this = this;
        var button = this.refs.button;
        (0, _jquery2.default)(button).hover(function () {
            _this.handleEnter();
        }, function (e) {
            _this.handleLeave();
        });
    };
    default_1.prototype.handleAllData = function (data) {
        var _this = this;
        var _a = this.props.setFields || { key: '', title: '' },
            key = _a.key,
            title = _a.title;
        data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data);
        this.allData = [];
        data.map(function (item, index) {
            var newItem = {
                key: item[key || 'key'],
                title: item[title || 'title'],
                capital: (0, _util.getCapital)(item[title || 'title']) || ['']
            };
            _this.allData[index] = newItem;
        });
    };
    default_1.prototype.handleEnter = function () {
        var _this = this;
        if (this.t) {
            clearTimeout(this.t);
        }
        var results = this.refs.results;
        if (results) {
            (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
            (0, _jquery2.default)(results).one('mouseover', function () {
                if (_this.t) {
                    clearTimeout(_this.t);
                }
            });
            (0, _jquery2.default)(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            return;
        }
        this.setState({
            visible: true
        }, function () {
            results = _this.refs.results;
            (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
            (0, _jquery2.default)(results).addClass('custom-slide-up-enter');
            _this.t = setTimeout(function () {
                (0, _jquery2.default)(results).removeClass('custom-slide-up-enter');
            }, 200);
            (0, _jquery2.default)(results).one('mouseover', function () {
                clearTimeout(_this.t);
            });
            (0, _jquery2.default)(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            (0, _jquery2.default)(results).children('.items').scroll(function (e) {
                var scrollTop = e.target.scrollTop;
                var h = (0, _jquery2.default)(results).find('ul').height();
                var ch = e.target.clientHeight;
                if (scrollTop + ch > h - 10) {
                    if (_this.state.page < Math.ceil(_this.state.dataTmp.length / _this.pageNum)) {
                        _this.setState({
                            page: _this.state.page + 1,
                            data: _this.state.dataTmp.slice(0, _this.pageNum * (_this.state.page + 1))
                        });
                    }
                }
            });
        });
    };
    default_1.prototype.handleLeave = function () {
        var _this = this;
        if (this.t) {
            clearTimeout(this.t);
        }
        var _a = this.refs,
            button = _a.button,
            results = _a.results;
        this.t = setTimeout(function () {
            (0, _jquery2.default)(results).addClass('custom-slide-up-leave');
            _this.t = setTimeout(function () {
                (0, _jquery2.default)(results).removeClass('custom-slide-up-leave');
                (0, _jquery2.default)(results).addClass('hidden');
                _this.setState({
                    visible: false,
                    page: 1,
                    data: _this.allData.slice(0, _this.pageNum),
                    dataTmp: _this.allData
                });
            }, 200);
        }, 100);
    };
    default_1.prototype.handleClick = function (item) {
        this.handleLeave();
        var callBack = this.props.callBack;
        this.setState({
            title: item.title
        });
        if (callBack) {
            setTimeout(function () {
                callBack(item);
            }, 301);
        }
    };
    default_1.prototype.handleChange = function () {
        var allData = this.allData;
        var value = (0, _jquery2.default)(this.refs.input).val().toString();
        var pattern = new RegExp(value, 'i');
        var res = allData.filter(function (item) {
            if (pattern.test(item.title) || pattern.test(item.capital.join(','))) {
                return true;
            }
        });
        this.setState({
            data: res.slice(0, this.pageNum),
            dataTmp: res
        });
    };
    default_1.prototype.render = function () {
        var _this = this;
        var _a = this.props,
            className = _a.className,
            style = _a.style,
            filter = _a.filter;
        var _b = this.state,
            visible = _b.visible,
            data = _b.data;
        var title = this.state.title;
        title = title || this.allData.length && this.allData[0].title || '';
        return _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)(this.defaultCls, className), style: style },
            _react2.default.createElement(
                'div',
                { className: 'costom-btn-group', ref: 'button' },
                _react2.default.createElement(
                    'div',
                    { className: 'btn-left' },
                    _react2.default.createElement(
                        'span',
                        { title: title },
                        title
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'btn-right' },
                    _react2.default.createElement('i', { className: 'fa fa-chevron-down', 'aria-hidden': 'true' })
                )
            ),
            visible && _react2.default.createElement(
                'div',
                { className: 'results', ref: 'results' },
                filter && _react2.default.createElement('input', { className: 'input', onChange: this.handleChange.bind(this), ref: 'input' }),
                data.length === 0 && _react2.default.createElement(
                    'p',
                    null,
                    '\u672A\u641C\u5230\u7ED3\u679C'
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'items' },
                    _react2.default.createElement(
                        'ul',
                        null,
                        data.length > 0 && data.map(function (item, key) {
                            return _react2.default.createElement(
                                'li',
                                { key: key, title: item.title, onClick: _this.handleClick.bind(_this, item) },
                                item.title
                            );
                        })
                    )
                )
            )
        );
    };
    return default_1;
}(_react2.default.Component);
exports.default = default_1;