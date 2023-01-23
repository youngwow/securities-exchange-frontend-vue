import {createStore} from 'vuex'
import io from "socket.io-client"
import createWebSocketPlugin from '@/plugins/webSocketPlugin'
import axios from "axios";
import createPersistedState from 'vuex-persistedstate'

const socketInstance = io('http://localhost:8001', { transports : ['websocket'] });
const webSocketPlugin = createWebSocketPlugin(socketInstance);

const store = createStore({
    state () {
        return {
            prices: [],
            users: [],
            currentUser: {
                stocks: []
            }
            //stockPortfolios: [] // { userId: number, labels: [{label: string, count: number}] }
        }
    },
    mutations: {
        prices(state, newPrices){
            state.prices = [...newPrices];
        },
        users(state, newUsers){
            state.users = [...newUsers];
        },
        currentUser(state, newUser){
            state.currentUser = newUser;
        }
        // stockPortfolios(state, newPortfolio){
        //     const { userId, labels } = newPortfolio;
        //     let isFound = false;
        //     for (const stockPortfolio of state.stockPortfolios) {
        //         if (stockPortfolio.userId === userId){
        //             stockPortfolio.labels = labels;
        //             isFound = true;
        //             break;
        //         }
        //     }
        //     if (!isFound){
        //         state.stockPortfolios.push(newPortfolio);
        //     }
        // }
    },
    actions: {
        GET_USERS: async (state) => {
            let { data } = await axios.get('http://localhost:4000/brokers');
            state.commit('users', data);
        },
        GET_USER: async (state, id) => {
            //console.log(id)
            let { data } = await axios.get(`http://localhost:4000/brokers/${id}`);
            console.log(data)
            state.commit('currentUser', data);
        },
        BUY_STOCK: async (state, buyStock) => {
            // console.log(buyStock)
            //
            // let { value } = buyStock;
            // //console.log(state.getters.getCurrentUser.name)
            // const currentUser = {
            //     name: state.getters.getCurrentUser.name,
            //     id: state.getters.getCurrentUser.id,
            //     value: value,
            //     stocks: state.getters.getCurrentUser.stocks
            // }
            // console.log(currentUser)
            const { id } = state.getters.getCurrentUser;
            let { data } = await axios.post(`http://localhost:4000/brokers/buyStock/${id}`, buyStock);
            console.log(data)
            state.commit('users', data)
            state.dispatch('GET_USER', id);
            //state.commit('currentUser', currentUser)
        },
        SELL_STOCK: async (state, sellStock) => {
            // console.log(sellStock)
            // let {value} = sellStock;
            // const currentUser = {
            //     name: state.getters.getCurrentUser.name,
            //     id: state.getters.getCurrentUser.id,
            //     value: value,
            //     stocks: state.getters.getCurrentUser.stocks
            // }
            // console.log(currentUser)
            console.log('inside sell')
            console.log(sellStock)
            const { id } = state.getters.getCurrentUser;
            console.log(id)
            let { data } = await axios.post(`http://localhost:4000/brokers/sellStock/${id}`, sellStock);
            console.log(data)
            state.commit('users', data)
            state.dispatch('GET_USER', id);
            //state.commit('currentUser', currentUser)
        }
    },
    getters: {
        getPrices(state) {
            return state.prices;
        },
        getUsers(state){
            return state.users;
        },
        getCurrentUser(state){
            return state.currentUser;
        },
        // getAllStockPortfolios(state){
        //     return state.stockPortfolios;
        // },
        // getStockPortfoliosById(state, id){
        //     return state.stockPortfolios.find(stockPortfolio => stockPortfolio.userId === id);
        // },
        isAdmin(state){
            return state.currentUser.id === 5; // TODO: id=5 только у меня (временное решение, fix that)
        }
    },
    plugins: [
        webSocketPlugin,
        createPersistedState({
            storage: window.sessionStorage,
        })
    ]
})

export { store }