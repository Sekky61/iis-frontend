function default_parse_response(req_promise) {
    return req_promise
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
}

export default {

    // payload: first_name, last_name, username, password, email
    register(context, payload) {
        console.log(`Register ${payload.username}`);
        const request = context.state.backend_api.post("/register", payload);
        return default_parse_response(request);
    },

    // payload: username, password
    login(context, payload) {
        console.log(`Login ${payload.username}`);

        return context.state.backend_api
            .post("/login", payload)
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

    // payload: nazev, vyvolavaci_cena, min_prihoz, pravidlo, typ, min_ucastniku, object      
    create_auction(context, form_data) {
        console.log(`Creating auction`);
        const request = context.state.backend_api.post("/user/auction", form_data);
        return default_parse_response(request);
    },

    // payload: nazev, vyvolavaci_cena, min_prihoz, pravidlo, typ, min_ucastniku, object      
    send_auction_picture(context, { auction_id, file }) {
        const formData = new FormData();
        formData.append('photo', file);

        console.log(`Sending picture to auction ${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/user/upload-photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return default_parse_response(request);
    },

    // payload: {auction_id}    
    get_auction(context, { auction_id }) {
        console.log(`Getting auction ${auction_id}`);
        const request = context.state.backend_api.get(`/auction/${auction_id}`);
        return default_parse_response(request);
    },

    // payload: {number, offset}  
    get_auctions(context, { number, offset }) {
        console.log(`Getting auctions ${number} | ${offset}`);
        const request = context.state.backend_api.get(`/auctions`, { params: { number, offset } });
        return default_parse_response(request);
    },

    // payload: {auction_id}
    user_can_join_auction(context, { auction_id }) {
        console.log(`Can user join ${auction_id}`);
        const request = context.state.backend_api.get(`/auction/${auction_id}/user/can-join`);
        return default_parse_response(request);
    },

    // payload: {auctions}
    user_can_join_auctions(context, { auctions }) {
        console.log(`Can user join ${auctions}`);
        const request = context.state.backend_api.post(`/user/can-join-auctions`, { auctions });
        return default_parse_response(request);
    },

    // payload: auction_id
    join_auction_request(context, auction_id) {
        console.log(`Joining auction #${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/user/join`);
        return default_parse_response(request);
    },

    // payload: {auction_id, bid}
    bid_auction(context, { auction_id, bid }) {
        console.log(`Bidding to auction #${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/user/bid`, { bid });
        return default_parse_response(request);
    },

    // payload: {auction_id}
    get_bids(context, { auction_id }) {
        console.log(`Getting bids auction #${auction_id}`);
        const request = context.state.backend_api.get(`/auction/${auction_id}/bids`);
        return default_parse_response(request);
    },

    get_session_info(context) {
        console.log(`Getting info`);

        return context.state.backend_api
            .get("/get-session-info")
            .then((response) => {
                let resp_obj = response.data;
                console.log(resp_obj.data)
                context.commit('set_user_fetched');
                context.dispatch('set_logged_in', resp_obj);
            })
            .catch((error) => {
                context.commit('set_user_fetched');
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
        const request = context.state.backend_api.post(`/admin/change-user-data`, payload);
        return default_parse_response(request);
    },

    // payload: id
    delete_user(context, id) {
        console.log(`Deleting user #${id}`);
        const request = context.state.backend_api.delete(`/admin/delete-user`, {
            data: {
                id
            }
        });
        return default_parse_response(request);
    },

    load_users_auctions(context) {
        console.log(`Fetching users auctions`);
        const request = context.state.backend_api.get("/user/my-auctions");
        return default_parse_response(request);
    },

    join_licit(context, { auction_id }) {
        console.log(`Licit joining auction #${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/licit/join`);
        return default_parse_response(request);
    },

    start_auction(context, { auction_id }) {
        console.log(`Licit starting auction #${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/licit/start`);
        return default_parse_response(request);
    },

    licit_confirm_user(context, { auction_id, user_id }) {
        console.log(`Licit confirming user ${user_id} on auction #${auction_id}`);
        const request = context.state.backend_api.post(`/auction/${auction_id}/licit/confirm`, { user_id });
        return default_parse_response(request);
    },

    list_participants(context, { auction_id }) {
        console.log(`Licit listing participants auction #${auction_id}`);
        const request = context.state.backend_api.get(`/auction/${auction_id}/licit/list-participants`);
        return default_parse_response(request);
    },

    user_exists(context, { username }) {
        console.log(`Does user ${username} exist?`);
        const request = context.state.backend_api.get(`/user-exists`, { params: { username } });
        return default_parse_response(request);
    },

    user_is_participating(context, { auction_id }) {
        console.log(`Does user participate in auction #${auction_id}?`);
        const request = context.state.backend_api.get(`/auction/${auction_id}/user/is-participating`);
        return default_parse_response(request);
    },

}