<template>
  <div id="app">
    <board />
  </div>
</template>

<script>
import Board from './components/Board.vue'
import './assets/css/styles.css'

export default {
  name: 'app',
  components: {
    Board
  } 
}
</script>