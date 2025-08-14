<script setup>
    import { ref } from 'vue';
    import { useStore } from 'vuex';

    const title = ref('')
    const store = useStore()

    // async function addTodo(){
    //     console.log('add chegou')

    //     try {
    //         await store.dispatch('addTodo', {
    //             title: title.value,
    //             completed: false
    //         })
    //         // title.value
    //     } catch(error) {
    //         console.error('Erro ao adicionar todo: ', error)
    //     }
    // }
    function addTodo(e){
        console.log('here', title.value)

        e.preventDefault(); // redundante, mas garante

        store.dispatch('addTodo', {
            title: title.value,
            completed: false
        }).catch(err => {
            console.error('Erro na action:', err);
        });
    }
</script>

<template>
    <form
        @submit.prevent="addTodo"
        class="flex items-center px-4 bg-gray-900 h-15 
        rounded-sm border-l-2 border-green-400 mb-3"
    >
        <input
            v-model="title"
            placeholder="Adicione um novo item ..."
            type="text"
            class="bg-gray-900 placeholder-gray-500 text-gray-500 
font-light focus:outline-none block w-full appearance-none leading-normal 
py-3 pr-3"
        >

        <button
            class="text-green-400 text-xs font-semibold 
focus:outline-none"
            type="submit"
        >
            ADICIONAR
        </button>
    </form>
</template>