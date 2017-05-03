/**
 * Created by sky on 2017/3/26.
 */
import { element as getEle } from "./utils";
import { SlideSelector } from '../component/slideSelector';

/*------------------------订单填写页------------------------------*/
//获取订单填写页的大盒子
let writeorder = document.querySelector('.writeorder');
//获取遮罩层
let ordermask = document.querySelector('.ordermask');
//获取返回按钮
let goback = document.querySelector('.goback');
//获取提交订单按钮
let ordercheckbtn = document.querySelector('.ordercheckbtn');
//获取担保交易页的大盒子
let securedtransaction = document.querySelector('.secured-transaction');
//给订单填写页绑定事件
writeorder.addEventListener('click', (e)=> {
    let target = e.target;
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
let selector = new SlideSelector();
getEle('.room-count').addEventListener('click', function () {
    let ele = this.querySelector('.rightNum');
    selector.show({
        list: [1, 2, 3, 4, 5, 6],
        callback: function (data) {
            ele.innerHTML = data;
            let info_list = getEle('.fill-order-info-box');
            let str = '';
            for (let i = 0; i < data * 1; i++) {
                str += `<div class="fill-order-info">
                            <p>
                                <span class="left">姓名</span>
                                <span class="right"><input type="text" /></span>
                            </p>
                            <p>
                                <span class="left">证件</span>
                                <span class="right"><input type="number" /></span>
                            </p>
                       </div>`;
            }
            info_list.innerHTML = str;
        }
    });
});
getEle('.check-in-time').onclick = function () {
    let ele = this.querySelector('.rightTime');
    selector.show({
        list: ['16:00以前', '17:00以前', '18:00以前', '19:00以前', '20:00以前', '21:00以前', '22:00以前', '23:00以前'],
        callback: function (data) {
            ele.innerHTML = data;
        }
    })
};

/*------------------------担保交易页------------------------------*/
//获取担保交易页左上角的返回按钮
let backwriteorder = document.querySelector('.backwriteorder');
//获取预订成功页面
let orderfinish = document.querySelector('.orderfinish');
//给担保交易的盒子绑定事件
securedtransaction.addEventListener('click', (e)=> {
    let target = e.target;
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
getEle('.IDcard-bank').onclick = function () {
    let ele = this.querySelector('.banks');
    selector.show({
        list: ['中国工商银行', '中国农业银行', '中国银行', '中国建设银行', '中国光大银行', '华夏银行', '中国民生银行', '招商银行', '交通银行'],
        callback: function (data) {
            ele.innerHTML = data;
        }
    })
};
getEle('.IDcard-class').onclick = function () {
    let ele = this.querySelector('.idcards');
    selector.show({
        list: ['身份证', '护照', '港澳台胞通行证', '军官证', '士兵证'],
        callback: function (data) {
            ele.innerHTML = data;
        }
    })
};

/*------------------------预订成功页------------------------------*/
//点击返回酒店按钮返回项目首页
document.querySelector('.backIndex').onclick = ()=> {
    window.location.href = 'index.html';
};