import Main from "./Main.js"
export default  class Registe{
    // {name:"1",account:"1233zx4",password:"12345"}
    constructor(){
        Main.instance.checkLogin();
        this.init()
    }
    init(){
        this.ipt = document.querySelectorAll("input");
        this.btn = document.querySelector("input[type='button']");
        this.btn.addEventListener("click",e=> this.btnHandler(e))
    }
    btnHandler(e){
        var o = {}
        o.name = this.ipt[1].value
        o.account = this.ipt[0].value
        o.password = this.ipt[2].value
        this.ajax(o);
    }
    ajax(data) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", e => this.loadHandler(e));
        xhr.open("POST", "http://10.20.159.170:4002/registe");
        xhr.send(JSON.stringify(data))
    }
    loadHandler(e) {
        if(e.currentTarget.response === "该账户已被注册"){
            alert(e.currentTarget.response);
            return
        };
        alert(e.currentTarget.response);
        location.href = "./login.html"
    }
}