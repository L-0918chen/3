import Head from "./Head.js"
import Bottom from "./Bottom.js"
export default class Main {
    constructor() {
        this.init();
        // Main.instance.checkLogin();
    }
    static get instance() {
        if (!Main._instance) {
            Object.defineProperty(Main, "_instance", {
                value: new Main()
            })
        }
        return Main._instance;
    }
    init() {
        let bottom = new Bottom();
        bottom.appendTo("#bottom-fill");
    }
    checkLogin() {
        if (!sessionStorage.name) {
            let head = new Head();
            head.appendTo("#head-fill");
            return
        }
        delete Head._left["请登录"]
        delete Head._left["免费注册"]
        Head._left[sessionStorage.name + "已登录"] = {};
        let head = new Head();
        head.appendTo("#head-fill");
    }
}