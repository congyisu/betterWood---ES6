/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by sky on 2017/3/14.
 */
//封装一个ajax请求
function ajax(options) {
    var defaults = {
        type: 'get',
        url: '',
        params: null,
        callback: function callback() {}
    };
    var obj = Object.assign({}, defaults, options);

    var xhr = new XMLHttpRequest();
    if (obj.type == "get" && obj.params) {
        var param_str = '';
        for (var i in obj.params) {
            param_str += i + '=' + obj.params[i];
        }
        xhr.open(obj.type, obj.url + param_str, true);
        xhr.send();
    } else {
        xhr.open(obj.type, obj.url, true);
        xhr.send(obj.params);
    }
    xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
            obj.callback(JSON.parse(xhr.responseText));
        }
    };
}

//封装一个jsonp跨域请求
function jsonp(url, callback) {
    window.jsonp_callback = function (data) {
        callback(data);
    };
    var s = document.createElement('script');
    s.src = url + "&callback=jsonp_callback";
    document.querySelector('body').appendChild(s);
}

//封装一个从地址栏取参的函数
function getUrlParams(str) {
    if (!location.search) return;
    var tmp = decodeURIComponent(location.search).split('?')[1];
    var arr = tmp.split('&');
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var res = arr[i].split('=');
        obj[res[0]] = res[1];
    }
    return str ? obj[str] : obj;
}

//封装一个动画模拟加载
var loadingAnimate = function loadingAnimate() {
    var tpl = '<div class="loading">\n                    <div class="circle-wrap">\n                        <div class="circle circle-index1"></div>\n                        <div class="circle circle-index2"></div>\n                        <div class="circle circle-index3"></div>\n                        <div class="circle circle-index4"></div>\n                        <div class="circle circle-index5"></div>\n                        <div class="circle circle-index6"></div>\n                        <div class="circle circle-index7"></div>\n                        <div class="circle circle-index8"></div>\n                    </div>\n                </div>';
    var load = document.createElement('div');
    load.className = 'loading';
    load.innerHTML = tpl;

    this.startLoading = function (container) {
        var parentDom = void 0;
        if (typeof container == 'string') {
            parentDom = document.querySelector(container);
        } else if ((typeof container === 'undefined' ? 'undefined' : _typeof(container)) == 'object') {
            parentDom = container;
        } else {
            parentDom = document.querySelector('.hotellistBox');
        }
        this.parentDom = parentDom;
        parentDom.appendChild(load);
    };
    this.stopLoading = function () {
        this.parentDom.removeChild(load);
    };
};
var loading = new loadingAnimate();

//封装一个获取元素的函数
var element = function element(cls) {
    var ele = document.querySelectorAll(cls);
    if (!Node.prototype.bind) {
        Node.prototype.bind = function (event, ele, callback) {
            this.addEventListener('click', function (e) {
                if (e.target.tagName.toLowerCase() == ele) {
                    callback(e, ele);
                }
            }, false);
        };
    }
    if (!NodeList.prototype.bind) {
        NodeList.prototype.bind = function (event, ele, callback) {
            this.forEach(function (ele, index) {
                ele.addEventListener('click', function () {
                    callback(ele, index);
                }, false);
            });
        };
    }

    if (ele.length == 1) {
        return ele[0];
    } else {
        return ele;
    }
};

//抛出
exports.ajax = ajax;
exports.jsonp = jsonp;
exports.getUrlParams = getUrlParams;
exports.loading = loading;
exports.element = element;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Created by sky on 2017/3/30.
 */
var SlideSelector = function SlideSelector() {};
SlideSelector.prototype = {
    tpl: function tpl(title, list) {
        return '<div class="slide-wrapper">\n                <div class="header">\n                    <span class="cancel">\u53D6\u6D88</span>\n                    <span class="title">' + title + '</span>\n                    <span class="done">\u786E\u5B9A</span>\n                </div>\n                <div class="slide-items">\n                    <ul>\n                        ' + list.map(function (value, index) {
            return '<li class="slide-item">' + value + '</li>';
        }).join('') + '\n                    </ul>\n                </div>\n            </div>';
    },
    init: function init() {
        var defaults = {
            container: document.body,
            list: [1, 2, 3],
            title: '选择数据'
        };
        var options = this.options;
        options = Object.assign({}, defaults, options);
        this.container = typeof options.container == 'string' ? document.querySelector(options.container) : options.container;
        this.options = options;
        var slideContainer = this.container.querySelector('.slide-selector');
        if (slideContainer) {
            this.slideContainer = slideContainer;
        } else {
            var _slideContainer = document.createElement('div');
            _slideContainer.className = 'slide-selector none';
            this.container.appendChild(_slideContainer);
            this.slideContainer = _slideContainer;
        }
    },
    render: function render() {
        var opt = this.options;
        this.slideContainer.innerHTML = this.tpl(opt.title, opt.list);
    },
    bindEvent: function bindEvent() {
        var _this = this;

        this.cancel.addEventListener('click', function () {
            _this.hide();
        }, false);
        this.done.addEventListener('click', function () {
            _this.selected_value && _this.options.callback(_this.selected_value);
            _this.hide();
        }, false);
        this.wrap.addEventListener(this.transEnd, function () {
            //animationEnd
            if (_this.onhide) {
                _this.remove();
            }
        }, false);
        var slide_item = this.wrap.querySelectorAll('.slide-item');
        this.wrap.querySelector('.slide-items').addEventListener('click', function (e) {
            var target = e.target;
            if (target.tagName == 'LI') {
                for (var i = 0; i < slide_item.length; i++) {
                    slide_item[i].classList.remove('slide-selected');
                }
                target.classList.add('slide-selected');
                _this.selected_value = target.innerHTML;
            }
        }, false);
    },
    transEnd: function () {
        var bs = document.createElement('bootstrap');
        var transitions = {
            'WebkitTransform': 'webkitTransitionEnd',
            'OTransform': 'oTransitionEnd',
            'MozTransform': 'TransitionEnd',
            'MsTransform': 'msTransitionEnd',
            'transform': 'transitionEnd'
        };
        for (var k in transitions) {
            if (bs.style[k] != undefined) {
                return transitions[k];
            }
        }
    }(),
    show: function show(options) {
        this.options = options;
        //根据show传进来的配置进行后续操作
        this.init();
        this.render();
        this.slideContainer.classList.remove('none');
        this.selected_value = null;
        var wrap = this.slideContainer.querySelector('.slide-wrapper');
        this.cancel = wrap.querySelector('.cancel');
        this.done = wrap.querySelector('.done');
        this.wrap = wrap;
        setTimeout(function () {
            wrap.classList.add('slide-wrapper-show');
        }, 10);
        this.bindEvent();
    },
    hide: function hide() {
        this.onhide = true;
        this.wrap.classList.remove('slide-wrapper-show');
    },
    remove: function remove() {
        this.slideContainer.classList.add('none');
        this.onhide = false;
    }
};

