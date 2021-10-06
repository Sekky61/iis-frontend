import { reactive } from "vue";

export const store = reactive({
    logged_in: false
});

export const mutations = {
    set_logged_in(logged_in) {
        store.logged_in = logged_in;
    }
};
