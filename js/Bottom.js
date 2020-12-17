import Utils from "./Utils.js";
export default class Bottom {
    constructor() {
        this.init()
    }
    static obj = {
    	"阿里巴巴集团|": [" 阿里巴巴国际站 " ,"|1688|",  "全球速卖通" , "|淘宝网|" ," 天猫",  "|聚划算|" , "一淘" , "|飞猪|" , "阿里妈妈"  ,"|虾米|" , "阿里云计算 ", "|AliOS"],
"阿里通信|": [ "万网 " ,"|UC|" , "支付宝" , "|来往|" , "钉钉" , "|阿里健康|" , "一达通" ," |Lazada|" , "达摩院" , "|阿里安全"],
"关于阿里巴巴|":["联系我们" , "|知识产权保护|" , "著作权与商标声明 " ,"|法律声明|" , "服务条款" , "|隐私政策|" , "网站导航"],

"医疗器械网络交易服务第三方平台备案证:":["(浙)网械平台备字[2018]第00001号广播电视节目制作经营许可证:(浙)字第00523号增值电信业务经营许可证:浙B2-20120091"],

"浙江省网络食品销售第三方平台提供者备案:":["浙网食A33010005互联网药品信息服务资格证书:","(浙)-经营性-2017-0008浙公网安备 33010002000121号"]
}

    static batch(ele, data) {
        for (let attr in data) {
            let div = document.createElement("div")
            let li = document.createElement("li")
            li.textContent = attr;
            div.appendChild(li);
            for (let i = 0; i < data[attr].length; i++) {
                let li = document.createElement("li");
                let a = document.createElement("a");
                a.href = "#"
                a.textContent = data[attr][i];
                li.appendChild(a)
                div.appendChild(li);
            }
            ele.appendChild(div);
        }
    }
    init() {
        this.bottom = this.creatediv("bottom");
        this.bottom_left = this.creatediv("bottom-left");
        this.bottom_right = this.creatediv("bottom-right");
        // 添加
        this.bottom.appendChild(this.bottom_left)
        this.bottom.appendChild(this.bottom_right);
        this.bottom_left.appendChild(this.createImg("https://gw.alicdn.com/tps/TB1FWIJcYj1gK0jSZFuXXcrHpXa-364-64.png"));
        // 右边 图片部分
        this.point_img = this.creatediv("point-img");
        
        // 右边下面添加
        this.bottom_right_bottom = this.creatediv("bottom-right-bottom");
        Bottom.batch(this.bottom_right_bottom,Bottom.obj)
        this.bottom_right.appendChild(this.bottom_right_bottom);

        // 写样式
        Utils.setCss("#bottom-fill", {
            width: "100%",
            height: "400px",
            backgroundColor: "#ffffff"
        })
        Utils.setCss(".bottom", {
            width: "1190px",
            height: "400px",
            backgroundColor: "#ffffff",
            margin: "0 auto"
        })
        Utils.setCss(".bottom .bottom-left", {
            float: "left"
        })
        Utils.setCss(".bottom-left", {
            marginTop: "40px"
        })
        // 右半部分
        Utils.setCss(".bottom-right", {
            float: "right",
             backgroundColor: "#ffffff",
             width: "750px",
            height: "80%",
            marginTop: "30px",
        })
        Utils.setCss(".bottom-right .point-img", {
            textAlign: "center",
            padding: "30px 0",
            marginTop: "28px",
            borderBottom: "1px solid #949494"
        })
        // 又部分下面的样式
       
        Utils.setCss(".bottom-right-bottom div",{
            fontSize : "14px",
            clear:'both'
        })
       
        Utils.setCss(".bottom-right-bottom li",{
         color : "#666666",
           float: "left",
           margin: "0 10px"
        })
       
        Utils.setCss(".bottom-right-bottom li a",{
            color : "#666666"
        })
    }
    creatediv(className) {
        let elem = document.createElement("div");
        elem.className = className;
        return elem;
    }
    createImg(src) {
        let img = new Image();
        img.src = src;
        img.addEventListener("load", e => e.target);
        return img
    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        parent.appendChild(this.bottom)
    }
} 