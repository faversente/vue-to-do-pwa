import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    setTodos: (state, todos) => {
      state.todos = todos
    },

    addTodo: (state, todo) => {
      state.todos.push(todo)
    },

    removeTodo: (state, id) => {
      state.todos = state.todos.filter(todo => todo.id !== id)
    }
  },
  actions: {
    fetchTodos: async ({ commit }) => {
      let todos = await api.fetchTodos()
      commit('setTodos', todos)
    },

    updateTodo: async ({ commit }, todo) => {
      await api.updateTodo(todo)
    },

    createTodo: async ({ commit }, todo) => {
      let id = await api.createTodo(todo)
      todo.id = id
      commit('addTodo', todo)
    },

    deleteTodo: async ({ commit }, id) => {
      commit('removeTodo', id)
      await api.deleteTodo(id)
    }
  }
})
