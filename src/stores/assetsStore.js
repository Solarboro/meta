import { makeAutoObservable } from "mobx";
import http from "../utils/http";


class AssestStore {

    assetsEntities = [];

    constructor(){
        makeAutoObservable(this)
    }

    // 
    init = () => {
        http.get("assets")
        .then(res=> this.assetsEntities = [...res.data])
        .catch(console.error);
    }

    // 
    newAsset = (entity) => {
        http.post("assets", entity)
        .then(res => this.init())
        .catch(console.error);
    }
    updateAsset = ({id, entity}) => {
        http.post(`assets/${id}`, entity)
        .then(res => this.init())
        .catch(console.error);
    }
    delAsset = (id) =>{
        http.delete(`assets/${id}`)
        .then(res => this.init())
        .catch(console.error);
    }

    //
    newTransaction = ({id,entity})=>{
        http.post(`/assets/${id}/transaction`, entity)
        .then(res => this.init())
        .catch(console.error);
    }
    updateTransaction = ({id,entity,tranId})=>{
        http.post(`/assets/${id}/transaction/${tranId}`, entity)
        .then(res => this.init())
        .catch(console.error);
    }

}


const assetsStore = new AssestStore();

export default assetsStore;