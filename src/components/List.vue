<template>
  <div class="list">
    <div class="listheader">
      <p class="list-title">{{ title }}</p>
      <div class="deletelist" @click="removeList">×</div>
    </div>
    <div class="card-index">
      <card v-for="({id, body}, index) in cards" 
        :key="id"
        :body="body" 
        :cardIndex="index"
      />
      <card-add />
    </div>
  </div>
</template>

<script>
import CardAdd from './CardAdd'
import Card from './Card'
//import { mapState } from 'vuex'


export default {
  props: ['title', 'cards', 'listIndex'],
  components: {
    CardAdd,
    Card,
  },
  computed: {
  },
  methods: {
    removeList: function () {
      if(confirm('Do you delete this list?')) {
        this.$store.dispatch('removelist', { listIndex: this.listIndex })
      }
    },
  }
}
</script>