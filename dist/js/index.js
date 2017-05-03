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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sky on 2017/3/17.
 */
var Calendar = exports.Calendar = function () {
    function Calendar(options) {
        _classCallCheck(this, Calendar);

        //默认参数
        var defaults = {
            initDate: new Date(),
            callback: function callback() {}
        };
        options = Object.assign({}, defaults, options);
        this.callback = options.callback;

        //获取日历页的盒子
        this.calendarbox = document.querySelector('#calendar');
        //获取放置日期的盒子
        this.calendardays = document.querySelector('.calendar-cont-days');
        //获取日历页下方加加减减的天数
        this.checkinDays = document.querySelector('.checkin-Days');
        //获取日历下方选择出来的入住日
        this.currday = document.querySelector('.currday');
        //获取加加天数
        this.addDay = document.querySelector('.addDay');
        //获取减减天数
        this.minuDay = document.querySelector('.minuDay');
        //获取首页晚数
        this.nights = document.querySelector('.nights');
        //获取首页晚数后面的离店日期
        this.checkOutTime = document.querySelector('.check-out-date-info');
        //获取当前日期
        var year = options.initDate.getFullYear();
        var month = options.initDate.getMonth() + 1;
        var curday = options.initDate.getDate();
        this.year = year;
        this.month = month;
        this.curday = curday;
        //调用渲染页面日历数据的函数
        this.render(year, month);
        //调用更新标题年月的函数
        this.updateTitle(year, month);
        //调用绑定事件的函数
        this.bindEvent();
    }

    //更新标题的年月


    _createClass(Calendar, [{
        key: 'updateTitle',
        value: function updateTitle(year, month) {
            //将现在的年月值赋值给标题
            this.calendarbox.querySelector('.calendar-nowdate').innerHTML = year + '年' + month + '月';
        }

        //获取每个月的天数

    }, {
        key: 'daysInOneMonth',
        value: function daysInOneMonth(year, month) {
            var d31 = [1, 3, 5, 7, 8, 10, 12];
            var d30 = [4, 6, 9, 11];
            var days = 31;
            month = month * 1;
            year = year * 1;
            if (month == 2) {
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                    days = 29;
                } else {
                    days = 28;
                }
            } else {
                if (d31.indexOf(month) > -1) {
                    days = 31;
                } else {
                    days = 30;
                }
            }
            return days;
        }

        //获取一个月第一天是星期几

    }, {
        key: 'startInOneMonth',
        value: function startInOneMonth(year, month) {
            //获取当前月的第一天
            var date = new Date(year + '/' + month + '/' + 1);
            //获取当前月的第一天是星期几
            return date.getDay();
        }

        //渲染上个月

    }, {
        key: 'renderPrevMonth',
        value: function renderPrevMonth(year, month) {
            //获取上个月
            var prevMonth = new Date(year + '/' + (month - 1));
            //获取上个月有多少天
            var prevMonthDays = this.daysInOneMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
            //获取上个月的第一天是星期几
            var leftDays = this.startInOneMonth(year, month);
            var str = '';
            leftDays -= 1;
            while (leftDays >= 0) {
                str += '<span class="calendar-day to-gray">' + (prevMonthDays - leftDays) + '</span>';
                leftDays--;
            }
            return str;
        }

        //渲染当前月

    }, {
        key: 'renderCurrentMonth',
        value: function renderCurrentMonth(year, month) {
            if (month == this.month) {
                var str = '',
                    start = 1;
                //获取当前月有多少天
                var days = this.daysInOneMonth(year, month);
                while (start <= days) {
                    if (start == this.curday) {
                        str += '<span class="calendar-day currentday">' + start + '</span>';
                    } else if (start < this.curday) {
                        str += '<span class="calendar-day graycolor">' + start + '</span>';
                    } else {
                        str += '<span class="calendar-day">' + start + '</span>';
                    }
                    start++;
                }
                return str;
            } else {
                var _str = '',
                    _start = 1;
                //获取当前月有多少天
                var _days = this.daysInOneMonth(year, month);
                while (_start <= _days) {
                    if (_start == 1) {
                        _str += '<span class="calendar-day currentday">' + _start + '</span>';
                    } else {
                        _str += '<span class="calendar-day">' + _start + '</span>';
                    }
                    _start++;
                }
                return _str;
            }
        }

        //渲染页面日历数据

    }, {
        key: 'render',
        value: function render(year, month) {
            //将上个月和当前月的日赋值给存放日的盒子
            this.calendardays.innerHTML = this.renderPrevMonth(year, month) + this.renderCurrentMonth(year, month);
            //将当前的日期赋值给下方的入住日
            document.querySelector('.currday').innerHTML = this.month + '月' + this.curday + '日';
        }

        //给日历页绑定事件

    }, {
        key: 'bindEvent',
        value: function bindEvent() {
            var _this = this;

            this.calendarbox.onclick = function (e) {
                var target = e.target;
                //点击页面左上角返回前一页
                if (target.classList.contains('back')) {
                    _this.hide();
                }
                //点击页面右上角完成返回前一页并传值到前一页
                if (target.classList.contains('finish')) {
                    _this.hide();
                }
                //将当前日期传入页面下方入住日
                if (target.classList.contains('currday')) {
                    _this.currday.innerHTML = _this.month + '月' + _this.curday + '日';
                }
                //点击日期时传值到前一页，给当前日期高亮且不可选日期不可点击
                _this.startDay = _this.curday;
                if (target.classList.contains('calendar-day') && !target.classList.contains('to-gray') && !target.classList.contains('graycolor')) {
                    _this.curday = target.innerHTML;
                    _this.endDate = new Date(_this.year, _this.month - 1, target.innerHTML * 1 + _this.nights.innerHTML * 1);
                    _this.checkOutTime.innerHTML = _this.endDate.getMonth() + 1 + '月' + _this.endDate.getDate() + '日';
                    _this.callback(_this.month, target.innerHTML, _this.endDate.getMonth() + 1, _this.endDate.getDate());
                    _this.srcElement.innerHTML = _this.month + '月' + target.innerHTML + '日';
                    document.querySelector('.currentday').classList.remove('currentday');
                    target.classList.add('currentday');
                }
                //点击上个月
                if (target.classList.contains('prev')) {
                    var date = new Date(_this.year, _this.month - 1 - 1);
                    var prevYear = date.getFullYear();
                    var prevMonth = date.getMonth() + 1;
                    _this.render(prevYear, prevMonth);
                    _this.year = prevYear;
                    _this.month = prevMonth;
                    _this.updateTitle(prevYear, prevMonth);
                }
                //点击下个月
                if (target.classList.contains('next')) {
                    var _date = new Date(_this.year, _this.month - 1 + 1);
                    var nextYear = _date.getFullYear();
                    var nextMonth = _date.getMonth() + 1;
                    _this.render(nextYear, nextMonth);
                    _this.year = nextYear;
                    _this.month = nextMonth;
                    _this.updateTitle(nextYear, nextMonth);
                }
                //点击+增加天数
                if (target.classList.contains('addDay')) {
                    _this.checkinDays.innerHTML++;
                    if (_this.checkinDays.innerHTML >= 5) {
                        _this.checkinDays.innerHTML = 5;
                    }
                    _this.fuzhi();
                }
                //点击-减去天数
                if (target.classList.contains('minuDay')) {
                    _this.checkinDays.innerHTML--;
                    if (_this.checkinDays.innerHTML <= 1) {
                        _this.checkinDays.innerHTML = 1;
                    }
                    _this.fuzhi();
                }
            };
        }

        //赋值

    }, {
        key: 'fuzhi',
        value: function fuzhi() {
            //将加加减减后的天数赋值给元素
            this.nights.innerHTML = this.checkinDays.innerHTML;
            this.endDate = new Date(this.year, this.month - 1, this.nights.innerHTML * 1 + this.startDay * 1);
            this.checkOutTime.innerHTML = this.endDate.getMonth() + 1 + '月' + this.endDate.getDate() + '日';
        }

        //日历页显示

    }, {
        key: 'show',
        value: function show(element) {
            this.srcElement = element;
            this.calendarbox.classList.add('calendar-active');
        }

        //日历页隐藏

    }, {
        key: 'hide',
        value: function hide() {
            this.calendarbox.classList.remove('calendar-active');
        }
    }]);

    return Calendar;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sky on 2017/3/15.
 */
