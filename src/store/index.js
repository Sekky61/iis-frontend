export default {
    state() {
        return {
            count: 0,
            logged_in: false,
        }
    },

    mutations: {
        increment(state) {
            state.count++
        },
        set_logged_in(state, logged_in) {
            console.log(`Setting logged_in as ${logged_in}`);
            state.logged_in = logged_in;
        }
    }
};
