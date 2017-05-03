/**
 * Created by sky on 2017/3/21.
 */
//引入模块
import { ajax , jsonp ,getUrlParams ,loading } from "./utils";
import {Calendar} from "../component/calendar";

//渲染日历组件
const calendar = new Calendar({
    callback: function (data) {
    }
});

//点击左上角，返回index页
document.querySelector('.goback').onclick = ()=> {
    window.location.href = 'index.html';
};

//点击修改，日历页显示
document.querySelector('.modify-date').onclick = ()=> {
    calendar.show(document.querySelector('.listcheckin'));
};

//获取入住和离店的日期
const cid = document.querySelector('.listcheckin');
const cod = document.querySelector('.listcheckout');

//给入住和离店日期赋值
cid.innerHTML = getUrlParams('CheckInDate');
cod.innerHTML = getUrlParams('CheckOutDate');

//修改日期
let CheckInDay = document.querySelector('.checkin-Days');
 /*document.querySelector('.calendar').onclick = (e)=> {
    let target = e.target;
    if (target.classList.contains('CheckInDay')) {
        cod.innerHTML = getUrlParams('CheckOutDate' + this.nights.innerHTML);
    }else {
        cod.innerHTML = getUrlParams('CheckOutDate');
    }
};*/

//启动loading动画
loading.startLoading('.hotellistBox');

//渲染酒店数据
let wait = new Promise(function (resolve, reject) {
    ajax({
        url: "../../server/hotel.json",
        callback: function (data) {
            resolve(data);
        }
    });
});
wait.then(function (data) {
    let detailsInfo = document.querySelector('.details-info');
    let detailinfo = '';
    let data_list = data.data;
    data_list.forEach((val, ind)=> {
        detailinfo += `<dl class="details-list" data-region = '${val.district}' data-rank = "${val.rank}" data-price = '${val.price}' data-distance = '${val.distance}' data-hotelid = '${val.hotel_id}'>
                           <dt><img src="${val.image}"/></dt>
                           <dd>
                               <h3>${val.name}</h3>
                               <div class="one">
                                   <p>
                                       <span>4.7分</span>
                                       <strong><em>礼</em></strong>
                                       <strong><em>促</em></strong>
                                       <strong><em>返</em></strong>
                                       </p>
                                   <p>
                                       <b>￥${val.price}</b>
                                       <i>起</i>
                                   </p>
                               </div>
                               <div class="two">
                                   <span>${val.rank}</span>
                                   <span class="iconfont">&#xe621;</span>
                                   <span class="iconfont">&#xe63e;</span>
                               </div>
                                   <div class="three">
                                   <span>${val.addr}</span>
                                   <span>${val.distance / 1000}km</span>
                               </div>
                           </dd>
                       </dl>`;
    });
    loading.stopLoading();
    detailsInfo.innerHTML = detailinfo;
});

//导航切换
let masker = document.querySelector('.masker');
let filterWrap = document.querySelector('.filter');
let filterNav = document.querySelector('.filter-nav');
let filterNavLi = filterNav.querySelectorAll('li');
let filterArea = document.querySelector('.filter-area');
//封装一个重置函数
function resetArrow(target) {
    //如果是下箭头则返回
    if (target && target.classList.contains('icon-arrow-bottom')) return;
    //给点击的li加上箭头，删除下箭头
    for (let i = 0; i < filterNavLi.length; i++) {
        filterNavLi[i].classList.add('icon-arrow-top');
        filterNavLi[i].classList.remove('icon-arrow-bottom');
        filterNavLi[i].classList.remove('addline');
    }
}

//点击底部导航
filterNav.addEventListener('click', (e)=> {
    let target = e.target;
    //点击nav切换内容
    if (target.tagName == 'LI') {
        //调用清空函数
        //resetArrow(target);
        //切换上下箭头
        if (target.classList.contains('icon-arrow-top')) {
            target.classList.remove('icon-arrow-top');
            target.classList.add('icon-arrow-bottom');
            masker.classList.add('masker-show');
        } else {
            target.classList.remove('icon-arrow-bottom');
            target.classList.add('icon-arrow-top');
            masker.classList.remove('masker-show');
        }
        //点击li时清空li的宽边框
        for (let i = 0; i < filterNavLi.length; i++) {
            filterNavLi[i].classList.remove('addline');
        }
        //点击li时给其加宽边框
        target.classList.add('addline');
        //让对应内容根据点击的li切换
        filterArea.style.transform = `translateX(${-(target.getAttribute('index') * 25)}%)`;
    }
}, false);

