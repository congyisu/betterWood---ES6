/**
 * Created by sky on 2017/3/14.
 */
//封装一个ajax请求
function ajax(options) {
    let defaults = {
        type: 'get',
        url: '',
        params: null,
        callback: function () {

        }
    };
    let obj = Object.assign({}, defaults, options);

    var xhr = new XMLHttpRequest();
    if (obj.type == "get" && obj.params) {
        let param_str = '';
        for (let i in obj.params) {
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
    }
}

//封装一个jsonp跨域请求
function jsonp(url, callback) {
    window.jsonp_callback = function (data) {
        callback(data);
    };
    let s = document.createElement('script');
    s.src = url + "&callback=jsonp_callback";
    document.querySelector('body').appendChild(s);
}

//封装一个从地址栏取参的函数
function getUrlParams(str) {
    if(!location.search)return;
    let tmp = decodeURIComponent(location.search).split('?')[1];
    let arr = tmp.split('&');
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        let res = arr[i].split('=');
        obj[res[0]] = res[1];
    }
    return str ? obj[str] : obj;
}

//封装一个动画模拟加载
let loadingAnimate = function () {
    let tpl = `<div class="loading">
                    <div class="circle-wrap">
                        <div class="circle circle-index1"></div>
                        <div class="circle circle-index2"></div>
                        <div class="circle circle-index3"></div>
                        <div class="circle circle-index4"></div>
                        <div class="circle circle-index5"></div>
                        <div class="circle circle-index6"></div>
                        <div class="circle circle-index7"></div>
                        <div class="circle circle-index8"></div>
                    </div>
                </div>`;
    let load = document.createElement('div');
    load.className = 'loading';
    load.innerHTML = tpl;

    this.startLoading = function (container) {
        let parentDom;
        if (typeof container == 'string') {
            parentDom = document.querySelector(container);
        } else if (typeof container == 'object') {
            parentDom = container;
        } else {
            parentDom = document.querySelector('.hotellistBox');
        }
        this.parentDom = parentDom;
        parentDom.appendChild(load);
    };
    this.stopLoading = function () {
        this.parentDom.removeChild(load);
    }
};
let loading = new loadingAnimate();

//封装一个获取元素的函数
let element = function (cls) {
    let ele = document.querySelectorAll(cls);
    if(!Node.prototype.bind){
        Node.prototype.bind = function (event,ele,callback) {
            this.addEventListener('click',(e)=>{
                if(e.target.tagName.toLowerCase()==ele){
                    callback(e,ele);
                }
            },false);
        };
    }
    if(!NodeList.prototype.bind){
        NodeList.prototype.bind = function (event,ele,callback) {
            this.forEach((ele,index) =>{
                ele.addEventListener('click',()=>{
                    callback(ele,index);
                },false);
            });

        };
    }

    if(ele.length==1){
        return ele[0];
    }else{
        return ele;
    }
};

//抛出
export { ajax , jsonp , getUrlParams ,loading ,element }