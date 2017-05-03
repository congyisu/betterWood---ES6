/**
 * Created by sky on 2017/3/15.
 */
export class HotCity {
    constructor(options) {
        const defaults = {
            data: []
        };
        const opt = Object.assign({}, defaults, options);
        this.hotList = document.querySelector(".city-hot .city-hot-list");
        this.render(opt.data);
    }

    render(hotcityList) {
        let hotList = this.hotList;
        let empty_str = '';
        hotcityList.forEach((val, ind)=> {
            empty_str += `<li>${val.name}</li>`;
        });
        hotList.innerHTML = empty_str;
    }
}