import Main from "./Main.js"
import Ajax from "./Ajax.js"
export default class Cart{
    ul
    constructor(){
        Main.instance.checkLogin();
        this.init()
    }
    init(){
        Ajax.ajax("http://10.20.159.170:4002/getShoppingList");
        // this.allchecked = document.querySelector("#all")
        document.addEventListener("getShoppingList",e=>this.renderDom(e))
        document.addEventListener("changNums",e=>this.renderDom(e))
        document.addEventListener("delShopping",e=>this.renderDom(e))
        document.addEventListener("changeChecked",e=>this.renderDom(e))
        document.addEventListener("allcheck",e=>this.renderDom(e))
        this.ul = document.querySelector(".cart ul")
    }
    renderDom(e){
        this.ul.innerHTML = `<li>
        <ul>
            <li>
                <input type="checkbox" id="all"><label for="all">全选</label>
            </li>
            <li>
                商品
            </li>
            <li>
                规格
            </li>
            <li>
                单价
            </li>
            <li>
                数量
            </li>
            <li>
                小计
            </li>
            <li>
                操作
            </li>
        </ul>
    </li>`
        let data = e.data;
        data.forEach((item,index)=>{
            this.ul.innerHTML+=`<li>
                                    <ul>
                                        <li><input type="checkbox" ${item.checked? "checked":""}>
                                            <img src="${item.img}" ></li>
                                        <li>
                                            ${item.title}
                                        </li>
                                        <li>${item.size}</li>
                                        <li>￥${item.price}</li>
                                        <li><span>-</span><input type="text" value="${item.nums}"><span>+</span></li>
                                        <li>￥${item.total}</li>
                                        <li><span>删除</span></li>
                                    </ul>
                                </li>`
        });
        let flag =true
        data.forEach((item,index)=>{
            let input = document.querySelectorAll("input[type='text']")[index]
            let now = document.querySelectorAll(".cart>ul>li")[index+1]
            let reduce = now.querySelectorAll("span")[0];
            let add = now.querySelectorAll("span")[1];
            let del = now.querySelectorAll("span")[2];
            reduce.addEventListener("click",e=>this.changeNum(e,input,item))
            add.addEventListener("click",e=>this.changeNum(e,input,item))
            input.addEventListener("input",e=>this.inputHandler(e,item));
            del.addEventListener("click",e=>this.delHandler(e,item))

            let check = now.querySelector("input[type='checkbox']");
            check.addEventListener("click",e=>this.changeChecked(e,item))
            console.log(item.checked)
            if(!item.checked) flag = false
        });
        // 全选
        this.allchecked = document.querySelector("#all");
        this.allchecked.addEventListener("click",e=>this.allcheck(e))
        if(flag) this.allchecked.setAttribute("checked","checked")
    }
    changeNum(e,input,data){
        if(e.target.innerText ==="-"){
            input.value<2? input.value =1 : input.value--
        }else if(e.target.innerText === "+"){
            input.value>98? input.value =99 : input.value++
        }
        var o = {
            id:data.id,
            size : data.size,
            nums : parseInt(input.value)
        }
        Ajax.ajax("http://10.20.159.170:4002/changNums",o)
    }
    inputHandler(e,data){
        if(isNaN(e.target.value)) e.target.value = parseInt(e.target.value)
        e.target.value<1? e.target.value =1 : e.target.value;
        e.target.value>98? e.target.value =99 : e.target.value;
        var o = {
            id:data.id,
            size : data.size,
            nums : parseInt(e.target.value)
        }
        Ajax.ajax("http://10.20.159.170:4002/changNums",o)
    }
    delHandler(e,data){
        Ajax.ajax("http://10.20.159.170:4002/delShopping",{id : data.id,size : data.size})
    }
    changeChecked(e,data){
        var o = {
            id:data.id,
            size : data.size,
        }
        Ajax.ajax("http://10.20.159.170:4002/changeChecked",o)
    }
    allcheck(e){
        Ajax.ajax("http://10.20.159.170:4002/allcheck")
    }
}