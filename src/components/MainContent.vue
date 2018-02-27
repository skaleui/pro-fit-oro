<template>
  <div>
    <header-component></header-component>
    <content-component></content-component>
    <footer-component></footer-component>
  </div>
</template>

<script>
import {ContentComponent, FooterComponent, HeaderComponent} from './main'

export default {
  components: {
    HeaderComponent,
    ContentComponent,
    FooterComponent
  }
}
</script>
<style>
</style>
