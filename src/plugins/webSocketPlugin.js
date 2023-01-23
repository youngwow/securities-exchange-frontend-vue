export default function createWebSocketPlugin (socket) {
    return (store) => {
        socket.on('updatingPrices', data => {
            store.commit('prices', data)
        })
    }
}