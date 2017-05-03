/**
 * Created by sky on 2017/3/25.
 */
import { ajax , jsonp ,getUrlParams ,loading } from "./utils";

//点击左上角，返回index页
document.querySelector('.backs').onclick = ()=> {
    window.location.href = 'hotellist.html';
};

//点击查看图集，显示遮罩层，出现图集轮播
let checkImg = document.querySelector('.check-all-img');//获取查看图集
let allImg = document.querySelector('.all-img');//获取遮罩层
let imgWrap = document.querySelector('.all-img-wrap');//获取放图片的盒子
checkImg.onclick = function(){
    allImg.classList.remove('none');
    if(imgWrap.querySelector('ul')) return;
    loading.startLoading(imgWrap);
    ajax({
        url: "../../server/banner.json",
        callback: function (data) {
            loading.stopLoading();
            let str = '';
            data.forEach(function(value,index){
                str += `<li class="swiper-slide"><img src="${value.url}"/></li>`;
            });
            imgWrap.innerHTML = `<ul class="swiper-wrapper">${str}</ul>`;
            setTimeout(function(){
                new Swiper(imgWrap,{
                    autoplay: 1500,
                    loop: true
                });
            },10)
        }
    });
};
allImg.onclick = function(){
    allImg.classList.add('none');
};

//渲染酒店数据
let detailboxinfocont = document.querySelector('.detailbox-info-cont');
let contTit = detailboxinfocont.querySelector('.contTit');
let contRank = detailboxinfocont.querySelector('.contRank');
let contTel = detailboxinfocont.querySelector('.contTel');
let contAddr = detailboxinfocont.querySelector('.contAddr');
let hotelCont = document.querySelector('.hotelCont');
ajax({
    url: "../../server/hotel.json",
    callback: function (data) {
        let dataList = data.data;
        dataList.forEach((val, ind)=> {
            let id = getUrlParams('id');
            if(ind + 1 == id){
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
let detailboxinfotit = document.querySelector('.detailbox-info-tit');
let detailboxinfotitA = detailboxinfotit.querySelectorAll('a');
let infocont = document.querySelector('.infocont');
detailboxinfotit.addEventListener('click', (e)=> {
    let target = e.target;
    if (target.tagName == 'A') {
        //标题切换
        for (let i = 0; i < detailboxinfotitA.length; i++) {
            if(target.classList.contains('oInfo')){
                detailboxinfotitA[i].classList.remove('oInf');
            }else {
                detailboxinfotitA[i].classList.add('oInf');
            }
        }
        //内容切换
        infocont.style.transform = `translateX(${-(target.getAttribute('index') * 50)}%)`;
    }
},false);

//点击预订，遮罩层显示
let detailmask = document.querySelector('.detailmask');
let hotelorder = document.querySelector('.detailbox-room-info');
let maskdelete = document.querySelector('.maskdelete');
let ordernow = document.querySelector('.ordernow');
hotelorder.addEventListener('click',(e)=>{
    let target = e.target;
    if(target.classList.contains('order')) {
        detailmask.classList.add('show');
    }
});
//点击遮罩层上面的关闭按钮，关闭遮罩层
maskdelete.onclick = ()=>{
    detailmask.classList.remove('show');
};
//点击预订进入下一页面
ordernow.onclick = ()=> {
    window.location.href = 'hotelorder.html';
};

