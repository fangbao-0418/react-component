var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import ClassNames from 'classnames';
import $ from 'jquery';
import React from 'react';
import { getCapital } from '../_util';
var default_1 = /** @class */ (function (_super) {
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
        $(button).hover(function () {
            _this.handleEnter();
        }, function (e) {
            _this.handleLeave();
        });
    };
    default_1.prototype.handleAllData = function (data) {
        var _this = this;
        var _a = this.props.setFields || { key: '', title: '' }, key = _a.key, title = _a.title;
        data = this.props.prePend === undefined ? data : [this.props.prePend].concat(data);
        this.allData = [];
        data.map(function (item, index) {
            var newItem = {
                key: item[key || 'key'],
                title: item[title || 'title'],
                capital: getCapital(item[title || 'title']) || ['']
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
            $(results).removeClass('custom-slide-up-leave');
            $(results).one('mouseover', function () {
                if (_this.t) {
                    clearTimeout(_this.t);
                }
            });
            $(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            return;
        }
        this.setState({
            visible: true
        }, function () {
            results = _this.refs.results;
            $(results).removeClass('custom-slide-up-leave');
            $(results).addClass('custom-slide-up-enter');
            _this.t = setTimeout(function () {
                $(results).removeClass('custom-slide-up-enter');
            }, 200);
            $(results).one('mouseover', function () {
                clearTimeout(_this.t);
            });
            $(results).one('mouseleave', function () {
                _this.handleLeave();
            });
            $(results).children('.items').scroll(function (e) {
                var scrollTop = e.target.scrollTop;
                var h = $(results).find('ul').height();
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
        var _a = this.refs, button = _a.button, results = _a.results;
        this.t = setTimeout(function () {
            $(results).addClass('custom-slide-up-leave');
            _this.t = setTimeout(function () {
                $(results).removeClass('custom-slide-up-leave');
                $(results).addClass('hidden');
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
        var value = $(this.refs.input).val().toString();
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
        var _a = this.props, className = _a.className, style = _a.style, filter = _a.filter;
        var _b = this.state, visible = _b.visible, data = _b.data;
        var title = this.state.title;
        title = title || this.allData.length && this.allData[0].title || '';
        return (<div className={ClassNames(this.defaultCls, className)} style={style}>
        <div className='costom-btn-group' ref='button'>
          <div className='btn-left'><span title={title}>{title}</span></div>
          <div className='btn-right'>
            <i className='fa fa-chevron-down' aria-hidden='true'></i>
          </div>
        </div>
        {visible && <div className='results' ref='results'>
          {filter && <input className='input' onChange={this.handleChange.bind(this)} ref='input'/>}
          {data.length === 0 && <p>未搜到结果</p>}
          <div className='items'>
            <ul>
              {data.length > 0 && data.map(function (item, key) {
            return (<li key={key} title={item.title} onClick={_this.handleClick.bind(_this, item)}>{item.title}</li>);
        })}
            </ul>
          </div>
        </div>}
      </div>);
    };
    return default_1;
}(React.Component));
export default default_1;
