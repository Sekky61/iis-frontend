export default {
    state() {
        return {
            logged_in: false,
            admin: false,
            user_data: undefined,
            filter_view: false,
        }
    },
    getters: {
        user_full_name: state => {
            if (!state.logged_in) {
                return undefined;
            }
            return `${state.user_data.first_name} ${state.user_data.last_name}`;
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
        },

        set_admin(state, admin) {
            console.log(`Setting admin as ${admin}`);
            state.admin = admin;
        },

        set_filter_view(state, filter_view) {
            console.log(`Setting filter_view as ${filter_view}`);
            state.filter_view = filter_view;
        },
    }
};
