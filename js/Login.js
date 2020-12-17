import Main from "./Main.js"
export default class Login {
    constructor(){
        Main.instance.checkLogin();
        this.init()
        this.passwordHandler()
    }
    init(){
        this.password_login = document.querySelector(".password-login")
        this.phone_login = document.querySelector(".phone-login");
        this.phone_login.addEventListener("click",e => this.phoneHandler(e))
        this.password_login.addEventListener("click", e => this.passwordHandler(e))

        this.phone = Array.from(new Set(document.getElementsByClassName("phone")));
        this.pass_word = Array.from(new Set(document.getElementsByClassName("password")))

        this.btn = document.querySelector("input[type = 'button']");
        this.btn.addEventListener("click",e => this.btnHandler(e))
    }
    phoneHandler(){
        this.phone_login.style.color = "#482618";
        this.password_login.style.color = "#CEC9C9";
        this.phone.forEach( item => {
            item.style.display = "inline-block"
        })
        this.pass_word.forEach( item => {
            item.style.display = "none"
        })
    }
    passwordHandler(){
        this.phone_login.style.color = "#CEC9C9";
        this.password_login.style.color = "#482618";
        this.pass_word.forEach( item => {
            item.style.display = "inline-block"
        })
        this.phone.forEach( item => {
            item.style.display = "none"
        })
    }
    btnHandler(){
        if(!this.pass_word[0].value || !this.pass_word[1].value) return
        let a = {};
        a.account = this.pass_word[0].value;
        a.password = this.pass_word[1].value;
        this.ajax(a)
    }

    ajax(data) {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("load", e => this.loadHandler(e));
        xhr.open("POST", "http://10.20.159.170:4002/login");
        xhr.send(JSON.stringify(data))
    }
    loadHandler(e) {
        try {
            let a = JSON.parse(e.currentTarget.response);
            sessionStorage.name = a.name;
            location.href = "./index.html"
        } catch {
            alert("账户或密码错误");
        }
    }
}