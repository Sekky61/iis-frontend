import axios from 'axios';

export default {
    state() {
        return {
            logged_in: false,
            admin: false,
            user_data: undefined,
            filter_view: false,

            tag_hierarchy: {
                Domy: ["Se zahradou"],
                Byty: ["1+kk", "2+kk", "3+kk", "4+kk"],
                Zahrady: ["Malé", "střední", "Velké", "Kolonie", "S domkem"],
                Pozemky: ["Pole"],
                Komerční: ["Kanceláře", "Malé prodejní prostory"],
                Ostatní: ["Garáž", "Sklad"],
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
            context.dispatch('get_profile_picture');
        },

        get_profile_picture(context) {
            console.log(`getting profile pic`);

            let url = `/user/${context.state.user_data.username}/profile-pic`; // todo change endpoint

            // todo workaround and not tested
            axios.get(process.env.VUE_APP_BACKEND_URL + '/api' + url)
                .then(response => response.blob())
                .then(imageBlob => {
                    // Then create a local URL for that image and print it 
                    const imageObjectURL = URL.createObjectURL(imageBlob);
                    console.log("Response saved as: " + imageObjectURL);
                    context.commit('set_profile_picture', imageObjectURL);
                })
                .catch((error) => {
                    console.log("pic fetch error: ");
                    console.log(error);
                    console.log("Setting default profile picture");
                    // set default
                    context.commit('set_profile_picture', '/resources/profile_pic.webp');
                });
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
        },

        set_profile_picture(state, pic_url) {
            console.log(`Setting profile_photo_url as ${pic_url}`);
            state.user_data.profile_photo_url = pic_url;
        },

        set_filter_view(state, filter_view) {
            console.log(`Setting filter_view as ${filter_view}`);
            state.filter_view = filter_view;
        },
    }
};
