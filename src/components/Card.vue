<template>
  <div class="card" draggable="true" @drop="onDrop"  @dragstart="onDragStart" @dragover.prevent>
    <div class="close-button" @click="removeCard">
      ×
    </div>
    <div class="body">
      {{ body }}
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: ['body', 'cardIndex'],
  computed: {
    movableToLeft () {
      return this.$parent.cardIndex > 0
    },
    movableToRight () {
      return this.listsCount > this.$parent.cardIndex + 1
    },
    ...mapGetters ([
      'listsCount'
    ])
  },
  methods: {
    removeCard () {
      this.$store.dispatch('removecard', { 
        from: this.$parent.listIndex,
        cardIndex: this.cardIndex 
      })
    },
    /*
    moveCardToRight () {
      if(this.movableToRight) {
        this.moveCardToList({
          from: {
            listIndex: this.$parent.index,
            cardIndex: this.index
          },
          to: {
            listIndex: this.$parent.index + 1,
            cardIndex: null
          }
        })
      }
    },
    moveCardToLeft () {
      if(this.movableToLeft) {
        this.moveCardToList({
          from: {
            listIndex: this.$parent.index,
            cardIndex: this.index
          },
          to: {
            listIndex: this.$parent.index - 1,
            cardIndex: null
          }
        })
      }
    },
    */
    onDragStart({ dataTransfer }) {
      dataTransfer.effectAllowed = 'move';
      dataTransfer.setData("application/json", JSON.stringify ({
        from: {
          listIndex: this.$parent.listIndex,
          cardIndex: this.cardIndex
        }
      }))
    },
    onDrop({ dataTransfer }) {
      const { from } = JSON.parse(dataTransfer.getData("application/json"))
      const to = {
        listIndex: this.$parent.listIndex,
        cardIndex: this.cardIndex
      }
      this.moveCard({ from, to })
    },
    ...mapMutations({
      moveCard: 'movecard',
    })
  }
}
</script>