<template>
  <div class="container text-center">
    <div class="row justify-content-center">
      <svg-circle-sector class="col-sm-12 col-md-8 col-lg-6 col-xl-4" :angle="angle" :text="text"></svg-circle-sector>
    </div>
    <div class="controls">
      <div class="btn-group" role="group">
        <button @click="start" type="button" :class="{disabled: isStarted && !isPaused}" class="btn btn-link">Start</button>
        <button @click="pause" type="button" :class="{disabled: !isStarted || isPaused}" class="btn btn-link">Pause</button>
        <button @click="stop" type="button" :class="{disabled: !isStarted || isStopped}" class="btn btn-link">Stop</button>
      </div>
    </div>
  </div>
</template>
<script>
import SvgCircleSector from './SvgCircleSector'

const SECOND = 1000

function leftPad (value) {
  if (('' + value).length > 1) {
    return value
  }
  return '0' + value
}

function numberOfSecondsFromNow (startTime) {
  if (!startTime) {
    return 0
  }

  return Math.floor((Date.now() - startTime) / SECOND)
}
export default {
  props: ['time'],
  data () {
    return {
      timestamp: this.time,
      interval: null,
      isStarted: false,
      isPaused: false,
      isStopped: false,
      startTime: null,
      pauseTime: null,
      pauseSeconds: 0
    }
  },
  computed: {
    minutes () {
      return Math.floor(this.timestamp / 60)
    },
    seconds () {
      return this.timestamp % 60
    },
    angle () {
      return 360 - (360 / this.time * this.timestamp)
    },
    text () {
      return `${leftPad(this.minutes)}:${leftPad(this.seconds)}`
    }
  },
  components: {
    SvgCircleSector
  },
  methods: {
    _reset () {
      this.pauseTime = null
      this.isStarted = true
      this.isStopped = false
      this.isPaused = false

      if (this.interval) {
        clearInterval(this.interval)
      }
    },
    start () {
      if (this.isStarted === false) {
        this.timestamp = this.time
        this.startTime = Date.now()
      }
      this.pauseSeconds += numberOfSecondsFromNow(this.pauseTime)
      this._reset()
      this.interval = setInterval(() => {
        let secondsFromStart = numberOfSecondsFromNow(this.startTime)

        this.timestamp = this.time - secondsFromStart + this.pauseSeconds
        if (this.timestamp <= 0) {
          this.$emit('finished')
          this.timestamp = this.time
        }
      }, 10)

      this.isStarted = true
      this.isPaused = false
      this.isStopped = false

      this.interval = setInterval(() => {
        this.timestamp--
        if (this.timestamp === 0) {
          this.$emit('finished')
          this.timestamp = this.time
        }
      }, 1000)
    },
    pause () {
      this.pauseTime = Date.now()
      clearInterval(this.interval)
      this.isPaused = true
    },
    stop () {
      clearInterval(this.interval)
      this.timestamp = this.time
      this.isStarted = false
      this.isPaused = false
      this.isStopped = true
    }
  },
  watch: {
    time () {
      this.isStarted = false
      this.start()
    }
  }
}
</script>
<style scoped lang="scss">
  button {
    cursor: pointer;
  }
</style>
