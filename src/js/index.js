/**
 * Created by sky on 2017/3/14.
 */
//引入模块
import { ajax ,jsonp} from "./utils";
import {City} from "../component/city";
import {HotCity} from "../component/hotcity";
import {Calendar} from "../component/calendar";

/*-------------------------------首页轮播---------------------------------*/
let [banner,str] = [document.querySelector('.banner ul'), ''];
//请求banner图片
ajax({
    url: "../../server/banner.json",
    callback: function (data) {
        //渲染banner结构
        data.forEach((item, index)=> {
            str += `<li class="swiper-slide" style="background: url(${item.url});background-size: 100% 100%">
            <a href="" title="${item.title}"></a></li>`
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
ajax({
    //渲染城市数据
    url: "../../server/cities.json",
    callback: function (data) {
        let checkIn = document.querySelector('.check-in-hotel');
        let checkincityinfo = document.querySelector('.check-in-city-info');
        //实例化城市组件
        let city_module = new City({
            data: data,
            callback: function (city) {
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
    let glt = navigator.geolocation;
    if (glt) {
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords);
            let coords = position.coords;
            jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location=' + coords.latitude + ',' + coords.longitude + '&key=LFPBZ-3JLWW-OUQRV-R5Q2G-HYFVV-U5FQX&output=jsonp', function (data) {
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
            jsonp('http://apis.map.qq.com/ws/location/v1/ip?key=LFPBZ-3JLWW-OUQRV-R5Q2G-HYFVV-U5FQX&output=jsonp', function (data) {
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
ajax({
    //请求热门城市
    url: "../../server/hotcity.json",
    callback: function (data) {
        new HotCity({data: data});
    }
});

/*-----------------------初始化首页的入住日和离店日-------------------------*/
//获取入住日和离开日一整行
let checkInTime = document.querySelector('.check-in-date');
let checkOutTime = document.querySelector('.check-out-date');
//获取入住日和离开日的span标签
let checkIninfo = document.querySelector('.check-in-date-info');
let checkOutinfo = document.querySelector('.check-out-date-info');
//获取当前日期
let checkin_data = new Date();
let cMonth = checkin_data.getMonth() + 1;
let cDay = checkin_data.getDate();
let cTime = checkin_data.getHours();
//如果当前时间超过下午四点则记录第二天
if (cTime >= 16) {
    checkin_data = new Date();
    cMonth = checkin_data.getMonth() + 1;
    cDay = checkin_data.getDate();
}
let checkout_date = new Date(cMonth + '/' + (cDay + 1));
let oMonth = checkout_date.getMonth() + 1;
let oDay = checkout_date.getDate();
//将日期值赋给入住日和离店日的span的标签
checkIninfo.innerHTML = cMonth + '月' + cDay + '日';
checkOutinfo.innerHTML += oMonth + '月' + oDay + '日';

/*----------------------------日历------------------------------*/
let currday = document.querySelector('.currday');

//实例化日历组件
let calendar = new Calendar({
    initDate: new Date(),
    callback: function (m, d, endM, endD) {
        //赋值给日历下方的入住日
        currday.innerHTML = m + '月' + d + '日';
        //赋值给离店日的span标签
        checkOutinfo.innerHTML = endM + '月' + endD + '日';
    }
});

//给入住日dom元素绑定事件，触发日历组件
checkInTime.addEventListener('click', ()=> {
    //触发日历组件的显示
    calendar.show(checkIninfo);
}, false);
//给离开日dom元素绑定事件，触发日历组件
checkOutTime.addEventListener('click', ()=> {
    calendar.show(checkOutinfo);
}, false);

/*---------------------------搜索酒店----------------------------*/
document.querySelector('.search').onclick = function () {
    //获取入住城市
    let _city = document.querySelector('.check-in-city-info').innerHTML,
    //获取入住日和离店日的值
        _checkIn = checkIninfo.innerHTML,
        _checkOut = checkOutinfo.innerHTML,
    //获取酒店名称
        _hotel = document.querySelector('.hotel-name').value;
    //拼接字符串
    let str = '?city=' + _city + '&CheckInDate=' + _checkIn + '&CheckOutDate=' + _checkOut;
    //如果酒店名称有内容则将酒店名称也拼进字符串
    if (_hotel) {
        str += 'HotelName=' + _hotel;
    }
    //跳转页面
    window.location.href = 'hotellist.html' + str;
};