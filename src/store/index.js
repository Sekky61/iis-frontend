export default {
    state() {
        return {
            logged_in: false,
            user_data: undefined
        }
    },

    mutations: {
        set_logged_in(state, payload) {
            let { logged, user_data } = payload;
            console.log(`Setting logged_in as ${logged}`);
            if (!logged) {
                user_data = undefined;
            }
            console.log(`Setting user_data as:`);
            console.dir(user_data);
            state.logged_in = logged;
            state.user_data = user_data;
        }
    }
};
