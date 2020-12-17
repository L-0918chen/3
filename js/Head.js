import Utils from "./Utils.js";
export default class Head extends EventTarget{
    static _left = {
        "手机阿里": { "a": "#", className: "fa fa-mobile-phone" },
        "欢迎来到阿里巴巴": {},
        "请登录": { a: "../client/login.html", className: "fa fa-send-o" },
        "免费注册": { a: "../client/registe.html" }
    };
    static _right = {
        "1668首页": { "a": "../client/index.html" },
        "我的阿里": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#"
        },
        "进货单": { a:"../client/cartShopping.html" },
        "我的收藏": {
            a: "#",
            className: "fa fa-heart-o fa-2x",
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#"
        },
        "入驻诚信通": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        },
        "实力商家": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        },
        "工业品牌": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        },
        "我是供应商": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        },
        "客服中心": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        },
        "网页导航": {
            children: {
                "买家中心": { a: "#" },
                "已买到货品": { a: "#" },
                "优惠卷": { a: "#" },
                "发布询价单": { a: "#" },
                "店铺动态": { a: "#" }
            },
            a: "#",
            className: "fa fa-angle-down"
        }
    }
    constructor() {
        super()
        this.init()
    }
    init() {
        this.head = this.createElem("div");
        Utils.addClass(this.head, "head")
        Utils.addClass(this.head, "clearfix")
        this.head_left = this.createElem("div");
        Utils.addClass(this.head_left, "head-left")
        this.head_right = this.createElem("div");
        Utils.addClass(this.head_right, "head-right");
        // 添加样式
        Utils.setCss(".head-fill",{
            width: "100%",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #ddd",
        });
        Utils.setCss(".head",{
            width:"1190px",
            margin : "0 auto",
            height : "29px",
            backgroundColor : "#fff"
        });
        Utils.setCss(".head-left",{
            height:"29px",
            float:"left",
            fontSize : "12px",
            color :"#555",
            lineHeight:"29px"
        });
        Utils.setCss(".head-left a",{
            display: "inline-block",
            margin : "0 5px",
            color :"#555",
        });
        Utils.setCss(".head-left a:first-child",{
            paddingRight : "10px",
            borderRight:"1px solid #eee",
        });
        Utils.setCss(".head-left span",{
            display: "inline-block",
            padding : "0 5px",
            color :"#555",
        });
        Utils.setCss(".head a:hover",{
            color: "#ff7300",
            textDecoration: "underline",
        });
        Utils.setCss(".head-right",{
            height:"29px",  
            float:"right",
            lineHeight:"29px"
        })
        Utils.setCss(".head-right a",{
            fontSize : "12px",
            color :"#555",
        })
        Utils.setCss(".head-right>a",{
            position : "relative",
            padding : "0 11px",
            borderRight : "1px solid #eee",
            height:"29px",
            lineHeight:"29px",
            display:"inline-block"
        })
        Utils.setCss(".head-right div",{
            position : "absolute",
            backgroundColor : "#fff",
            top :"28px", 
            left:"0",
            zIndex:99,
            display:"none",
            border:"1px solid #eee" 
        })
        Utils.setCss(".head-right div>a",{
            display : "block" ,
            textIndent : "12px",
            width :"120px",
            height : "20px",
            lineHeight : "20px"
        })
        Utils.setCss(".head-right div>a:first-child",{
            fontWeight :"bold"
        })

        this.createElems(this.head_left,Head._left)
        this.createElems(this.head_right,Head._right)


        this.head.appendChild(this.head_left)
        this.head.appendChild(this.head_right);

    }
    createElem(type) {
        let elem = document.createElement(type);
        return elem;
    }
    appendTo(parent) {
        if (typeof parent === "string") parent = document.querySelector(parent);
        parent.appendChild(this.head)
    }
    createElems(parent,elemList){
        for(let prop in elemList){
            let elem;
            if(Object.keys(elemList[prop]).includes("a")){
                elem = this.createElem("a");
                elem.href = elemList[prop].a;
            }else{
                elem = this.createElem("span")
            }
            if(Object.keys(elemList[prop]).includes("className")){
                elem.className = elemList[prop].className;
                this.createElems(elem)
            }
            elem.textContent = prop
            if(Object.keys(elemList[prop]).includes("children")){
                let ele = this.createElem("div");
                this.createElems(ele,elemList[prop].children);
                elem.appendChild(ele);
                elem.addEventListener("mouseenter",this.mouseHandler)
                elem.addEventListener("mouseleave",this.mouseHandler)
            }
            parent.appendChild(elem)
        }
    }
    mouseHandler(e){
        if(e.target.lastChild.style.display === "block"){
            e.target.lastChild.style.display = "none"
        }else{
            e.target.lastChild.style.display ="block"
        }
    }
}