var City = exports.City = function () {
    function City(options) {
        _classCallCheck(this, City);

        var defaults = {
            data: []
        };
        var opt = Object.assign({}, defaults, options);
        this.opt = opt;
        this.citiesAll = document.querySelector('#citiesAll');
        this.firstnameAll = this.citiesAll.querySelector(".city-firstname .city-firstname-list");
        this.nameall = document.querySelector(".city-nameall");
        this.topbtn = document.querySelector('.top');
        this.checkcity = document.querySelector('.checkcity');

        this.render(opt.data);
        this.collectCityHeight();
        this.bindEvent();
        this.toptoggle();
    }

    //��Ⱦ��ĸ�ͳ����б�


    _createClass(City, [{
        key: "render",
        value: function render(cityList) {
            var firstnameAll = this.firstnameAll;
            var nameall = this.nameall;
            var empty_str = '',
                city_str = '';
            cityList.forEach(function (val, ind) {
                empty_str += "<span alpha=\"" + val.alpha + "\">" + val.alpha + "</span>";
                city_str += "<div class=\"city-name\">\n                            <p class=\"city-name-line\" alpha=\"" + val.alpha + "\"><span>" + val.alpha + "</span></p>\n                            <ul class=\"city-name-list\">\n                                " + val.data.map(function (item, index) {
                    return "<li>" + item[0] + "</li>";
                }).join('') + "\n                            </ul>\n                        </div>";
            });
            firstnameAll.innerHTML = empty_str;
            nameall.innerHTML = city_str;
        }

        //������ĸ������Ӧ�����б�

    }, {
        key: "collectCityHeight",
        value: function collectCityHeight() {
            var alphaDom = document.querySelectorAll('[alpha]');
            var height_info = {};
            Array.from(alphaDom).forEach(function (dom, ind) {
                //console.log(dom);
                height_info[dom.getAttribute('alpha')] = dom.offsetTop;
            });
            //console.log(height_info);
            this.heightInfo = height_info;
        }

        //�¼�����

    }, {
        key: "bindEvent",
        value: function bindEvent() {
            var _this = this;

            this.citiesAll.addEventListener('click', function (e) {
                var target = e.target;
                if (target.tagName == 'SPAN') {
                    _this.citiesAll.scrollTop = _this.heightInfo[target.getAttribute('alpha')];
                }
                if (target.tagName == 'LI') {
                    _this.hide();
                    _this.topbtn.classList.add('top-active');
                    _this.opt.callback(target.innerHTML);
                    _this.checkcity.innerHTML = target.innerHTML;
                }
                if (target.tagName == 'SPAN' && target.classList.contains('back')) {
                    _this.hide();
                }
            }, false);
        }

        //�����������ض���

    }, {
        key: "toptoggle",
        value: function toptoggle() {
            var _this2 = this;

            var height = document.documentElement.clientHeight;

            this.citiesAll.onscroll = function () {
                var top = _this2.citiesAll.scrollTop;
                if (top > height) {
                    _this2.topbtn.classList.remove('top-active');
                } else {
                    _this2.topbtn.classList.add('top-active');
                }
                _this2.topbtn.onclick = function () {
                    _this2.topbtn.classList.add('top-transform');
                    _this2.citiesAll.scrollTop = 0;
                };
            };
        }

        //����ҳ��ʾ

    }, {
        key: "show",
        value: function show() {
            this.citiesAll.classList.add('cities-active');
            this.citiesAll.scrollTop = 0;
        }

        //����ҳ����

    }, {
        key: "hide",
        value: function hide() {
            this.citiesAll.classList.remove('cities-active');
        }
    }]);

    return City;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by sky on 2017/3/15.
 */
var HotCity = exports.HotCity = function () {
    function HotCity(options) {
        _classCallCheck(this, HotCity);

        var defaults = {
            data: []
        };
        var opt = Object.assign({}, defaults, options);
        this.hotList = document.querySelector(".city-hot .city-hot-list");
        this.render(opt.data);
    }

    _createClass(HotCity, [{
        key: "render",
        value: function render(hotcityList) {
            var hotList = this.hotList;
            var empty_str = '';
            hotcityList.forEach(function (val, ind) {
                empty_str += "<li>" + val.name + "</li>";
            });
            hotList.innerHTML = empty_str;
        }
    }]);

    return HotCity;
}();

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

var _city2 = __webpack_require__(2);

var _hotcity = __webpack_require__(3);

var _calendar = __webpack_require__(1);

/*-------------------------------首页轮播---------------------------------*/
/**
 * Created by sky on 2017/3/14.
 */
//引入模块
var _ref = [document.querySelector('.banner ul'), ''],
    banner = _ref[0],
    str = _ref[1];
//请求banner图片

(0, _utils.ajax)({
    url: "../../server/banner.json",
    callback: function callback(data) {
        //渲染banner结构
        data.forEach(function (item, index) {
            str += "<li class=\"swiper-slide\" style=\"background: url(" + item.url + ");background-size: 100% 100%\">\n            <a href=\"\" title=\"" + item.title + "\"></a></li>";
        });
        banner.innerHTML = str;
        //实例化swiper
        new Swiper(".banner", {
            autoplay: 1500,
            loop: true
        });
    }
});

/*----------------------------城市首字母和列表数据------------------------------*/
(0, _utils.ajax)({
    //渲染城市数据
    url: "../../server/cities.json",
    callback: function callback(data) {
        var checkIn = document.querySelector('.check-in-hotel');
        var checkincityinfo = document.querySelector('.check-in-city-info');
        //实例化城市组件
        var city_module = new _city2.City({
            data: data,
            callback: function callback(city) {
                //在组件的回调中处理选择的数据
                checkincityinfo.innerHTML = city;
            }
        });

        //显示城市组件，绑定事件
        checkIn.addEventListener('click', function () {
            //触发城市组件的显示
            city_module.show();
        }, false);
    }
});

/*---------------------------首页地理定位----------------------------*/
document.querySelector('.location').onclick = function (e) {
    e.stopPropagation();
    //实现定位功能
    var glt = navigator.geolocation;
    if (glt) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords);
            var coords = position.coords;
            (0, _utils.jsonp)('http://apis.map.qq.com/ws/geocoder/v1/?location=' + coords.latitude + ',' + coords.longitude + '&key=LFPBZ-3JLWW-OUQRV-R5Q2G-HYFVV-U5FQX&output=jsonp', function (data) {
                console.log(data);
            });
            alert(coords.latitude, coords.longitude);
        }, function (error) {
            switch (error.code) {
                case error.TIMEOUT:
                    console.log("A timeout occured! Please try again!");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.log('We can\'t detect your location. Sorry!');
                    break;
                case error.PERMISSION_DENIED:
                    console.log('Please allow geolocation access for this to work.');
                    break;
                case error.UNKNOWN_ERROR:
                    console.log('An unknown error occured!');
                    break;
            }
            //跨域请求腾讯地图api,通过ip获取地址信息
            (0, _utils.jsonp)('http://apis.map.qq.com/ws/location/v1/ip?key=LFPBZ-3JLWW-OUQRV-R5Q2G-HYFVV-U5FQX&output=jsonp', function (data) {
                console.log(data);
            });
        }, {
            // 指示浏览器获取高精度的位置，默认为false
            enableHighAccuracy: true,
            // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
            timeout: 5000,
            // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
            maximumAge: 3000
        });
    } else {
        alert("Your browser does not support Geolocation!");
    }
};

