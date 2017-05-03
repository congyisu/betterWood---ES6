/**
 * Created by sky on 2017/3/15.
 */
export class City {
    constructor(options) {
        const defaults = {
            data: []
        };
        const opt = Object.assign({}, defaults, options);
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

    //渲染字母和城市列表
    render(cityList) {
        let firstnameAll = this.firstnameAll;
        let nameall = this.nameall;
        let empty_str = '', city_str = '';
        cityList.forEach((val, ind)=> {
            empty_str += `<span alpha="${val.alpha}">${val.alpha}</span>`;
            city_str += `<div class="city-name">
                            <p class="city-name-line" alpha="${val.alpha}"><span>${val.alpha}</span></p>
                            <ul class="city-name-list">
                                ${
                val.data.map((item, index)=> {
                    return `<li>${item[0]}</li>`
                }).join('')
                }
                            </ul>
                        </div>`;
        });
        firstnameAll.innerHTML = empty_str;
        nameall.innerHTML = city_str;
    }

    //点击字母跳到对应城市列表
    collectCityHeight() {
        let alphaDom = document.querySelectorAll('[alpha]');
        let height_info = {};
        Array.from(alphaDom).forEach((dom, ind)=> {
            //console.log(dom);
            height_info[dom.getAttribute('alpha')] = dom.offsetTop;
        });
        //console.log(height_info);
        this.heightInfo = height_info;
    }

    //事件绑定
    bindEvent() {
        this.citiesAll.addEventListener('click', (e) => {
            let target = e.target;
            if (target.tagName == 'SPAN') {
                this.citiesAll.scrollTop = this.heightInfo[target.getAttribute('alpha')];
            }
            if (target.tagName == 'LI') {
                this.hide();
                this.topbtn.classList.add('top-active');
                this.opt.callback(target.innerHTML);
                this.checkcity.innerHTML = target.innerHTML;
            }
            if (target.tagName == 'SPAN' && target.classList.contains('back')) {
                this.hide();
            }
        }, false)
    }

    //点击火箭返回顶部
    toptoggle() {
        let height = document.documentElement.clientHeight;

        this.citiesAll.onscroll = ()=> {
            let top = this.citiesAll.scrollTop;
            if (top > height) {
                this.topbtn.classList.remove('top-active');
            } else {
                this.topbtn.classList.add('top-active');
            }
            this.topbtn.onclick = ()=> {
                this.topbtn.classList.add('top-transform');
                this.citiesAll.scrollTop = 0;
            };
        };
    }

    //城市页显示
    show() {
        this.citiesAll.classList.add('cities-active');
        this.citiesAll.scrollTop = 0;
    }

    //城市页隐藏
    hide() {
        this.citiesAll.classList.remove('cities-active');
    }
}