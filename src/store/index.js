import Axios from 'axios';
import api_actions from './api_actions';

function init_axios_api() {
    return Axios.create({
        baseURL: process.env.VUE_APP_BACKEND_URL + '/api' // baseURL: 'https://xmajer21-iis.herokuapp.com/api' // process.env.VUE_APP_BACKEND_URL + '/api'
    });
}

export default {
    state() {
        return {
            backend_api: init_axios_api(),

            user_fetched: false,
            logged_in: false,
            user_data: null,
            profile_pic: "/resources/profile_pic.webp",

            default_auction_picture_url: "/resources/logo_static.svg",

            notifications: [],

            tag_hierarchy: {
                Domy: {
                    category_tag: "Dům",
                    featured_tags: [
                        "Developerské projekty",
                        "Novostavba",
                        "Po rekonstrukci",
                        "S garáží",
                    ],
                    tags: [
                        "Se zahradou",
                        "1 pokoj",
                        "2 pokoje",
                        "3 pokoje",
                        "4 pokoje",
                        "5 pokojů",
                        "6 pokojů",
                        "Atypický",
                        "Ve výstavbě",
                        "Developerské projekty",
                        "Novostavba",
                        "K demolici",
                        "Po rekonstrukci",
                        "V rekonstrukci",
                        "Studna",
                        "S garáží",
                        "Balkon",
                        "Výtah",
                        "Sklep",
                        "Bezbariérový"
                    ]
                },
                Byty: {
                    category_tag: "Byt",
                    featured_tags: ["1+kk", "2+kk", "3+kk", "4+kk", "Balkon", "Sklep"],
                    tags: [
                        "1+kk",
                        "1+1",
                        "2+kk",
                        "2+1",
                        "3+kk",
                        "3+1",
                        "4+kk",
                        "4+1",
                        "5+kk",
                        "5+1",
                        "6 a více",
                        "Po rekonstrukci",
                        "Balkon",
                        "Parkování",
                        "Výtah",
                        "Sklep",
                        "Bezbariérový"
                    ]
                },
                Zahrady: {
                    category_tag: "Zahrada",
                    featured_tags: ["Studna", "Zahradní domek"],
                    tags: [
                        "Kolonie",
                        "Zahradní domek",
                        "Studna"
                    ]
                },
                Pozemky: {
                    category_tag: "Pozemek",
                    featured_tags: [
                        "Pole",
                        "Louka",
                        "Les",
                        "Rybník"
                    ],
                    tags: [
                        "Pole",
                        "Louka",
                        "Les",
                        "Rybník"
                    ]
                },
                Komerční: {
                    category_tag: "Komerční",
                    featured_tags: [
                        "Kanceláře",
                        "Prodejní prostor",
                        "Sklad",
                        "Restaurace",
                        "Ubytování"
                    ],
                    tags: [
                        "Kanceláře",
                        "Prodejní prostor",
                        "Sklad",
                        "Restaurace",
                        "Ubytování"]
                },
            },

            all_tags:
                [
                    "Byt",
                    "Dům",
                    "Zahrada",
                    "Pozemek",
                    "Komerční",
                    "1+kk",
                    "1+1",
                    "2+kk",
                    "2+1",
                    "3+kk",
                    "3+1",
                    "4+kk",
                    "4+1",
                    "5+kk",
                    "5+1",
                    "6 a více",
                    "1 pokoj",
                    "2 pokoje",
                    "3 pokoje",
                    "4 pokoje",
                    "5 pokojů",
                    "6 pokojů",
                    "Atypický",
                    "Ve výstavbě",
                    "Developerské projekty",
                    "Novostavba",
                    "K demolici",
                    "Po rekonstrukci",
                    "V rekonstrukci",
                    "Zahradní domek",
                    "Studna",
                    "Garáž",
                    "Balkon",
                    "Parkování",
                    "Výtah",
                    "Sklep",
                    "Bezbariérový",
                    "Kolonie",
                    "Pole",
                    "Louka",
                    "Les",
                    "Rybník",
                    "Sklad",
                    "Restaurace",
                    "Ubytování",
                    "Prodejní prostor",
                    "Kanceláře",
                    "Půda",
                    "Chata",
                    "Zámek",
                    "Hrad",
                    "<60m^2",
                    "60-80 m^2",
                    "80m^2 - 200m^2",
                    "200m^2 - 400m^2",
                    "> 400m^2",
                    "Se zahradou",
                    "S garáží",
                    "AKČNÍ"
                ]
        }
    },

    actions: {

        ...api_actions,

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

        new_notif(context, notif_data) {
            context.commit('raise_notif', notif_data);
            setTimeout(
                function () {
                    context.commit('close_notif', notif_data.text);
                }, 4000);
        }
    },

    getters: {

        has_admin_rights: state => {
            if (state.user_data) {
                return state.user_data.user_type == 'admin';
            } else {
                return false;
            }
        },

        has_licit_rights: state => {
            if (state.user_data) {
                return state.user_data.user_type == 'licitator' || state.user_data.user_type == 'admin';
            } else {
                return false;
            }
        },

        user_type: state => {
            if (state.user_data) {
                return state.user_data.user_type;
            } else {
                return '';
            }
        },

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

        set_login(state, logged_in) {
            console.log(`Setting login as ${logged_in}`);
            state.logged_in = logged_in;
        },

        set_user_fetched(state) {
            console.log(`Setting user_fetched`);
            state.user_fetched = true;
        },

        set_user_data(state, user_data) {
            console.log(`Setting user_data as:`);
            console.dir(user_data);
            state.user_data = user_data;
        },
    }
};
