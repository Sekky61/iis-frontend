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

    // payload: auction_id
    join_auction_request(context, auction_id) {
        console.log(`Joining auction #${auction_id}`);

        return context.state.backend_api
            .post(`/auction/${auction_id}/user/join`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {

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

    // payload: {auction_id, bid}
    bid_auction(context, { auction_id, bid }) {
        console.log(`Bidding to auction #${auction_id}`);

        return context.state.backend_api
            .post(`/auction/${auction_id}/user/bid`, { bid })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {

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

    get_session_info(context) {
        console.log(`Getting info`);

        return context.state.backend_api
            .get("/get-session-info")
            .then((response) => {
                let resp_obj = response.data;
                console.log("bar")
                console.log(resp_obj.data)
                context.dispatch('set_logged_in', resp_obj);
            })
            .catch((error) => {

                if (error.response) {
                    // response outside of 2xx
                    console.dir(error.response.data);
                    context.dispatch('set_logged_in', error.response.data); // unnecessary?
                } else if (error.request) {
                    // no response
                    console.log("No response");
                } else {
                    // other error
                    console.log("Error", error.message);
                }
            });
    },

    // payload: { "id": , "user_data": { "col": "value", ... } }
    change_user_data(context, payload) {
        console.log(`Changing user data of #${payload.id}`);

        return context.state.backend_api
            .post(`/admin/change-user-data`, payload)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {

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

    // payload: id
    delete_user(context, id) {
        console.log(`Deleting user #${id}`);

        // delete has different body syntax!
        return context.state.backend_api
            .delete(`/admin/delete-user`, {
                data: {
                    id
                }
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {

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