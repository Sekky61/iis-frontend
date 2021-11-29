<template>
  <!-- objekt, který může uživatel vybrat pro příhoz v poptávkové aukci -->
  <div class="relative rounded bg-theyellow shadow-xl p-6 w-97">
    <div v-if="object_picker">
      <div
        @click="$emit('closeSignal')"
        class="absolute right-3 w-8 h-8 rounded-full bg-red-500"
      >
        <div class="flex items-center justify-center w-8 h-8">
          <svg
            height="12"
            width="12"
            viewPort="0 0 2 2"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1"
              y1="11"
              x2="11"
              y2="1"
              stroke="black"
              stroke-width="2"
            />
            <line
              x1="1"
              y1="1"
              x2="11"
              y2="11"
              stroke="black"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      <h1 class="text-xl mb-4">Vyberte objekt</h1>
      <div class="flex flex-col gap-2">
        <div
          v-for="(obj, i) in objects"
          :key="obj.idobjektu"
          class="
            bg-theorange
            p-2
            rounded
            transform
            duration-150
            hover:-translate-y-0.5
          "
          :class="picked_object_index == i ? 'ring ring-green-400' : ''"
          @click="clickedObject(i)"
        >
          <h2 class="text-lg">{{ i }}) {{ obj.nazev }}</h2>
          <p class="truncate">{{ obj.popis }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- new object -->
      <create-object
        class="mx-auto"
        @objectData="onObjectChange"
      ></create-object>
    </div>
    <div class="my-3">
      <label class="text-sm font-bold pl-1">Cena</label>
      <input type="text" v-model="bid_price" class="input-field w-96" />
    </div>
    <div class="flex gap-4 justify-center my-4" v-if="object_picker">
      <button
        :disabled="!can_send"
        class="disabled:opacity-40 p-2 rounded bg-theorange"
        @click="send_picked_object"
      >
        Vybrat objekt
      </button>
      <button class="p-2 rounded bg-theorange" @click="toggle_picker">
        Vytvořit nový objekt...
      </button>
    </div>
    <div v-else class="flex gap-4 justify-center my-4">
      <!-- create object buttons -->
      <button class="p-2 rounded bg-theorange" @click="toggle_picker">
        Zpět
      </button>
      <button
        :disabled="!can_send"
        class="p-2 rounded bg-theorange disabled:opacity-40"
        @click="create_object_bid"
      >
        Vytvořit objekt a nabídnout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CreateObject from "./CreateObject.vue";

export default {
  components: { CreateObject },
  emits: ["closeSignal"],
  props: ["auction_id"],
  data() {
    return {
      objects: [],

      new_object: null,

      bid_price: "",

      object_picker: true,

      picked_object_index: null,
    };
  },
  computed: {
    bid_price_int() {
      return parseInt(this.bid_price);
    },

    new_object_valid() {
      if (!this.new_object) {
        return false;
      }
      return (
        this.new_object.address.length != 0 &&
        this.new_object.description.length != 0 &&
        this.new_object.name.length != 0
      );
    },

    can_send() {
      if (this.object_picker) {
        return this.picked_object_index != null && this.bid_price_int > 0;
      } else {
        // create auction
        return this.new_object_valid && this.bid_price_int > 0;
      }
    },
  },
  methods: {
    ...mapActions(["new_notif", "load_users_objects", "bid_auction"]),

    async create_object_bid() {
      let id_objektu = await this.dispatch_create_object();

      if (!id_objektu) {
        return null;
      }

      let success = await this.dispatch_create_bid(id_objektu);

      if (!success) {
        return null;
      }

      // all correct
      this.$emit("closeSignal");
    },

    // returns idobjektu
    async dispatch_create_object() {
      const object = {
        nazev: this.new_object.nazev,
        adresa: this.new_object.adresa,
        popis: this.new_object.popis,
      };
      const response = await this.create_object(object);

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return null; // dont send picture
      }

      // send picture

      const pic_response = await this.send_auction_picture({
        auction_id: this.auction_id,
        file: this.new_object.file,
      });

      if (pic_response.success) {
        // auction and pic success
        this.new_notif({
          text: pic_response.message,
          urgency: "success",
        });
      } else {
        // auction success pic fail
        this.new_notif({
          text: pic_response.message,
          urgency: "error",
        });
      }

      if (response.success) {
        return response.data; // idobjektu
      } else {
        return null;
      }
    },

    async dispatch_create_bid(id_objektu) {
      const bid = {
        bid: this.bid_price_int,
        object: id_objektu,
      };
      const response = await this.bid_auction({
        auction_id: this.auction_id,
        bid,
      });

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
      }

      return response.success;
    },

    clickedObject(i) {
      this.picked_object_index = i;
    },

    toggle_picker() {
      this.object_picker = !this.object_picker;
    },

    async load_my_objects() {
      const response = await this.load_users_objects();

      if (!response.success) {
        this.new_notif({
          text: response.message,
          urgency: "error",
        });
        return;
      }

      this.objects = response.data;
    },

    onObjectChange(value) {
      this.new_object = value;
    },

    async send_picked_object() {
      const id = this.objects[this.picked_object_index].idobjektu;
      const success = await this.dispatch_create_bid(id);

      if (!success) {
        return;
      }

      this.$emit("closeSignal");
    },
  },
  async mounted() {
    await this.load_my_objects();
  },
};
</script>

<style>
</style>