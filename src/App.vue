<template>
  <div id="app">
    <h1>Welcome to Profitoro</h1>
    <landing-page v-if="!user"></landing-page>
    <main-content v-if="user"></main-content>
  </div>
</template>

<script>
import LandingPage from './components/LandingPage'
import MainContent from './components/MainContent'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    LandingPage,
    MainContent
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['bindAuth'])
  },
  created () {
    this.bindAuth()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
