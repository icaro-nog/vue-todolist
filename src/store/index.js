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
            const index = state.todos.findIndex(todo => todo.id === payload.id)

            if(index >= 0){
                // removendo um item na posição de index e substituindo pelo valor vindo do payload
                state.todos.splice(index, 1, payload)
            } else {
                // inserindo novo item
                state.todos.push(payload)
            }
        },

        deleteTodo(state, id){
            const index = state.todos.findIndex(todo => todo.id === id)

            if(index >= 0){
                // removendo um item na posição de index
                state.todos.splice(index, 1)
            } else {
                // inserindo novo item
                state.todos.push(payload)
            }
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

        updateTodo({ commit }, data){
            axios.put(`http://localhost:3000/todos/${data.value.id}`, data.value).then((response) => {
                commit('storeTodo', data.value)
            })
        },

        deleteTodo({ commit }, id){
            axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
                commit('deleteTodo', id)
            })
        }
    },
    getters: {

    }
})