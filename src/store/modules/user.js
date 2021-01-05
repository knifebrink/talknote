
import {getToken, setToken, removeToken, setUserName} from '@/utils/auth'
import {getTalkUserPage, login} from "@/api/talk";

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
      const password = userInfo.password.trim();
      return new Promise((resolve, reject) => {
        login({name:username,password:password}).then(response => {
          const data = response.data
          const tokenStr = data.tokenHead+data.token
          setToken(tokenStr)
          setUserName(username);
          commit('SET_TOKEN', tokenStr)
          resolve()
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
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
          console.log("退出")
        }
      )
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