exports.SlideSelector = SlideSelector;

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

var _slideSelector = __webpack_require__(4);

/*------------------------订单填写页------------------------------*/
//获取订单填写页的大盒子
/**
 * Created by sky on 2017/3/26.
 */
var writeorder = document.querySelector('.writeorder');
//获取遮罩层
var ordermask = document.querySelector('.ordermask');
//获取返回按钮
var goback = document.querySelector('.goback');
//获取提交订单按钮
var ordercheckbtn = document.querySelector('.ordercheckbtn');
//获取担保交易页的大盒子
var securedtransaction = document.querySelector('.secured-transaction');
//给订单填写页绑定事件
writeorder.addEventListener('click', function (e) {
    var target = e.target;
    //点击返回按钮的时候，遮罩层显示
    if (target.classList.contains('goback')) {
        ordermask.classList.add('show');
    }
    //如果点击是，则跳转回详情页
    if (target.classList.contains('yes')) {
        window.location.href = 'hoteldetail.html';
    }
    //如果点击否，则遮罩层消失，页面不变
    if (target.classList.contains('no')) {
        ordermask.classList.remove('show');
    }
    //点击提交订单按钮，显示担保交易页面
    if (target.classList.contains('ordercheckbtn')) {
        securedtransaction.classList.add('secured-transaction-active');
    }
});
//实例化封装的选择的函数
var selector = new _slideSelector.SlideSelector();
(0, _utils.element)('.room-count').addEventListener('click', function () {
    var ele = this.querySelector('.rightNum');
    selector.show({
        list: [1, 2, 3, 4, 5, 6],
        callback: function callback(data) {
            ele.innerHTML = data;
            var info_list = (0, _utils.element)('.fill-order-info-box');
            var str = '';
            for (var i = 0; i < data * 1; i++) {
                str += '<div class="fill-order-info">\n                            <p>\n                                <span class="left">\u59D3\u540D</span>\n                                <span class="right"><input type="text" /></span>\n                            </p>\n                            <p>\n                                <span class="left">\u8BC1\u4EF6</span>\n                                <span class="right"><input type="number" /></span>\n                            </p>\n                       </div>';
            }
            info_list.innerHTML = str;
        }
    });
});
(0, _utils.element)('.check-in-time').onclick = function () {
    var ele = this.querySelector('.rightTime');
    selector.show({
        list: ['16:00以前', '17:00以前', '18:00以前', '19:00以前', '20:00以前', '21:00以前', '22:00以前', '23:00以前'],
        callback: function callback(data) {
            ele.innerHTML = data;
        }
    });
};

/*------------------------担保交易页------------------------------*/
//获取担保交易页左上角的返回按钮
var backwriteorder = document.querySelector('.backwriteorder');
//获取预订成功页面
var orderfinish = document.querySelector('.orderfinish');
//给担保交易的盒子绑定事件
securedtransaction.addEventListener('click', function (e) {
    var target = e.target;
    //点击担保交易页左上角的返回按钮返回上一页
    if (target.classList.contains('backwriteorder')) {
        securedtransaction.classList.remove('secured-transaction-active');
    }
    //点击担保交易页上的确认担保按钮，让预订成功页面显示出来
    if (target.classList.contains('onfirmation-guarantee')) {
        orderfinish.classList.add('orderfinish-active');
    }
});
//点击选择更改内容
(0, _utils.element)('.IDcard-bank').onclick = function () {
    var ele = this.querySelector('.banks');
    selector.show({
        list: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '中国光大银行', '华夏银行', '中国民生银行', '招商银行', '交通银行'],
        callback: function callback(data) {
            ele.innerHTML = data;
        }
    });
};
(0, _utils.element)('.IDcard-class').onclick = function () {
    var ele = this.querySelector('.idcards');
    selector.show({
        list: ['身份证', '护照', '港澳台胞通行证', '军官证', '士兵证'],
        callback: function callback(data) {
            ele.innerHTML = data;
        }
    });
};

/*------------------------预订成功页------------------------------*/
//点击返回酒店按钮返回项目首页
document.querySelector('.backIndex').onclick = function () {
    window.location.href = 'index.html';
};

/***/ })
/******/ ]);