/*----------------------------热门城市数据------------------------------*/
(0, _utils.ajax)({
    //请求热门城市
    url: "../../server/hotcity.json",
    callback: function callback(data) {
        new _hotcity.HotCity({ data: data });
    }
});

/*-----------------------初始化首页的入住日和离店日-------------------------*/
//获取入住日和离开日一整行
var checkInTime = document.querySelector('.check-in-date');
var checkOutTime = document.querySelector('.check-out-date');
//获取入住日和离开日的span标签
var checkIninfo = document.querySelector('.check-in-date-info');
var checkOutinfo = document.querySelector('.check-out-date-info');
//获取当前日期
var checkin_data = new Date();
var cMonth = checkin_data.getMonth() + 1;
var cDay = checkin_data.getDate();
var cTime = checkin_data.getHours();
//如果当前时间超过下午四点则记录第二天
if (cTime >= 16) {
    checkin_data = new Date();
    cMonth = checkin_data.getMonth() + 1;
    cDay = checkin_data.getDate();
}
var checkout_date = new Date(cMonth + '/' + (cDay + 1));
var oMonth = checkout_date.getMonth() + 1;
var oDay = checkout_date.getDate();
//将日期值赋给入住日和离店日的span的标签
checkIninfo.innerHTML = cMonth + '月' + cDay + '日';
checkOutinfo.innerHTML += oMonth + '月' + oDay + '日';

