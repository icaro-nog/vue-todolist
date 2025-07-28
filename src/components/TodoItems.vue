<script setup>
    import TodoItem from './TodoItem.vue';
    import { useStore } from 'vuex';

    const store = useStore();

</script>

<template>
    <div class="space-y-2">
        <!-- enviando :todo via props para o componente filho -->
        <TodoItem
            v-for="todo in store.state.todos"
            :key="todo.id"
            :todo="todo"
        ></TodoItem>
    </div>
</template>