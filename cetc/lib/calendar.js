;
(function(win) {

    "use strict";

    /**
     * 模块说明：dorseyUI作为一切处理函数的入口，需要注意的是部分函数调用到dorseyHf函数处理，故而需要引入dorsey-handle-function文件，
     *           且该文件的位置需要放置在dorsey-ui.js之前。
     * */
    var dc_self;
    var dorseyUI = function() {
        return new dorseyUI.fn.init();
    };
    dorseyUI.fn = dorseyUI.prototype = {
        constructor: dorseyUI, //接口名：是dorsey-ui的缩写。意为函数处理
        init: function() {
            dc_self = this;
            return this;
        },

        dcCalendar: function(obj) {
            var calendar = {
                /**
                 *  农历数据
                 * */
                lunarData: [
                    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
                    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
                    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
                    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
                    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
                    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
                    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
                    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
                    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
                    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
                    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
                    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
                    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
                    0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
                    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
                    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
                    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
                    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
                    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
                    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
                    0x0d520
                ], //2100
                /**
                 *  二十四节气数据
                 * */
                sTermDate: [
                    0, 21208, 42467, 63836, 85337, 107014,
                    128867, 150921, 173149, 195551, 218072, 240693,
                    263343, 285989, 308563, 331033, 353350, 375494,
                    397447, 419210, 440795, 462224, 483532, 504758
                ],
                /**
                 *  二十四节气——中文
                 * */
                sTermChinese: [
                    "立春", "雨水", "惊蛰", "春分", "清明", "谷雨",
                    "立夏", "小满", "芒种", "夏至", "小暑", "大暑",
                    "立秋", "处暑", "白露", "秋分", "寒露", "霜降",
                    "立冬", "小雪", "大雪", "冬至", "小寒", "大寒"
                ],
                /**
                 *  阳历节日对象——中文
                 * */
                festivalChinese: {
                    //第一季度
                    "0101": "元旦",
                    "0214": "情人节",
                    "0308": "妇女节",
                    "0312": "植树节",
                    "0315": "消费者权益日",
                    "0321": "世界森林日、世界儿歌日",

                    //第二季度
                    "0401": "愚人节",
                    "0407": "世界卫生日",
                    "0422": "世界地球日",
                    "0501": "劳动节",
                    "0504": "青年节",
                    "0505": "碘缺乏病防治日",
                    "0508": "世界红十字日",
                    "0512": "国际护士节",
                    "0515": "国际家庭日",
                    "0517": "世界电信日",
                    "0518": "国际博物馆日",
                    "0520": "520情人节",
                    "0523": "国际牛奶日",
                    "0531": "世界无烟日",
                    "0601": "儿童节",
                    "0605": "世界环境日",
                    "0606": "全国爱眼日",
                    "0616": "防治荒漠化和干旱日",
                    "0623": "国际奥林匹克日",
                    "0625": "全国土地日",
                    "0626": "国际反毒品日",

                    //第三季度
                    "0701": "建党节 香港回归纪念 国际建筑日",
                    "0707": "中国人民抗日战争纪念日",
                    "0711": "世界人口日",
                    "0801": "建军节",
                    "0908": "国际扫盲日",
                    "0909": "毛泽东逝世纪念",
                    "0910": "教师节",
                    "0916": "国际臭氧层保护日",
                    "0920": "国际爱牙日",
                    "0927": "世界旅游日",
                    "0928": "孔子诞辰",

                    //第四季度
                    "1001": "国庆节 国际音乐日",
                    "1004": "世界动物日",
                    "1006": "老人节",
                    "1008": "全国高血压日 世界视觉日",
                    "1009": "世界邮政日",
                    "1015": "国际盲人节",
                    "1016": "世界粮食日",
                    "1017": "世界消除贫困日",
                    "1024": "联合国日",
                    "1108": "中国记者日",
                    "1109": "消防宣传日",
                    "1112": "孙中山诞辰纪念",
                    "1114": "世界糖尿病日",
                    "1117": "国际大学生节",
                    "1201": "世界艾滋病日",
                    "1203": "世界残疾人日",
                    "1209": "世界足球日",
                    "1220": "澳门回归纪念",
                    "1225": "圣诞节",
                    "1226": "毛泽东诞辰纪念",
                    "1229": "国际生物多样性日"
                },
                /**
                 *  农历节日对象——中文
                 * */
                lFestivalChinese: {
                    "0101": "春节",
                    "0202": "头牙",
                    "0115": "元宵节",
                    "0505": "端午节",
                    "0707": "七巧节",
                    "0715": "中元节",
                    "0815": "中秋节",
                    "0909": "重阳节",
                    "1208": "腊八节",
                    "1216": "尾牙",
                    "1223": "小年",
                    "0100": "除夕"
                },

                lDecade: ["初", "十", "廿", "三"],
                lDate: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"],
                lMonthArr: ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"],
                heavenlyStems: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
                terrestrialBranch: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
                animals: ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"],
                dateFunction: function() {
                    return new Date();
                },
                /**
                 *  返回当前时间数组
                 *  @example：console.log(this.thisTime()); //当前时间函数
                 * */
                thisTime: function() {
                    var _self = this;
                    var year = _self.dateFunction().getFullYear(), //获取年
                        month = _self.dateFunction().getMonth(), //获取月
                        today = _self.dateFunction().getDate(), //获取日
                        weekNum = _self.dateFunction().getDay(), //获取星期
                        hour = _self.dateFunction().getHours(), //获取小时
                        minute = _self.dateFunction().getMinutes(), //获取分钟
                        second = _self.dateFunction().getSeconds(); //获取秒
                    return [year, month, today, weekNum, hour, minute, second]; //返回所需数据
                },

                isLeapYear: function(year) {
                    var flag;
                    year % 4 === 0 ? (year % 100 !== 0 ? flag = 1 : (year % 400 === 0 ? flag = 1 : flag = 0)) : flag = 0; //闰年处理
                    return flag;
                },
                monthDates: function(y) {
                    return [31, 28 + this.isLeapYear(y), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                },
                week: ['日', '一', '二', '三', '四', '五', '六'],
                /**
                 *  农历（阴历）相关函数
                 *
                 *  1、解析农历数据，返回一个二进制对象
                 * */
                lunarTran: function(y) {

                    var lunarData = this.lunarData[y - 1900];

                    var hexadecimal = lunarData.toString(16),
                        head = Math.floor(lunarData / 65536).toString(2), //头部说明闰月是大月还是小月
                        center = Math.floor((lunarData % 65536) / 16).toString(2), //中部说明哪个月是大月哪个是小月的二进制数
                        end = lunarData % 16; //尾部说明哪个月是闰月，没有闰月则为0
                    //字符串补全处理
                    if (center.length < 12) {
                        var i = 12 - center.length;
                        while (i--) {
                            center = "0" + center;
                        }
                    }
                    hexadecimal.length !== 5 ? hexadecimal = "0x0" + hexadecimal : hexadecimal = "0x" + hexadecimal; //16进制数
                    var bigMonthNum = (center + head).match(new RegExp('1', 'g')).length, //输出大月个数
                        monthDetail = center.split(''); //把二进制整合成一个数组

                    end !== 0 ? monthDetail.splice(end, 0, head) : end; //把尾部是否为闰月的月份插回去

                    var everyMonthDays = []; //用于输出每一年所有月份的天数，包括闰月
                    for (var i = 0; i < monthDetail.length; i++) {
                        if (monthDetail[i] === "1") {
                            everyMonthDays.push(30);
                        } else {
                            everyMonthDays.push(29);
                        }
                    }
                    return {
                        thisYear: y, //这一年是哪一年
                        lunarData: hexadecimal, //该年的农历数据，16进制的数据，即我们上面那个数据表，如：ox04bd8
                        isBigLeadMonth: parseInt(head), //头部数据,表示闰月是否为大月，是为1，否为0，没有闰月则返回0
                        monthBinaryData: center, //中部数据，2进制数据，为除了闰月其他1-12月的月份是否为大月，如：010010111101 表示1月是29天，2月是30天，依次类推
                        monthDetail: monthDetail, //月份详情，返回一个数组，若有闰月则自动添加进对应的月份之后。
                        everyMonthDays: everyMonthDays, //返回一年中所有月份的天数包括闰月
                        bigMonthNum: bigMonthNum, //这一年里大月（30天）的数量
                        whichIsLeadMonth: end //尾部数据，返回若是闰月，是哪个月为闰月
                    };
                },
                /*
                 * 2、输入一个数，返回农历值，比如：输入 19 返回 廿十 ，输入0 返回初一
                 * @example: console.log(this.numToLunar(19)) //"廿十"
                 * */
                numToLunar: function(num) {
                    var _self = this,
                        num1 = num;
                    num1 === 9 ? num1 -= 1 : null; //由于输入9的时候显示是十十，这里做点小修正，下面有个test函数可以测试
                    return _self.lDecade[Math.floor((num1 + 1) / 10)] + _self.lDate[(num) % 10];
                },
                /**
                 *  3、解析农历数据，返回某一年的总农历天数
                 *  @example : console.log(this.daysInYear(1900)); //384
                 * */
                daysInYear: function(y) {
                    var obj = this.lunarTran(y);
                    return obj.monthDetail.length * 29 + obj.bigMonthNum;
                },
                /**
                 *  4、解析农历数据，返回某一年某一月总农历天数
                 *     闰年多出的那一个月这里暂时不管，因为上面已有一个封好的对象，到时转化时直接调用即可
                 *  @example：console.log(this.daysInMonth(2018,7)); //30//代表2018年农历7月份有30天
                 * */
                daysInMonth: function(y, m) {
                    return (this.lunarData[y - 1900] & (0x10000 >> (m + 1))) ? 30 : 29;
                },
                /**
                 *  5、返回任意月上个月的农历天数，包括上一年的闰12月也都可以，当然了，一年里两个12月的上面的数据好像是没有的，不过呢
                 *     这种情况咱还是要考虑进去哈，既然是程序公式嘛肯定得通用，考虑所有可能出现的情况。
                 *     为什么要做这个？因为我们后面得到的偏移量有正也有负，正值好办，但负值我们需要知道上个月的天数
                 *
                 *     console.log("本月："+this.daysInPreMonth(2078,1)); //这两者的返回值相同 这里的2078,1是指2078年第一个农历月
                 *     console.log("上个月："+this.daysInMonth(2077,12)); //这里跟上面的也是一样的
                 * */
                daysInPreMonth: function(y, m) {
                    var _self = this,
                        obj = _self.lunarTran(y); //获取今年日历对象
                    var days;

                    //分两种情况进行讨论，上个月在今年跟上个月在上一年
                    if (m > 0) {
                        if (obj.isBigLeadMonth === "1" && m === obj.whichIsLeadMonth + 1) { //如果该年是闰年且m为闰年后第一个月，则
                            return (obj.isBigLeadMonth === 0 ? 29 : 30);
                        } else {
                            return _self.daysInMonth(y, m - 1);
                        }
                    } else {
                        var objPre = _self.lunarTran(y - 1); //获取上一年日历对象
                        return objPre.everyMonthDays[objPre.everyMonthDays.length - 1];
                    }

                },

                getWeekStartAndEnd: function(curr) {
                    var first = curr.getDate() - curr.getDay();
                    var last = first + 6;
                    var firstday = new Date(curr.setDate(first))
                    var lastday = new Date(curr.setDate(last))
                    return {
                        firstOfWeek: firstday,
                        lastOfWeek: lastday
                    }
                },
                /**
                 *  6、通过1900年1月31日确定公历每年的第一天也就是xx年1月1日的农历偏移量
                 *  @example :
                 *  for(var i = 1900;i<2100;i++){
                 *      console.log(this.lFirstDayInEveryYears(i));
                 *  }
                 * */
                lFirstDayInEveryYears: function(y) {
                    var _self = this;
                    //我们需要计算任意一天距离1900年1月31日的偏移量，单位（天）;
                    var baseDate = new Date(1900, 0, 31).getTime(),
                        offset = Math.floor((new Date(y, 0, 1).getTime() - baseDate) / 86400000), //计算偏移量
                        mOffset = 2; //月份偏移量：比如说1月1号是落在农历的11月份还是12月份
                    if (y === 1900) {
                        offset = 0;
                        mOffset = 1;
                    } else {
                        for (var i = 1900; i < y; i++) {
                            offset -= _self.daysInYear(i);
                        }
                        /**
                         *  这里呢，为了简化算法，咱用了点取巧的方式，我们通过查询万年历可以得知农历的正月初一不会出现在元旦（1月1号）之前，
                         * */
                        //也不会出现在3月之后，这就给我们的算法提供了方便,当然啦，其实这种方式呢我虽然这么做了，但我个人的鄙视的= =，假如
                        // 说农历的正月初一出现在三月或者春节之前，那我们这算法就废了，当然了，这种情况不可能。
                        if (offset < 0) {
                            // //这里呢，咱防一手闰12月的哈，实际上是没有这个可能的，不过这样的程序看起来比较严谨一点
                            if ((_self.lunarTran(y).lunarData & 0x0000c) === 12) {
                                // console.log("if-if,my name is ChenDuoXin,my English name is dorseyCh.");
                                offset += (_self.daysInPreMonth(y, 0) + _self.daysInMonth(y - 1, 11));
                            } else {
                                offset += _self.daysInPreMonth(y, 0);
                                offset < 0 ? offset += _self.daysInPreMonth(y - 1, 11) : mOffset = 1;
                            }
                        }
                    }
                    return {
                        thisYear: y,
                        offset: offset,
                        mOffset: mOffset
                    };
                },
                /**
                 *  7、输入y年m月，输出这个月1号的偏移量，或者说是农历值（阳历转农历）
                 *
                 *  1900年1月31日正好对应农历的正月初一。
                 *
                 *  输入y年m月，输出这个月1号的偏移量，或者说是农历值，思路非常简单，到这一步的时候我们知道什么呢？
                 *  知道每一年1月1号所对应的农历值对吧？然后要到每一个月，但是呢，阳历的月份跟农历的月份天数是不对应的，所以还
                 *  需要做下面的事：
                 *      1、计算当前阳历时间距离同年1月1号的天数间隔
                 *      2、我们知道每一年1月1号这一天是已经跟农历对照好了的。
                 *      3、知道了这个间隔，那我们就可以推出：过了这个间隔之后，农历的偏移量做了多少的改变
                 * */
                solarToLunar: function(y, m) {

                    var _self = this;

                    var offsetObj = _self.lFirstDayInEveryYears(y), //获取当年阳历1月1号所对应的农历值，包括日偏移与月偏移
                        obj = _self.lunarTran(y),
                        monthDates = this.monthDates(y),
                        offset = offsetObj.offset;

                    if (y === 1900) {
                        for (var i = 0; i < m; i++) {
                            i < 1 ? offset += monthDates[i] - 30 : offset += monthDates[i] - obj.everyMonthDays[i - 1];
                        }
                    } else {
                        var objPre = _self.lunarTran(y - 1);
                        for (var i = 0; i < m; i++) {
                            if (i < offsetObj.mOffset) {
                                offset += (monthDates[i] - objPre.everyMonthDays[objPre.everyMonthDays.length - 1 - i]);
                            } else {
                                offset += (monthDates[i] - obj.everyMonthDays[i - offsetObj.mOffset]);
                            }
                        }
                    }
                    return [offset, offsetObj.mOffset];
                },
                /**
                 *  8、通过世界时以及节气年返回year年第n个节气所对应为该月第几天
                 *  31556925974.7：是一个节气年，24个节气合起来总计多少ms。
                 *  Date.UTC(1900,0,6,2,5)：1900年1月6日2时5分为小寒节气开始，从这里开始，记得是以小寒开始，且历法的精确度仅仅到分钟
                 *  @example : console.log(this.sTermToDate(2018, 2)); //2018立春是月份的4号，打印出了4
                 **/
                sTermToDate: function(year, n) {
                    var offDate = new Date((31556925974.7 * (year - 1900) + this.sTermDate[n] * 60000) +
                        Date.UTC(1900, 0, 6, 2, 5));
                    return (offDate.getUTCDate());
                }


            };

            /**
             *  日历开始
             * */
            function updateRightContentHeader(currdate, seldate) {
                var d = calendar.getWeekStartAndEnd(currdate)
                calendar.currWeek = d;
                updateRightContent(calendar.currWeek.firstOfWeek, seldate)
                var firstofweek = d.firstOfWeek.getFullYear() + '年' + (d.firstOfWeek.getMonth() + 1) + '月' + d.firstOfWeek.getDate()
                var lastofweek = d.lastOfWeek.getFullYear() + '年' + (d.lastOfWeek.getMonth() + 1) + '月' + d.lastOfWeek.getDate()
                var cbtn = $('<div class="calendarContentBtn">' +
                    '<span class="mcBtn minus"><i  class="fa fa-angle-left"></i></span>' +
                    '<i class="dcCalendarCValues">' + firstofweek + '日-' + lastofweek + '日</i>' +
                    '<span class="mcBtn plus" ><i class="fa fa-angle-right"></i></span>' +
                    '</div>');
                $(".calContentHeader").empty();
                $(".calContentHeader").append(cbtn);

                $('.mcBtn.plus').click(function() {
                    var dtobj = moment(calendar.currWeek.firstOfWeek).add(1, 'weeks');
                    updateRightContentHeader(dtobj._d)
                })
                $('.mcBtn.minus').click(function() {
                    var dtobj = moment(calendar.currWeek.firstOfWeek).add(-1, 'weeks');
                    updateRightContentHeader(dtobj._d)
                })
            }


            function updateRightContent(currentWeekStart, seldate) {
                var $ro = $(".calendarTableContent")
                for (var index = 1; index <= 7; index++) {
                    var i = index - 1
                    var dtobj = moment(currentWeekStart).add(i, 'days');

                    var th = $ro.find('thead tr th').eq(index);
                    th.empty();
                    th.append(dtobj.format("YYYY-M-D"))
                    var tdmorning = $ro.find('tr.mornning td').eq(index);
                    var tdafternoon = $ro.find('tr.afternoon td').eq(index);
                    tdmorning.removeClass("currentSelect");
                    tdafternoon.removeClass("currentSelect");
                    tdmorning.html("<i class='evts' id='emid-" + dtobj.format("YYYY-M-D") + "' ></i>");
                    tdafternoon.html("<i class='evts' id='eaid-" + dtobj.format("YYYY-M-D") + "' ></i>");
                    if (seldate) {
                        console.log(seldate)
                        var isSameDay = moment(seldate).isSame(dtobj, 'day')
                        if (isSameDay) {
                            tdmorning.addClass("currentSelect");
                            tdafternoon.addClass("currentSelect");
                        }
                    }
                }

                getEventsByWeek().then(function(res) {

                    res.forEach(function(item) {
                        if (item.am) {
                            var content = item.am.map(function(it) {
                                return '<a href=#>' + it.title + '</a>'
                            }).join("<br>")
                            $("#emid-" + item.date).append(content)
                        }
                        if (item.pm) {
                            var content = item.pm.map(function(it) {
                                return '<a href=#>' + it.title + '</a>'
                            }).join("<br>")
                            $("#eaid-" + item.date).append(content)
                        }
                    })
                })

            }
            var thisTime = calendar.thisTime(),
                rel, detailX, detailY,
                year = thisTime[0],
                month = thisTime[1],
                today = thisTime[2],
                weekNum = thisTime[3],
                week = calendar.week,
                monthDates = calendar.monthDates(year),
                lMonthArr = calendar.lMonthArr;


            /*==============================@start js日期表格创建=======================================*/
            //左侧上层按钮 
            var btn = $('<div class="calendarBtn">' +
                '<span class="mBtn minus"><i class="fa fa-angle-left"></i></span>' +
                '<div class="dcCalendarValues">' + year + '年' + (month + 1) + '月' + today + '日 ' + '</div>' +
                '<span class="mBtn plus"><i class="fa fa-angle-right"></i></span>' +
                '</div>');

            /*左侧日历*/
            var table = $('<span class="caltable"><table class="calendarTable"><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>' +
                '<tbody class="calendarTbody">' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '</tbody></table></span>');
            obj.append(btn);
            obj.append(table);
            obj.append($('<div class="dcDateDetail"></div>'));

            /*右侧内容*/

            var calRightContent = $('<span class="calTableWrapper"><table class="calendarTableContent"><thead class="rightTh"><tr><th></th><th>周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th></tr></thead>' +
                '<tbody class="calendarContentTbody">' +
                '<tr class="mornning"><td>上午</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '<tr colspan=8 class="hrtr"></td><td></tr>' +
                '<tr class="afternoon"><td>下午</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
                '</tbody></table></span>');
            $("#dcCalendarContent").append(calRightContent)
            var dtToday = new Date(year, month, today);
            updateRightContentHeader(dtToday)



            var $tBody = $('.calendarTbody'),
                $dateDetail = $('.dcDateDetail'),
                $CalendarValues = $('.dcCalendarValues');

            /*更新函数，即无论是点击还是查看，页面的html重新写入都用这个函数*/
            var update = function() {
                var firstDay = new Date(year, month, 1), //获取每个月的第一天
                    dayOfWeek = firstDay.getDay(); //这个月第一天的世界时去转换成星期几
                var thisMonthIDs = []
                var arr = calendar.solarToLunar(year, month);

                for (var j = 0; j < 6; j++) {
                    for (var i = 0; i < 7; i++) {
                        rel = j * 7 + i - dayOfWeek + 1; //rel就是原本的1~42，减掉第一天对应的星期数再后续做判断
                        var tdObj = $tBody.find('tr').eq(j).find('td').eq(i);
                        if (rel <= 0) {
                            var month0 = month - 1;
                            month0 < 0 ? month0 = 11 : month0;
                            tdObj.html(rel + monthDates[month0]).css("opacity", "0.3");
                        } else if (rel > monthDates[month]) {
                            tdObj.html(rel - monthDates[month]).css("opacity", "0.4");
                        } else {

                            var a = rel + arr[0] - 1;
                            var m = month - arr[1] + 1,
                                y = year;
                            if (m < 0) {
                                m += 12;
                                y--;
                            }
                            a %= calendar.daysInPreMonth(y, m);
                            var b = calendar.numToLunar(a);
                            var curM = month + 1
                            curM = curM > 12 ? 1 : curM;
                            var tdData = y + "-" + curM + "-" + rel
                            tdObj.html("<i class='customevt'></i><p class='solarValue'>" + rel + "</p>" + "<p>" + b + "</p>");
                            tdObj.data("dateVal", tdData);
                            tdObj.attr("id", "did-" + tdData)
                            thisMonthIDs.push(tdData)

                            if (rel === thisTime[2] && year === thisTime[0] && month === thisTime[1]) {
                                tdObj.css("color", "red");
                                console.log(thisTime)
                            } else {
                                tdObj.css("color", "#666");
                            }
                        }
                    }
                }
                getHaveEventsDays().done(function(res) {
                    updateEvent(res)
                })

                $CalendarValues.html(year + '年' + (month + 1) + '月');
            };
            update(); //初始化

            $('.calendarBtn .mBtn.minus').click(function() {
                month -= 1;
                if (month < 0) {
                    month = 11;
                    year -= 1;
                }
                update();
            })

            $('.calendarBtn .mBtn.plus').click(function() {
                month += 1;
                if (month > 11) {
                    month = 0;
                    year += 1;
                }
                update();
            })



            function updateEvent(haveEventDays) {

                haveEventDays.forEach(function(item) {
                    $tBody.find("#did-" + item).find(".customevt").addClass("hasEvent")
                })

            }

            function getHaveEventsDays() {
                //模拟个延迟请求
                var def = jQuery.Deferred()
                return def.resolve(['2019-5-20'])
            }

            function getEventsByWeek() {
                //模拟个延迟请求
                var def = jQuery.Deferred()
                var retVal = [{
                    date: '2019-5-20',
                    am: [{ title: '开发计划会议', time: '22:11' }, { title: '阿斯蒂芬阿斯', time: '22:11' }],
                    pm: [{ title: '开发计划会议', time: '22:11' }]
                }]
                return def.resolve(retVal)
            }


            $tBody.find('td').each(function() {
                $(this).click(function(e) {

                    var curSelDate = $(this).data().dateVal ? $(this).data().dateVal.split("-") : "";
                    if (curSelDate) {
                        curSelDate[1] = curSelDate[1] - 1
                        if (curSelDate[1] < 1) {
                            curSelDate[1] = 12
                        }
                        var dtToday = new Date(curSelDate[0], curSelDate[1], curSelDate[2], 12);
                        console.log(dtToday)
                        var copiedDate = new Date(dtToday.getTime());
                        updateRightContentHeader(dtToday, copiedDate)
                    }

                    $tBody.find('td').removeClass('selected');
                    $(this).addClass('selected');
                });
                $(this).mousemove(function(e) {
                    e = e || window.event;
                    detailX = e.pageX - $tBody.offset().left;
                    detailY = e.pageY - obj.offset().top;
                    $dateDetail.css({
                        left: (detailX + 30) + "px",
                        top: (detailY) + "px"
                    });
                    if ($(this).css("opacity") === "1") {
                        //  $CalendarValues.html(year + '年' + (month + 1) + '月' + $(this).children('.solarValue').html() + '日 <span class="weekAdapt">星期' + week[$(this).index() % 7] + '</span>');
                        $tBody.find('td').removeClass('calendarMouseMove');
                        $(this).addClass('calendarMouseMove');
                    }
                });
            });


            if (obj.width() < 270) {
                obj.css("font-size", "5px");
                obj.find(".dcCalendarValues").find('span').css("display", "none");
            }
        }
    };
    dorseyUI = dorseyUI.fn.init.fn = dorseyUI.fn;
    win.dorseyUI = dorseyUI;
})(window);