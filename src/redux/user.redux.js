import { getRedirectPath } from '../util'
import axios from 'axios'


const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
// const LOGOUT = 'LOGOUT'
const LOAD_DATA = 'LOAD_DATA'


const initState = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}//初始状态
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, msg: action.msg }
        case LOAD_DATA:
            return { ...state, msg: '', ...action.payload }
        default:
            return state
    }
}//reducer


function errorMsg(msg) {
    return {
        type: ERROR_MSG,
        msg
    }
}//actionCreator


function authSuccess(obj) {
    const { password, ...data } = obj
    return {
        type: AUTH_SUCCESS,
        payload: data
    }
}//actionCreator


export function register({ username, password, repeatpsw, type }) {
    console.log(username, password, repeatpsw, type)
    if (!username || !password)
        return errorMsg('账号和密码不能为空')
    if (password !== repeatpsw)
        return errorMsg('密码和确认密码不一致')
    return dispatch => {
        axios.post('/user/register', { username, password, type })
            .then(res => {
                if (res.status === 200 && res.data.code === 0)
                    dispatch(authSuccess(res.data.data))
                else{
                    console.log(res.data.msg)
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}//注册


export function loadData(userinfo) {
    return { type: LOAD_DATA, payload: userinfo }
}//加载userinfo到原有的state


export function update(userinfo) {
    const { avatar, title, money, desc, company } = userinfo
    // console.log('hello:',userinfo)
    return dispatch => {
        axios.post('/user/update', { avatar, title, money, desc, company })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    console.log(res.data.data)
                    dispatch(authSuccess(res.data.data))
                } else {
                    console.log(res.data.msg)
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

export function login(formuser) {
    const {username, password} = formuser
    if(!username || !password){
        console.log('账户密码不能为空')
        return errorMsg('账户密码不能为空')
    }
    return dispatch=>{
        axios.post('/user/login',{username,password})
            .then(res=>{
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                }else {
                    console.log(res.data.msg)
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}