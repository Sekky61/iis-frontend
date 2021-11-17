export default {

    // payload: first_name, last_name, username, password, email
    register(context, { first_name, last_name, username, password, email }) {
        console.log(`Register ${username}`);

        const register_data = { first_name, last_name, username, password, email };

        return context.state.backend_api
            .post("/register", register_data)
            .then((response) => {
                let resp_obj = response.data;
                if (resp_obj.success) {
                    return true;
                } else {
                    return false; // todo return message
                }
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.log("Bad login");
                } else if (error.request) {
                    // no response
                    console.log("No response");
                } else {
                    // other error
                    console.log("Error", error.message);
                }
                return false;
            });
    },

    // payload: username, password
    login(context, { username, password }) {
        console.log(`Login ${username}`);

        const login_data = { username, password };

        return context.state.backend_api
            .post("/login", login_data)
            .then((response) => {
                let resp_obj = response.data;
                if (resp_obj.success) {
                    context.dispatch("set_logged_in", resp_obj);
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                this.error_message = error;
                if (error.response) {
                    // response outside of 2xx
                    console.log("Bad login");
                } else if (error.request) {
                    // no response
                    console.log("No response");
                } else {
                    // other error
                    console.log("Error", error.message);
                }
                return false;
            });
    }
}