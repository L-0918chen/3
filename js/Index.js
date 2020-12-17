import Ajax from "./Ajax.js";
import Main from "./Main.js"
import Banner from "./Banner.js"
import Utils from "./Utils.js";
export default class Index{
    ul;
    html
    constructor(){
        Main.instance.checkLogin()
        new Banner();
        Utils.countDown([2020,10,1,0,0,0],(arg)=>this.timeEnd(arg))
        this.init();
    }
    init(){
        this.ul = document.querySelector(".good-list ul");
        Ajax.ajax("http://10.20.159.170:4002/goodList")
        document.addEventListener("goodList",e=>this.readerDom(e))
    }
    readerDom(e){
        let data = e.data
        for(let prop in data){
            this.html +=`<li>
            <a href="./detail.html?${data[prop]["offerId"]}">
                <img src="${data[prop]["od.offerPicUrl"]}">
                <p>
                    ${data[prop]["od.subject"]}
                </p>
                <h3><span>￥</span>${data[prop]["od.price"]}</h3>
                <div>
                    <span class="company">
                        ${data[prop]["offerOS.company"]}
                    </span>
                    <span class="province">
                        ${data[prop]["oCompany.bAddressProvince"]}
                        ${data[prop]["oCompany.bAddressCity"]}
                    </span>
                </div>
            </a>
        </li>`
        }
        this.ul.innerHTML = this.html
    }
    timeEnd(arg){
        var times = document.querySelectorAll(".timeend div span");
        times[0].innerText = this.panduan(arg.day)
        times[1].innerText = this.panduan(arg.hours)
        times[2].innerText = this.panduan(arg.min)
        times[3].innerText = this.panduan(arg.sec)
    }
    panduan(num){
        if(num<9){
            return "0"+num;
        }else if(num<0){
            return "00"
        }else{
            return num;
        }
    }
}