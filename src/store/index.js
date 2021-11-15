import axios from 'axios';

export default {
    state() {
        return {
            logged_in: false,
            admin: false,
            user_data: undefined,

            notifications: [],

            tag_hierarchy: {
                Domy: { category_tag: "dům", tags: ["Se zahradou"] },
                Byty: {
                    category_tag: "byt", tags: ["1+kk", "2+kk", "3+kk", "4+kk"]
                },
                Zahrady: {
                    category_tag: "zahrada", tags: ["Malé", "střední", "Velké", "Kolonie", "S domkem"]
                },
                Pozemky: {
                    category_tag: "pozemek", tags: ["Pole"]
                },
                Komerční: {
                    category_tag: "komerční", tags: ["Kanceláře", "Malé prodejní prostory"]
                },
                Ostatní: { tags: ["Sklad"] },
            },
        }
    },

    actions: {
        increment(context) {
            context.commit('increment')
        },

        set_logged_in(context, payload) {
            let { success, message, data } = payload;
            let { logged_in, user_data } = data;

            context.commit('set_login', logged_in);
            context.commit('set_user_data', user_data);
        },

        log_out(context) {
            context.commit('set_login', false);
            context.commit('set_user_data', {});
        },

    },

    getters: {
        user_full_name: state => {
            if (!state.logged_in) {
                return undefined;
            }
            return `${state.user_data.first_name} ${state.user_data.last_name}`;
        },

        profile_pic: state => {
            if (!state.user_data) {
                return '';
            }
            if (!state.user_data.profile_photo_url) {
                return '';
            }
            return state.user_data.profile_photo_url;
        }
    },

    mutations: {

        raise_notif(state, notif_data) {
            // verify object notif_data
            console.log(`Notif ${notif_data.urgency}: ${notif_data.text}`);
            state.notifications.push(notif_data);
        },

        close_notif(state, notif_text) {
            const index = state.notifications.findIndex((el) => el.text == notif_text);
            if (index !== -1) {
                state.notifications.splice(index, 1);
            }
        },

        set_admin(state, admin) {
            console.log(`Setting admin as ${admin}`);
            state.admin = admin;
        },

        set_login(state, logged_in) {
            console.log(`Setting login as ${logged_in}`);
            state.logged_in = logged_in;
        },

        set_user_data(state, user_data) {
            console.log(`Setting user_data as:`);
            console.dir(user_data);
            state.user_data = user_data;

            if (user_data) {
                console.log(`Should be admin? ${user_data.user_type == 'admin'}`)
                state.admin = user_data.user_type == 'admin';
            } else {
                state.admin = false;
            }
        },
    }
};
