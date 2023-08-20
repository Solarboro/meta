import { makeAutoObservable } from "mobx";
import http from "../utils/http";

class AccountStore{

    accountInfo = JSON.parse(localStorage.getItem("accountInfo")) || {}

    constructor(){
        makeAutoObservable(this);

    }

    updateAccountInfo = (entity)=>{
        this.accountInfo = {...entity}
    }

    // login
    accountLogin = ({account, pass})=> {
        return http.post("login", {account, pass}, {headers:{Authorization:null}})
        .then(res=>{
            this.updateAccountInfo(res.data)
            localStorage.setItem("accountInfo", JSON.stringify(res.data))
            return res.data;
        })
        ;
    }
    // newAccount
    // resetPass
    // updatePass
    // updateStatus
    // updateInfo
    // All Account
    // permission

}

const accountStore = new AccountStore();

export default accountStore;