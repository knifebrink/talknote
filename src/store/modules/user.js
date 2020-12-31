
import {getToken, setToken, removeToken, setUserName} from '@/utils/auth'
import {getTalkUserPage} from "@/api/talk";

/**
 * 这按实时所所所啊啊啊啊按实时所所所所所所所所所所所
 */
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        getTalkUserPage({name:username}).then(response => {
          const data = response.data
          if(data&&data.length>0){
            setUserName(username)
            const tokenStr = username+Math.random()
            commit('SET_TOKEN', tokenStr)
            setToken(tokenStr)
            resolve()
          }else{
            console.log("aaaError")
            reject();
          }



        }).catch(error => {
          console.log(error)
          reject()
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {

      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
