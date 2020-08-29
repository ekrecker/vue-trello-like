import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const savedLists = localStorage.getItem('trello-lists')

const store = new Vuex.Store({
  state: {
    lists: savedLists ? JSON.parse(savedLists): [
      {
        title: 'Todo',
        cards: [
          { body: 'English' },
          { body: 'Mathematics' },
        ]
      },
      {
        title: 'Doing',
        cards: [
          { body: 'Science' }
        ]
      },
      {
        title: 'Done',
        cards: []
      }
    ],
  },
  mutations: {
    addlist(state, payload) {
      state.lists.push({ title: payload.title, cards:[] })
    },
    removelist(state, payload) {
      state.lists.splice(payload.listIndex, 1)
    },
    addcard(state, payload) {
      state.lists[payload.to].cards.push({ body: payload.body })
    },
    removecard(state, payload) {
      state.lists[payload.from].cards.splice(payload.cardIndex, 1)
    },
    movecard(state, { from, to }) {
      const targetCard = state.lists[from.listIndex].cards[from.cardIndex]
      
      state.lists[from.listIndex].cards.splice(from.cardIndex, 1)
      if(to.cardIndex === null) {
        state.lists[to.listIndex].cards.push(targetCard)
      } else {
        state.lists[to.listIndex].cards.splice(to.cardIndex, 0 , targetCard)
      }
    }
  },
  actions: {
    addlist(context, payload) {
      context.commit('addlist', payload)
    },
    removelist(context, payload) {
      context.commit('removelist', payload)
    },
    addcard(context, payload) {
      context.commit('addcard', payload)
    },
    removecard(context, payload) {
      context.commit('removecard', payload)
    },
  },
  getters: {
    listsCount: (state) => state.lists.length
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('trello-lists', JSON.stringify(state.lists))
})

export default store