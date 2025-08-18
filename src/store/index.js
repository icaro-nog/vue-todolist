import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        todos: []
    },
    mutations: {
        storeTodos(state, payload){
            state.todos = payload
        },
        storeTodo(state, payload){
            state.todos.push(payload)
        }
    },
    actions: {
        async getTodos({ commit }){
            try{
                const response = await axios.get('http://localhost:3000/todos')
                commit('storeTodos', response.data)
            } catch (error) {
                console.error('Erro ao buscar dados: ', error)
            }
        },

        addTodo(context, data){
            axios.post('http://localhost:3000/todos', data).then((response) => {
                this.commit('storeTodo', response.data)
            })
        },

        updateTodo(context, data){
            axios.put(`http://localhost:3000/todos/${data.value.id}`, data.value)
            // .then((response) => {
            //     commit('storeTodo', response.data)
            // })
        }
    },
    getters: {

    }
})