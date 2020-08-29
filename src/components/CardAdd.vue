<template>
  <form :class="classList" @submit.prevent="addCard" @drop="onDrop" @dragover.prevent>
    <input type="text" class="text-input" contenteditable="true" v-model="body" ref="textInput" placeholder="Add new card" @focusin="startEditing" @focusout="finishEditing">
    <button type="submit" class="btn btn-secondary" v-if="isEditing || isAddable">
      Add
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      body: '',
      isEditing: false
    }
  },
  computed: {
    classList () {
      const classList = ['addcard']

      if(this.isEditing) {
        classList.push('active')
      }
      if(this.bodyExists) {
        classList.push('addable')
      }

      return classList
    },
    bodyExists () {
      return this.body.length > 0
    },
    isAddable () {
      return this.bodyExists
    }
  },
  methods: {
    startEditing () {
      this.isEditing = true
    },
    finishEditing () {
      this.isEditing = false
    },
    addCard () {
      this.$store.dispatch('addcard', { 
        to: this.$parent.listIndex,
        body: this.body 
      })
      this.body = ''
    },
    onDrop ({ dataTransfer }) {
      const { from } = JSON.parse(dataTransfer.getData("application/json"));
      const to = {
        listIndex: this.$parent.listIndex,
        cardIndex: null
      }
      this.moveCard({ from , to })
    },
    ...mapMutations({
      moveCard: 'movecard'
    })

  }
  
}
</script>