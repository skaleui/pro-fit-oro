<template>
  <div class="container">
    <div class="row justify-content-center">
      <div v-show="!isWorking" class="col-sm-12 col-md-6 col-lg-4">
        <div class="jumbotron text-center">
          <div class="container">
            <img class="img-fluid rounded" src="../../../assets/pushups.png" alt="">
            <h2>Push ups </h2>
            <p class="lead">
              WORKOUT TIME !
            </p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 col-lg-8">
        <count-down-timer @finished="togglePomodoro" :time="time"></count-down-timer>
      </div>
    </div>
  </div>
</template>
<script>
import CountDownTimer from './timer/CountDownTimer'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      isWorking: true,
      isShortBreak: false,
      isLongBreak: false,
      pomodoros: 0
    }
  },
  computed: {
    ...mapGetters({
      config: 'getConfig',
      totalPomodoros: 'getTotalPomodoros'
    }),
    time () {
      let minutes

      if (this.isWorking) {
        minutes = this.config.workingPomodoro
      } else if (this.isShortBreak) {
        minutes = this.config.shortBreak
      } else if (this.isLongBreak) {
        minutes = this.config.longBreak
      }
      return minutes * 60
    }
  },
  methods: {
    ...mapActions(['updateTotalPomodoros']),
    togglePomodoro () {
      this.isWorking = !this.isWorking

      this.isShortBreak = this.isLongBreak = false

      if (this.isWorking) {
        return
      }

      this.pomodoros++
      this.updateTotalPomodoros(this.totalPomodoros + 1)
      this.isLongBreak = this.pomodoros % this.config.pomodorosTillLongBreak === 0
      this.isShortBreak = !this.isLongBreak
    }
  },
  components: {
    CountDownTimer
  }
}
</script>
<style scoped lang="scss">
</style>
