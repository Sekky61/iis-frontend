<template>
  <div class="rounded w-full bg-theyellow p-2 pt-6 overflow-y-auto">
    <table class="table-auto w-full border-collapse border border-theorange">
      <thead>
        <tr>
          <th v-if="checkboxes !== undefined"></th>
          <th v-for="head in header" :key="head">{{ head[0] }}</th>
          <!-- <th v-if="auctionLinks !== undefined">Odkaz</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td class="text-center align-middle" v-if="checkboxes !== undefined">
            <input
              type="checkbox"
              @change.prevent="$emit('checkChange', $event)"
              :value="row.id"
              :checked="row.checked"
              class="checkbox w-5 h-5"
            />
          </td>
          <td v-for="i in header" :key="i" class="border border-theorange pl-1">
            {{ row[i[1]] }}
          </td>
          <td v-if="auctionLinks !== undefined">
            <a class="hover:underline" :href="`/auction/${row.cisloaukce}`"
              >Odkaz</a
            >
          </td>
          <td v-if="objectPopups !== undefined">
            <div class="hover:underline" @click="sendShowObjectPopup(row.id)">
              Detail objektu
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  emits: ["checkChange", "showObjectPopup"],
  props: ["header", "rows", "checkboxes", "auctionLinks", "objectPopups"],
  methods: {
    sendShowObjectPopup(id) {
      this.$emit("showObjectPopup", id);
    },
  },
};
</script>

<style>
</style>