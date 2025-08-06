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
                const response = await axios.get('/api/todos')
                commit('storeTodos', response.data.todos)
            } catch (error) {
                console.error('Erro ao buscar dados: ', error)
            }
        },

        // bo ta aqui
        // async addTodo({ commit }, data){
        //     try{
        //         // const response = await axios.post('http://localhost:3000/todos', data, {
        //         //     headers: { 'Content-Type': 'application/json' },
        //         //     validateStatus: status => status < 400 // ignora 201+location
        //         // })

        //         // try {
        //         //     const response = await axios.get('/api/posts'); // Uses the namespace 'api' if set
        //         //     this.posts = response.data.posts;
        //         // } catch (error) {
        //         //     console.error('Error fetching posts:', error);
        //         // }

        //         await fetch('https://jsonplaceholder.typicode.com/todos', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-type': 'application/json; charset=UTF-8',
        //             },
        //             body: JSON.stringify(data)
        //         })

        //         // console.log('action addTodo')
        //         // commit('addTodo', response.data)
        //     } catch(error){
        //         console.error('Erro na action addTodo: ', error)
        //         throw error
        //     }
        // }


        addTodo(context, data){
            axios.post('/api/todos', data)
        }
    },
    getters: {

    }
})