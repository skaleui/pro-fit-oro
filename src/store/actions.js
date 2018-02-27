import { firebaseAction } from 'vuexfire'

export default {
  setWorkingPomodoro ({commit, state}, workingPomodoro) {
    if (!workingPomodoro) {
      return
    }

    workingPomodoro = parseFloat(workingPomodoro)
    if (state.configRef) {
      state.configRef.update({workingPomodoro})
    } else {
      commit('setWorkingPomodoro', workingPomodoro)
    }
  },
  setShortBreak ({commit, state}, shortBreak) {
    if (!shortBreak) {
      return
    }
    shortBreak = parseFloat(shortBreak)
    if (state.configRef) {
      state.configRef.update({shortBreak})
    } else {
      commit('setShortBreak', shortBreak)
    }
  },
  setLongBreak ({commit, state}, longBreak) {
    if (!longBreak) {
      return
    }
    longBreak = parseFloat(longBreak)
    if (state.configRef) {
      state.configRef.update({longBreak})
    } else {
      commit('setLongBreak', longBreak)
    }
  },
  updateTotalPomodoros ({state}, totalPomodoros) {
    console.log(totalPomodoros)
    state.statisticsRef.update({totalPomodoros: totalPomodoros})
  },
  createUser ({state, dispatch}, {email, password}) {
    state.firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error.code, error.message)
      })
  },
  authenticate ({state, dispatch}, {email, password}) {
    console.log('authenticate - ' + email + ',' + password)
    state.firebaseApp.auth().signInWithEmailAndPassword(email, password)
  },
  authenticateAnonymous ({state}) {
    state.firebaseApp.auth().signInAnonymously()
      .catch(error => {
        console.log(error.code, error.message)
      })
  },
  logout ({state}) {
    state.firebaseApp.auth().signOut()
  },
  updateUserName ({state, commit}, displayName) {
    state.user.updateProfile({
      displayName
    })
    commit('setDisplayName', displayName)
  },
  updatePhotoURL ({state}, photoUrl) {
    state.user.updateProfile({
      photoUrl
    })
  },
  updateUserEmail ({state}, email) {
    state.user.updateEmail(email).then(() => {
      // Do nothing
    }, error => {
      console.log(error)
    })
  },
  bindAuth ({commit, dispatch, state}) {
    state.firebaseApp.auth().onAuthStateChanged((user) => {
      console.log('user = ' + user)
      commit('setUser', user)
      if (user && !user.isAnonymous) {
        commit('setDisplayName', user.displayName)
        dispatch('bindFirebaseReferences', user)
      }
      if (!user) {
        dispatch('unbindFirebaseReferences')
      }
    })
  },

  bindFirebaseReferences: firebaseAction(({bindFirebaseRef, state, commit, dispatch}, user) => {
    let db = state.firebaseApp.database()
    let configRef = db.ref(`/configuration/${user.uid}`)
    let statisticsRef = db.ref(`/statistics/${user.uid}`)
    dispatch('bindFirebaseReference', {reference: configRef, toBind: 'config'}).then(() => {
      commit('setConfigRef', configRef)
    })
    dispatch('bindFirebaseReference', {reference: configRef, toBind: 'statistics'}).then(() => {
      commit('setStatisticsRef', statisticsRef)
    })
  }),
  bindFirebaseReference: firebaseAction(({bindFirebaseRef, state}, {reference, toBind}) => {
    return reference.once('value').then(snapshot => {
      if (!snapshot.val()) {
        reference.set(state[toBind])
      }
      bindFirebaseRef(toBind, reference)
    })
  }),
  unbindFirebaseReferences: firebaseAction(({unbindFirebaseRef, commit}) => {
    commit('setConfigRef', null)
    commit('setStatisticsRef', null)
    try {
      unbindFirebaseRef('config')
      unbindFirebaseRef('statistics')
    } catch (error) {
      console.log('unbindFirebaseReferences', error)
    }
  }),
  bindConfig: firebaseAction(({bindFirebaseRef, state}) => {
    if (state.user && !state.isAnonymous) {
      bindFirebaseRef('config', state.configRef)
    }
  }),
  bindStatistics: firebaseAction(({bindFirebaseRef, state}) => {
    if (state.user && !state.isAnonymous) {
      bindFirebaseRef('statistics', state.statisticsRef)
    }
  })
}
