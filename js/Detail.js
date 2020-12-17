import Ajax from "./Ajax.js";
import Main from "./Main.js";
import Utils from "./Utils.js";
export default class Details {
    id; content;magnifier_list;box_magnifier;box_magnifier_img;focus;big_manifier;img_prev;prop;norms;change_prev;nums;data;submit
    constructor() {
        Main.instance.checkLogin()
        this.init();
        
    }
    init() {
        this.id = location.search.split("?").map(Number)[1]  || 605642393411;
        Ajax.ajax("http://10.20.159.170:4002/detalist", { id: this.id })
        Ajax.ajax("http://10.20.159.170:4002/imgs", { id: this.id })
        document.addEventListener("detalist", e => this.createDom(e))
        document.addEventListener("imgs", e => this.createMagnifier(e));
        this.box_magnifier_img = document.querySelector(".magnifier img");
        this.focus = document.querySelector(".scale");
        this.big_manifier = document.querySelector(".big_magnifier")
        this.box_magnifier = document.querySelector(".magnifier");
        this.box_magnifier.addEventListener("mouseover",e=>this.mouseHandler(e));
        this.prop =  380/parseInt(getComputedStyle(this.focus).width)  
        // 右边大图大小
        this.big_manifier.style.backgroundSize = parseInt(380*this.prop) + "px"

        // 选择规格 
        this.norms = document.querySelector(".content-right-four");
        this.norms.addEventListener("click",e=>this.changeHandler(e));
        // 倒计时
        Utils.countDown([2020,10,1,0,0,0],(arg)=>{
            var times = document.querySelectorAll(".advert-right span");
            times[0].innerText = Utils.panduan(arg.day)
            times[1].innerText = Utils.panduan(arg.hours)
            times[2].innerText = Utils.panduan(arg.min)
            times[3].innerText = Utils.panduan(arg.sec)
        })

        /* 选择数量 */
        this.nums = document.querySelector(".content-right-five input")
        this.nums.addEventListener("input",e=>this.inputHandler(e))
        this.numsClickHandler();
        
        // 加购物车
        this.submit = document.querySelector(".content-right button")
        this.submit.addEventListener("click",e=>this.submitHandler(e))

        document.addEventListener("addgoods",e=>this.nihao(e))

    }
    createDom(e) {
        this.data = e.data
        let h2 = document.querySelector(".content h2");
        h2.innerHTML = `<h2 class="clearfix">
                            <img src="https://gw.alicdn.com/tfs/TB1IuMATuH2gK0jSZJnXXaT1FXa-72-20.png" alt="" srcset="">
                            ${this.data["od.subject"]}
                            <span>本产品采购属于商业贸易行为</span>
                        </h2>`
        let norms = document.querySelector(".content-right-four")
        let lis = this.data["sceneTagServiceForLike.content"].other
        document.querySelector("#price").textContent = this.data["od.price"]
        let norms_html = `规格尺寸`;
        for(let prop in lis){
            norms_html+=`<span>${lis[prop].content}</span>`
        }
        norms.innerHTML = norms_html
        this.changenorm(this.norms.children[0]);
    }
    createMagnifier(e) {
        this.magnifier_list = document.querySelector(".content-left ul")
        let data = e.data;
        let liet_html=``;
        data.forEach(item=>{
            liet_html+= `<li data-src="${item}"><img src="${item}" alt=""></li>`
        })
        this.magnifier_list.innerHTML = liet_html;
        this.magnifier_list.addEventListener("mouseover",e=>this.tabsHandler(e))
        // 初始化第一张图
        this.changeImg(this.magnifier_list.children[0].children[0])

    }
    tabsHandler(e){
        if(e.target.nodeName != "IMG") return;    
        this.changeImg(e.target)
    }
    changeImg(img){
        // 选项卡改变
        if(this.img_prev)this.img_prev.className = "";
        this.img_prev = img;
        this.img_prev.className = "active"
        let src = img.src;
        src = src.split("/resize")[0]
        this.box_magnifier_img.src =src;
        this.big_manifier.style.backgroundImage = `url(${src})`
    }

    // 鼠标事件
    mouseHandler(e){
        if(e.type === "mouseover"){
            this.focus.style.display = "block"
            this.big_manifier.style.display = "block"
            this.box_magnifier.addEventListener("mousemove",e=>this.mouseHandler(e))
            this.box_magnifier.addEventListener("mouseout",e=>this.mouseHandler(e))
        }else if(e.type === "mousemove"){
            let offset = Details.getOffset(this.box_magnifier)
            let _left = e.pageX - offset.left -89.5
            let _top = e.pageY - offset.top -89.5
            _left = Details.useBountry(_left,0, 201)
            _top = Details.useBountry(_top,0, 201)
            this.focus.style.left = _left +"px"
            this.focus.style.top = _top +"px";
            this.big_manifier.style.backgroundPositionX = -this.prop*_left +"px"
            this.big_manifier.style.backgroundPositionY = -this.prop*_top +"px"
        }else{
            this.focus.style.display = "none"
            this.big_manifier.style.display = "none"
            this.box_magnifier.removeEventListener("mousemove",e=>this.mouseHandler(e))
            this.box_magnifier.removeEventListener("mouseout",e=>this.mouseHandler(e))
        }
    }

    static getOffset(dom){
        var res = {
            left:0,
            top:0
        }
        while(dom!=document.body){
            res.left+=dom.offsetLeft;
            res.top+=dom.offsetTop;
            dom = dom.offsetParent
        }
        return res
    }
    static useBountry(pos,min,max){
        if(pos<min) return min;
        if(pos>max) return max;
        return pos
    }

    changeHandler(e){
        if(e.target.nodeName !== "SPAN") return
        this.changenorm(e.target)
    }
    changenorm(elem){
        if(this.change_prev) this.change_prev.className = ""
        this.change_prev = elem;
        this.change_prev.className = "active"
    }

    numsClickHandler(){
        let spans = document.querySelectorAll(".content-right-five span");
        let reduce = spans[1]
        let add = spans[2];
        reduce.addEventListener("click",e=>this.numchange(e));
        add.addEventListener("click",e=>this.numchange(e));
        
    }
    numchange(e){
        if(e && e.target.innerText === "-"){0
            this.nums.value<1? this.nums.value =0 : this.nums.value--
        }else if(e && e.target.innerText === "+"){
            this.nums.value>98? this.nums.value =99 : this.nums.value++
        }
    }
    inputHandler(e){
        if(isNaN(this.nums.value)) this.nums.value = parseInt(this.nums.value)
        this.nums.value<1? this.nums.value =0 : this.nums.value;
        this.nums.value>98? this.nums.value =99 : this.nums.value;
    }
    submitHandler(e){
        if(this.nums.value ==0 ) return
        let o = {
            id: this.data.offerId,
            checked:false,
            img:this.data["od.offerPicUrl"],
            title : this.data["od.subject"],
            size : this.change_prev.textContent,
            price : parseInt(this.data["od.price"]),
            nums : parseInt(this.nums.value),
            total : this.data["od.price"] * this.nums.value
        }
        Ajax.ajax("http://10.20.159.170:4002/addgoods",o)
    }
    nihao(e){
        location.href = "./cartShopping.html"
    }
} 