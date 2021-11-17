export default {

    // payload: first_name, last_name, username, password, email
    register(context, { first_name, last_name, username, password, email }) {
        console.log(`Register ${username}`);

        const register_data = { first_name, last_name, username, password, email };

        return context.state.backend_api
            .post("/register", register_data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.dir(error.response.data);
                    return error.response.data;
                } else if (error.request) {
                    // no response
                    console.log("No response");
                    return { success: false, message: "No response" };
                } else {
                    // other error
                    console.log("Error", error.message);
                    return { success: false, message: error.message };
                }
            });
    },

    // payload: username, password
    login(context, { username, password }) {
        console.log(`Login ${username}`);

        const login_data = { username, password };

        return context.state.backend_api
            .post("/login", login_data)
            .then((response) => {
                if (response.data.success) {
                    context.commit('set_login', response.data.data.logged_in);
                    context.commit('set_user_data', response.data.data.user_data);
                }
                return response.data;
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.dir(error.response.data);
                    return error.response.data;
                } else if (error.request) {
                    // no response
                    console.log("No response");
                    return { success: false, message: "No response" };
                } else {
                    // other error
                    console.log("Error", error.message);
                    return { success: false, message: error.message };
                }
            });
    },

    logout(context) {
        console.log(`Logout ${context.state.username}`);

        return context.state.backend_api
            .post("/logout")
            .then((response) => {
                if (response.data.success) {
                    context.commit('set_login', response.data.data.logged_in);
                    context.commit('set_user_data', response.data.data.user_data);
                }
                return response.data;
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.dir(error.response.data);
                    return error.response.data;
                } else if (error.request) {
                    // no response
                    console.log("No response");
                    return { success: false, message: "No response" };
                } else {
                    // other error
                    console.log("Error", error.message);
                    return { success: false, message: error.message };
                }
            });
    },

    // payload: username, password
    create_auction(context, form_data) {
        console.log(`Creating auction`);

        return context.state.backend_api
            .post("/user/auction", form_data)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.dir(error.response.data);
                    return error.response.data;
                } else if (error.request) {
                    // no response
                    console.log("No response");
                    return { success: false, message: "No response" };
                } else {
                    // other error
                    console.log("Error", error.message);
                    return { success: false, message: error.message };
                }
            });
    },
}