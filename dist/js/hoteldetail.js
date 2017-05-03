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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(0);

//点击左上角，返回index页
document.querySelector('.backs').onclick = function () {
    window.location.href = 'hotellist.html';
};

//点击查看图集，显示遮罩层，出现图集轮播
/**
 * Created by sky on 2017/3/25.
 */
var checkImg = document.querySelector('.check-all-img'); //获取查看图集
var allImg = document.querySelector('.all-img'); //获取遮罩层
var imgWrap = document.querySelector('.all-img-wrap'); //获取放图片的盒子
checkImg.onclick = function () {
    allImg.classList.remove('none');
    if (imgWrap.querySelector('ul')) return;
    _utils.loading.startLoading(imgWrap);
    (0, _utils.ajax)({
        url: "../../server/banner.json",
        callback: function callback(data) {
            _utils.loading.stopLoading();
            var str = '';
            data.forEach(function (value, index) {
                str += '<li class="swiper-slide"><img src="' + value.url + '"/></li>';
            });
            imgWrap.innerHTML = '<ul class="swiper-wrapper">' + str + '</ul>';
            setTimeout(function () {
                new Swiper(imgWrap, {
                    autoplay: 1500,
                    loop: true
                });
            }, 10);
        }
    });
};
allImg.onclick = function () {
    allImg.classList.add('none');
};

//渲染酒店数据
var detailboxinfocont = document.querySelector('.detailbox-info-cont');
var contTit = detailboxinfocont.querySelector('.contTit');
var contRank = detailboxinfocont.querySelector('.contRank');
var contTel = detailboxinfocont.querySelector('.contTel');
var contAddr = detailboxinfocont.querySelector('.contAddr');
var hotelCont = document.querySelector('.hotelCont');
(0, _utils.ajax)({
    url: "../../server/hotel.json",
    callback: function callback(data) {
        var dataList = data.data;
        dataList.forEach(function (val, ind) {
            var id = (0, _utils.getUrlParams)('id');
            if (ind + 1 == id) {
                contTit.innerHTML = val.name;
                contRank.innerHTML = val.rank;
                contTel.innerHTML = val.tel;
                contAddr.innerHTML = val.addr;
                hotelCont.innerHTML = val.hotel_introduction;
            }
        });
    }
});

//点击基本信息和酒店介绍切换内容
var detailboxinfotit = document.querySelector('.detailbox-info-tit');
var detailboxinfotitA = detailboxinfotit.querySelectorAll('a');
var infocont = document.querySelector('.infocont');
detailboxinfotit.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName == 'A') {
        //标题切换
        for (var i = 0; i < detailboxinfotitA.length; i++) {
            if (target.classList.contains('oInfo')) {
                detailboxinfotitA[i].classList.remove('oInf');
            } else {
                detailboxinfotitA[i].classList.add('oInf');
            }
        }
        //内容切换
        infocont.style.transform = 'translateX(' + -(target.getAttribute('index') * 50) + '%)';
    }
}, false);

//点击预订，遮罩层显示
var detailmask = document.querySelector('.detailmask');
var hotelorder = document.querySelector('.detailbox-room-info');
var maskdelete = document.querySelector('.maskdelete');
var ordernow = document.querySelector('.ordernow');
hotelorder.addEventListener('click', function (e) {
    var target = e.target;
    if (target.classList.contains('order')) {
        detailmask.classList.add('show');
    }
});
//点击遮罩层上面的关闭按钮，关闭遮罩层
maskdelete.onclick = function () {
    detailmask.classList.remove('show');
};
//点击预订进入下一页面
ordernow.onclick = function () {
    window.location.href = 'hotelorder.html';
};

/***/ })

/******/ });