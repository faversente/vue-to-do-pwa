<template>
  <v-container>
    <v-text-field outline clearable v-model="todo" label="Todo..." @keydown.enter="create">
      <v-fade-transition slot="append">
        <v-progress-circular v-if="loading" color="info" size="24" indeterminate></v-progress-circular>
      </v-fade-transition>
      <v-fade-transition slot="append">
        <v-icon v-if="todo" @click="create">add_circle</v-icon>
      </v-fade-transition>
    </v-text-field>

    <v-divider class="mt-3"></v-divider>

    <v-layout my-1 align-center>
      <strong class="mx-3 info--text text--darken-3">Remaining: {{ remainingTodos }}</strong>
      <v-divider vertical></v-divider>
      <strong class="mx-3 red--text">Completed: {{ completedTodos }}</strong>
      <v-spacer></v-spacer>
      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="todos.length > 0">
      <template v-for="(todo, i) in todos">
        <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

        <v-list-tile :key="`${i}-${todo.title}`">
          <v-list-tile-action>
            <v-checkbox v-model="todo.done" @change="updateTodo(todo)" color="info darken-3">
              <div
                slot="label"
                :class="todo.done && 'gray--text' && 'is-selected' || 'text--primary'"
                class="ml-3"
                v-text="todo.title"
              ></div>
            </v-checkbox>
          </v-list-tile-action>

          <v-spacer></v-spacer>

          <v-scroll-x-transition>
            <v-icon v-if="todo.done" color="success">check</v-icon>
          </v-scroll-x-transition>
          <v-icon @click="deleteTodo(todo.id)" color="gray">delete</v-icon>
        </v-list-tile>
        </template>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data: () => ({
    loading: false,
    todo: null
  }),
  async created () {
    await this.$store.dispatch('fetchTodos')
  },
  components: {},
  computed: {
    todos () {
      return this.$store.state.todos
    },

    completedTodos () {
      return this.todos.filter(todo => todo.done).length
    },
    progress () {
      return (this.completedTodos / this.todos.length) * 100
    },
    remainingTodos () {
      return this.todos.length - this.completedTodos
    }
  },
  methods: {
    async create () {
      this.loading = true
      let todo = {
        done: false,
        title: this.todo
      }

      await this.$store.dispatch('createTodo', todo)
      this.todo = null
      this.loading = false
    },

    async updateTodo (todo) {
      await this.$store.dispatch('updateTodo', todo)
    },

    async deleteTodo (id) {
      await this.$store.dispatch('deleteTodo', id)
    }
  }
}
</script>

<style scoped>
.is-selected {
  text-decoration: line-through;
}
</style>
