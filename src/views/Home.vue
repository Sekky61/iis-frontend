<template>
  <prohlizec></prohlizec>

  <label class="flex items-center space-x-3 pt-4">
    <input
      :checked="logged_in_state"
      @click="toggle_logged_in"
      type="checkbox"
      value="1"
      class="checkbox h-6 w-6"
    />
    <span class="text-gray-900 font-medium">Logged in</span>
  </label>
  <label class="flex items-center space-x-3 mt-2">
    <input
      :checked="has_licit_rights"
      @click="toggle_licit"
      type="checkbox"
      value="1"
      class="checkbox h-6 w-6"
    />
    <span class="text-gray-900 font-medium">Licit</span>
  </label>
  <label class="flex items-center space-x-3 mt-2">
    <input
      :checked="has_admin_rights"
      @click="toggle_admin"
      type="checkbox"
      value="1"
      class="checkbox h-6 w-6"
    />
    <span class="text-gray-900 font-medium">Admin</span>
  </label>

  <span>Notify</span>
  <div class="flex gap-1">
    <button
      class="rounded px-1 bg-red-400"
      @click="raise_notif({ text: 'Error message', urgency: 'error' })"
    >
      Error
    </button>
    <button
      class="rounded px-1 bg-yellow-400"
      @click="raise_notif({ text: 'Warning message', urgency: 'warning' })"
    >
      Warning
    </button>
    <button
      class="rounded px-1 bg-green-400"
      @click="raise_notif({ text: 'Success message', urgency: 'success' })"
    >
      Success
    </button>
    <button
      class="rounded px-1 bg-green-400"
      @click="
        raise_notif({
          text: 'Gratuluji k vyvolání velmi dlouhé zprávy. Je až absurdně dlouhá',
          urgency: 'success',
        })
      "
    >
      Long Success
    </button>
  </div>

  <img class="w-48" src="resources/logo_split.svg" alt="loading" />
  <span>Loading animation ^^</span>
</template>



<script type="module">
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import prohlizec from "../components/prohlizec.vue";

export default {
  name: "Home",
  components: { prohlizec },
  data() {
    return {
      data_user: {
        data: {
          logged_in: true,
          user_data: {
            first_name: "Joe",
            last_name: "Tsunami",
            username: "joey_small_wave97",
            email: "joestar@msn.com",
            user_type: "uzivatel",
          },
        },
      },

      data_licit: {
        data: {
          logged_in: true,
          user_data: {
            first_name: "Joe",
            last_name: "Tsunami",
            username: "joey_small_wave97",
            email: "joestar@msn.com",
            user_type: "licitator",
          },
        },
      },

      data_admin: {
        data: {
          logged_in: true,
          user_data: {
            first_name: "Joe",
            last_name: "Tsunami",
            username: "joey_small_wave97",
            email: "joestar@msn.com",
            user_type: "admin",
          },
        },
      },
    };
  },
  computed: {
    ...mapState({
      logged_in_state: "logged_in",
    }),
    ...mapGetters(["has_admin_rights", "has_licit_rights"]),
  },
  methods: {
    ...mapActions(["set_logged_in"]),
    ...mapMutations(["raise_notif"]),

    toggle_logged_in() {
      if (this.logged_in_state) {
        this.set_logged_in({
          data: {
            logged_in: false,
            user_data: null,
          },
        });
      } else {
        this.set_logged_in(this.data_user);
      }
    },

    toggle_admin() {
      if (this.user_type == "admin") {
        this.set_logged_in(this.data_user);
      } else {
        this.set_logged_in(this.data_admin);
      }
    },

    toggle_licit() {
      if (this.user_type == "licitator") {
        this.set_logged_in(this.data_user);
      } else {
        this.set_logged_in(this.data_licit);
      }
    },
  },
};
</script>
