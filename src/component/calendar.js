/**
 * Created by sky on 2017/3/17.
 */
export class Calendar {
    constructor(options) {
        //默认参数
        let defaults = {
            initDate: new Date(),
            callback: function () {}
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
        let year = options.initDate.getFullYear();
        let month = options.initDate.getMonth() + 1;
        let curday = options.initDate.getDate();
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
    updateTitle(year, month) {
        //将现在的年月值赋值给标题
        this.calendarbox.querySelector('.calendar-nowdate').innerHTML = year + '年' + month + '月';
    }

    //获取每个月的天数
    daysInOneMonth(year, month) {
        let d31 = [1, 3, 5, 7, 8, 10, 12];
        let d30 = [4, 6, 9, 11];
        let days = 31;
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
    startInOneMonth(year, month) {
        //获取当前月的第一天
        let date = new Date(year + '/' + month + '/' + 1);
        //获取当前月的第一天是星期几
        return date.getDay();
    }

    //渲染上个月
    renderPrevMonth(year, month) {
        //获取上个月
        let prevMonth = new Date(year + '/' + (month - 1));
        //获取上个月有多少天
        let prevMonthDays = this.daysInOneMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);
        //获取上个月的第一天是星期几
        let leftDays = this.startInOneMonth(year, month);
        let str = '';
        leftDays -= 1;
        while (leftDays >= 0) {
            str += `<span class="calendar-day to-gray">${prevMonthDays - leftDays}</span>`;
            leftDays--;
        }
        return str;
    }

    //渲染当前月
    renderCurrentMonth(year, month) {
        if(month == this.month){
            let str = '', start = 1;
            //获取当前月有多少天
            let days = this.daysInOneMonth(year, month);
            while (start <= days) {
                if (start == this.curday) {
                    str += `<span class="calendar-day currentday">${start}</span>`;
                }else if(start < this.curday) {
                    str += `<span class="calendar-day graycolor">${start}</span>`;
                }else {
                    str += `<span class="calendar-day">${start}</span>`;
                }
                start++;
            }
            return str;
        }else {
            let str = '', start = 1;
            //获取当前月有多少天
            let days = this.daysInOneMonth(year, month);
            while (start <= days) {
                if (start == 1) {
                    str += `<span class="calendar-day currentday">${start}</span>`;
                }else {
                    str += `<span class="calendar-day">${start}</span>`;
                }
                start++;
            }
            return str;
        }
    }

    //渲染页面日历数据
    render(year, month) {
        //将上个月和当前月的日赋值给存放日的盒子
        this.calendardays.innerHTML = this.renderPrevMonth(year, month) + this.renderCurrentMonth(year, month);
        //将当前的日期赋值给下方的入住日
        document.querySelector('.currday').innerHTML = this.month + '月' + this.curday + '日';
    }

    //给日历页绑定事件
    bindEvent() {
        this.calendarbox.onclick = (e) => {
            let target = e.target;
            //点击页面左上角返回前一页
            if (target.classList.contains('back')) {
                this.hide();
            }
            //点击页面右上角完成返回前一页并传值到前一页
            if (target.classList.contains('finish')) {
                this.hide();
            }
            //将当前日期传入页面下方入住日
            if (target.classList.contains('currday')) {
                this.currday.innerHTML = this.month + '月' + this.curday + '日';
            }
            //点击日期时传值到前一页，给当前日期高亮且不可选日期不可点击
            this.startDay = this.curday;
            if (target.classList.contains('calendar-day') && !target.classList.contains('to-gray') && !target.classList.contains('graycolor')) {
                this.curday = target.innerHTML;
                this.endDate = new Date(this.year, this.month - 1, (target.innerHTML * 1 + this.nights.innerHTML * 1));
                this.checkOutTime.innerHTML = (this.endDate.getMonth() + 1) + '月' + this.endDate.getDate() + '日';
                this.callback(this.month, target.innerHTML, this.endDate.getMonth() + 1, this.endDate.getDate());
                this.srcElement.innerHTML = this.month + '月' + target.innerHTML + '日';
                document.querySelector('.currentday').classList.remove('currentday');
                target.classList.add('currentday');
            }
            //点击上个月
            if (target.classList.contains('prev')) {
                let date = new Date(this.year, (this.month - 1 - 1));
                let prevYear = date.getFullYear();
                let prevMonth = date.getMonth() + 1;
                this.render(prevYear, prevMonth);
                this.year = prevYear;
                this.month = prevMonth;
                this.updateTitle(prevYear, prevMonth);
            }
            //点击下个月
            if (target.classList.contains('next')) {
                let date = new Date(this.year, (this.month - 1 + 1));
                let nextYear = date.getFullYear();
                let nextMonth = date.getMonth() + 1;
                this.render(nextYear, nextMonth);
                this.year = nextYear;
                this.month = nextMonth;
                this.updateTitle(nextYear, nextMonth);
            }
            //点击+增加天数
            if (target.classList.contains('addDay')) {
                this.checkinDays.innerHTML++;
                if (this.checkinDays.innerHTML >= 5) {
                    this.checkinDays.innerHTML = 5;
                }
                this.fuzhi();
            }
            //点击-减去天数
            if (target.classList.contains('minuDay')) {
                this.checkinDays.innerHTML--;
                if (this.checkinDays.innerHTML <= 1) {
                    this.checkinDays.innerHTML = 1;
                }
                this.fuzhi();
            }
        }
    }

    //赋值
    fuzhi(){
        //将加加减减后的天数赋值给元素
        this.nights.innerHTML = this.checkinDays.innerHTML;
        this.endDate = new Date(this.year, this.month - 1, (this.nights.innerHTML * 1 + this.startDay * 1));
        this.checkOutTime.innerHTML = (this.endDate.getMonth() + 1) + '月' + this.endDate.getDate() + '日';
    }

    //日历页显示
    show(element) {
        this.srcElement = element;
        this.calendarbox.classList.add('calendar-active');
    }

    //日历页隐藏
    hide() {
        this.calendarbox.classList.remove('calendar-active');
    }

}