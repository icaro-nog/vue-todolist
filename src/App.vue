<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { ref, reactive } from 'vue';
    import TodoSpinner from './components/TodoSpinner.vue';
    import TodoFormAdd from './components/TodoFormAdd.vue';
    import TodoItems from './components/TodoItems.vue';
    import TodoEmpty from './components/TodoEmpty.vue';
    import axios from 'axios';
    import { useStore } from 'vuex';

    const store = useStore()

    const loading = ref(true)

    store.dispatch('getTodos').finally(() => {
        loading.value = false
    })
</script>

<template>
  <body class="bg-gray-800">
      <div class="px-3 py-10 md:px-10">
          <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">
            <TodoSpinner
                v-if="loading"
            ></TodoSpinner>

            <template v-else>
                <TodoFormAdd></TodoFormAdd>
    
                <TodoItems></TodoItems>
    
                <TodoEmpty></TodoEmpty>
            </template>
          </div>
      </div>
  </body>
</template>

<style scoped>
</style>
