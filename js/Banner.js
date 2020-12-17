export default class Banner{
    imgs;
    prev = 0;
    index = 0;
    left;
    right;
    ul;
    arr = ["家纺驾驶主会场","抢鲜加购","百货超级工厂","品质精选","家纺秋冬上线","淘货源","商人节主会场"];
    flag = false;
    i = 0
    constructor(){
        this.init()
    }
    init() {
        this.banner = document.querySelector(".banner-center")
        this.imgs = document.querySelectorAll(".banner-center img");
        this.imgs = Array.from(this.imgs);
        this.left = document.querySelectorAll(".banner-center a")[0]
        this.right = document.querySelectorAll(".banner-center a")[1];
        this.ul = document.querySelector(".banner-center ul");
        this.left.addEventListener("click",e=>this.leftHandler(e))
        this.right.addEventListener("click",e=>this.rightHandler(e));
        this.ul.addEventListener("mouseover",e=>this.dotHandler(e))
        this.createLi()
        this.changeImg();
        this.animate()
        this.banner.addEventListener("mouseover",e=>this.overHandler(e))
        this.banner.addEventListener("mouseout",e=>this.outHandler(e))
    }
    createLi(){
        for(let i =0 ;i <this.arr.length;i++){
            let li = document.createElement("li");
            li.textContent = this.arr[i];
            li.setAttribute("data-index",i)
            this.ul.appendChild(li);
        }
    }
    overHandler(){
        this.flag = true;
    }
    outHandler(){
        this.i = 0;
        this.flag = false;
    }
    leftHandler(e){
        this.index === 0 ? this.index = this.imgs.length-1 : this.index--;
        this.changeImg()
    }
    rightHandler(e){
        this.index === this.imgs.length-1 ? this.index = 0 : this.index++;
        this.changeImg()
    }
    dotHandler(e){
        if(!(e.target.nodeName === "LI")) return;
        this.index = e.target.getAttribute("data-index");
        this.changeImg()
    }
    changeImg(){
        this.imgs[this.prev].style.zIndex = 0
        this.imgs[this.prev].style.opacity = 0
        this.ul.children[this.prev].className = "";
        this.prev = this.index;
        this.imgs[this.prev].style.zIndex = 1
        this.imgs[this.prev].style.opacity = 1
        this.ul.children[this.prev].className = "active";
        this.i = 0;
    }
    animate(){
        requestAnimationFrame(e=>this.animate());
        if(this.flag) return;
        this.i++;
        if(this.i>=300){
            this.rightHandler()
        }
    }
}