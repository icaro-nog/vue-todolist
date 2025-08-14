import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        todos: []
    },
    mutations: {
        storeTodos(state, payload){
            state.todos = payload
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

        // async addTodo({ commit }, data){
        //     try{
        //         // const response = await axios.post('http://localhost:3000/todos', data, {
        //         //     headers: { 'Content-Type': 'application/json' },
        //         //     validateStatus: status => status < 400 // ignora 201+location
        //         // })

        //         await fetch('http://localhost:3000/todos', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify(data)
        //         })
        //         console.log('action addTodo')
        //         // commit('addTodo', response.data)
        //     } catch(error){
        //         console.error('Erro na action addTodo: ', error)
        //         throw error
        //     }
        // }


        addTodo(context, data){
            axios.post('http://localhost:3000/todos', data)
        }
    },
    getters: {

    }
})