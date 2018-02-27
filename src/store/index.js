import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import firebase from 'firebase'
import { firebaseMutations } from 'vuexfire'
Vue.use(Vuex)

let config = {
  databaseURL: 'https://pomodoro-skale.firebaseio.com',
  apiKey: 'AIzaSyCkNVMJGoOKqbYK0MPrgb43apGk5NRP3GU',
  authDomain: 'pomodoro-skale.firebaseapp.com'
}
let firebaseApp = firebase.initializeApp(config)
let db = firebaseApp.database()
let configRef = db.ref('/configuration/test')
let statisticsRef = db.ref('/statistics/test')

export default new Vuex.Store({
  state: {
    ...state,
    firebaseApp,
    configRef,
    statisticsRef
  },
  getters,
  mutations: {
    ...mutations,
    ...firebaseMutations
  },
  actions
})
