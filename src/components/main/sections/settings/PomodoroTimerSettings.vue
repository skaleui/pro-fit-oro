<template>
  <div class="container">
    <h2 class="text-center mb-5">Set your pomodoro timer</h2>
    <div class="mt-5 row justify-content-center align-times-center">
      <div class="col-md-5 col-sm-8">
        <set-timer :value="config.workingPomodoro" @valueChanged="setWorkingPomodoro"></set-timer>
        <div class="figure-caption">Pomodoro</div>
      </div>
      <div class="col-md-4 col-sm8">
        <set-timer :value="config.longBreak" @valueChanged="setLongBreak"></set-timer>
        <div class="figure-caption">Long Break</div>
      </div>
      <div class="col-md-4 col-sm8">
        <set-timer :value="config.shortBreak" @valueChanged="setShortBreak"></set-timer>
        <div class="figure-caption">Short Break</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import SvgCircleSector from '../timer/SvgCircleSector'
import SetTimer from '../timer/setTimer'
export default {
  computed: {
    ...mapGetters({
      config: 'getConfig'
    })
  },
  components: {
    SvgCircleSector,
    SetTimer
  },
  methods: {
    ...mapActions(['setWorkingPomodoro', 'setShortBreak', 'setLongBreak'])
  }
}
</script>
<style scoped lang="scss">
  .figure-caption {
    text-align: center;
  }
</style>
