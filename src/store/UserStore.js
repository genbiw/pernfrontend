import {makeAutoObservable} from "mobx"

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._selectedGender = ""
        makeAutoObservable(this)
    } 

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user 
    }

    setSelectedGender(gender){
        this._selectedGender = gender
    }

    get isAuth(){
        return this._isAuth
    }

    get user(){
        return this._user
    }

    get selectedGender(){
        return this._selectedGender
    }
    
}