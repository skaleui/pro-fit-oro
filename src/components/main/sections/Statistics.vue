<template>
  <div>
    <h1>Statisics</h1>
    <p>Total Pomodoros: {{totalPomodoros}}</p>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      totalPomodoros: 'getTotalPomodoros'
    })
  }
}
</script>
<style scoped lang="scss">
</style>