/*----------------------------日历------------------------------*/
var currday = document.querySelector('.currday');

//实例化日历组件
var calendar = new _calendar.Calendar({
    initDate: new Date(),
    callback: function callback(m, d, endM, endD) {
        //赋值给日历下方的入住日
        currday.innerHTML = m + '月' + d + '日';
        //赋值给离店日的span标签
        checkOutinfo.innerHTML = endM + '月' + endD + '日';
    }
});

//给入住日dom元素绑定事件，触发日历组件
checkInTime.addEventListener('click', function () {
    //触发日历组件的显示
    calendar.show(checkIninfo);
}, false);
//给离开日dom元素绑定事件，触发日历组件
checkOutTime.addEventListener('click', function () {
    calendar.show(checkOutinfo);
}, false);

/*---------------------------搜索酒店----------------------------*/
document.querySelector('.search').onclick = function () {
    //获取入住城市
    var _city = document.querySelector('.check-in-city-info').innerHTML,

    //获取入住日和离店日的值
    _checkIn = checkIninfo.innerHTML,
        _checkOut = checkOutinfo.innerHTML,

    //获取酒店名称
    _hotel = document.querySelector('.hotel-name').value;
    //拼接字符串
    var str = '?city=' + _city + '&CheckInDate=' + _checkIn + '&CheckOutDate=' + _checkOut;
    //如果酒店名称有内容则将酒店名称也拼进字符串
    if (_hotel) {
        str += 'HotelName=' + _hotel;
    }
    //跳转页面
    window.location.href = 'hotellist.html' + str;
};

/***/ })
/******/ ]);