//给遮罩层里的所有内容绑定事件
masker.addEventListener('click', (e)=> {
    let target = e.target;
    //控制遮罩层，点击遮罩层剩余部分，删除它
    switch (target.tagName) {
        case "DIV":
            if (target.classList.contains('masker')) {
                masker.classList.remove('masker-show');
                resetArrow();
            }
            //不再执行后面的语句
            return;
            break;
        case "P":
            break;
        default:
            console.log('I don not know where you click');
    }

    if (target.parentNode.classList.contains('arrange')) {
        //判断如果点击的元素没有被选中的类，则删除这个类，并加上选中的类，并给选中的类加上baseColor的样式
        if (target.classList.contains('icon-checkbox')) {
            let siblings = target.parentNode.childNodes;
            for (let i = 0; i < siblings.length; i++) {
                if (siblings[i].nodeType != 3) {
                    siblings[i].className = 'iconfont icon-checkbox';
                }
            }
            target.classList.remove('icon-checkbox');
            target.classList.add('icon-checkbox-checked');
            target.classList.add('pcolor');
            let dir = target.getAttribute('dir');
            let param = target.getAttribute('xu');
            arrangeFn(dir, param);
        }
    } else {
        //判断如果点击的元素没有被选中的类，则删除这个类，并加上选中的类，并给选中的类加上baseColor的样式
        if (target.classList.contains('icon-checkbox')) {
            target.classList.remove('icon-checkbox');
            target.classList.add('icon-checkbox-checked');
            target.classList.add('pcolor');
        } else {
            //否则将选中的类删除，并加上未选中的类，并且删除baseColor的样式
            target.classList.remove('icon-checkbox-checked');
            target.classList.add('icon-checkbox');
            target.classList.remove('pcolor');
        }
    }

    //collector调用收集所有checkbox选中信息的函数
    //screen调用过滤筛选信息的函数
    screen(collector());
}, false);

//收集所有checkbox选中信息
function collector() {
    let region = document.querySelector('.masker .region').querySelectorAll('p.icon-checkbox-checked');
    let rank = document.querySelector('.masker .rank').querySelectorAll('p.icon-checkbox-checked');

    let screenItems = {
        region: [],
        rank: []
    };

    for (let i = 0; i < region.length; i++) {
        screenItems.region.push(region[i].getAttribute('region'));
    }
    for (let i = 0; i < rank.length; i++) {
        screenItems.rank.push(rank[i].getAttribute('rank'));
    }
    for (let j in screenItems) {
        if (screenItems[j].length == 0) {
            delete screenItems[j];
        }
    }
    return screenItems;
}

//排序函数
function arrangeFn(direction, param) {
    //获取列表大盒子
    let wrap = document.querySelector('.details-info');
    //获取列表大盒子里的所有的dl
    let dls = Array.from(wrap.querySelectorAll('.details-list'));
    dls = dls.sort(function (m, n) {
        //判断自定义属性价格和距离的值
        let item;
        if (param == 'price') {
            item = 'price';
        } else if (param == 'distance') {
            item = 'distance';
        }
        //判断自定义属性的值是升序还是降序
        if (direction == 'up') {
            return m.getAttribute('data-' + item) - n.getAttribute('data-' + item);
        } else {
            return n.getAttribute('data-' + item) - m.getAttribute('data-' + item);
        }
    });
    dls.forEach((ele, index)=> {
        wrap.appendChild(ele);
    });
}

//过滤筛选逻辑的实现
function screen(obj) {
    console.log(obj);
    //获取列表大盒子
    let wrap = document.querySelector('.details-info');
    //获取列表大盒子里的所有的dl
    let dls = wrap.querySelectorAll('.details-list');
    //默认显示所有的列表项
    for (let i = 0; i < dls.length; i++) {
        dls[i].classList.remove('none');
    }
    //遍历dl，把符合条件的项添筛选出来
    for (let i = 0; i < dls.length; i++) {
        //获取dl的自定义属性
        for (let k in obj) {
            if (obj[k].indexOf(dls[i].getAttribute('data-' + k)) == -1) {
                dls[i].classList.add('none');
            }
        }
    }
}

//点击列表里的dl跳转详情页
setTimeout(function(){
    let wrap = document.querySelector('.details-info');//获取列表大盒子
    let dls = document.querySelectorAll('.details-info .details-list ');//获取列表大盒子里的所有的dl
//默认显示所有的列表项
    for (let i = 0; i < dls.length; i++) {
        dls[i].onclick = function() {
            //获取酒店id
            let hotelId = dls[i].getAttribute('data-hotelid');
            //拼接字符串
            let str = '?id=' + hotelId;
            //跳转页面
            window.location.href = 'hoteldetail.html' + str;
        };
    }
},1000);
