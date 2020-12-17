export default class Utils {
    // static 类的属性和方法
    // 不加static 就是类实例化对象的属性和方法
    static ce(type, style, parent) {
        let elem = document.createElement(type);
        if (style)
            Object.assign(elem.style, style);
        if (parent) {
            if (typeof parent === "string") parent = document.querySelector(parent);
            parent.appendChild(elem);
        }
        return elem;
    }
    static addClass(elem, className) {
        if (!className) return;
        let classArr = elem.className.split(/\s+/).concat(className.split(/\s+/));
        classArr = Array.from(new Set(classArr));
        elem.className = classArr.join(" ");
    }
    static removeClass(elem, className) {
        let classArr = elem.className.split(/\s+/);
        let arr = className.split(/\s+/);
        classArr = classArr.reduce((value, item) => {
            if (arr.indexOf(item) < 0) value.push(item);
            return value;
        }, []);
        elem.className = classArr.join(" ");
    }

    static setCss(selector, styleObject) {
        if (document.styleSheets.length === 0) {
            Utils.ce("style", undefined, document.head);
        }
        let styleSheet = document.styleSheets[document.styleSheets.length - 1];
        let css = "";
        for (let prop in styleObject) {
            let value = styleObject[prop]
            prop = prop.replace(/[A-Z]/g, function (s) {
                return "-" + s.toLowerCase();
            })
            css += prop + ":" + value + ";";
        }
        if (styleSheet.insertRule) {
            styleSheet.insertRule(selector + "{" + css + "}", styleSheet.cssRules.length);
        } else {
            styleSheet.addRule(selector, css, styleSheet.cssRules.length);
        }
    }

    static countDown(target, fn) {
        // 假设传进来的目标时间是一个数组
        if (!(target instanceof Array)) {
            return false;
        }
        // 先创建年月日
        var date_ymd = target.slice(0, 3).join("/");

        // 在创建时分秒
        var date_hms = target.slice(3).join(":");

        // 然后把数组拼接成想要获得的字符串
        var date_str = date_ymd + " " + date_hms;
        // 然后创建一个时间对象
        var target_d = new Date(date_str);

        // 然后创建目标时间的时间戳
        var target_t = target_d.getTime();

        // 打开定时器获取当前时间，并做倒计时判断
        var t = setInterval(function () {
            // 获取当前时间，
            var now_date = new Date();
            // 获取当前时间戳
            var now_t = now_date.getTime();
            // 计算目标时间和当前时间的时间戳
            var reduce = target_t - now_t;
            // 如果当前时间相等或者小于
            if (reduce <= 0) {
                clearInterval(t);
                return false;
            }

            var d = parseInt(reduce / 1000 / 24 / 60 / 60);
            var h = parseInt(reduce / 1000 / 60 / 60 /24);
            var m = parseInt(reduce / 1000 / 60 % 60);
            var s = Math.round(reduce / 1000 % 60);
            fn({
                day: d,
                hours: h,
                min: m,
                sec: s
            });
        }, 1000);
    }
    static panduan(num){
        if(num<9){
            return "0"+num;
        }else if(num<0){
            return "00"
        }else{
            return num;
        }
    }
}