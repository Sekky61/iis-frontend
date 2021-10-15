export default {
    state() {
        return {
            logged_in: false,
            user_data: undefined
        }
    },

    mutations: {
        set_logged_in(state, logged_in, user_data) {
            console.log(`Setting logged_in as ${logged_in}`);
            if (!logged_in) {
                user_data = undefined;
            }
            console.log(`Setting user_data as:`);
            console.dir(user_data);
            state.logged_in = logged_in;
            state.user_data = user_data;
        }
    }
};
