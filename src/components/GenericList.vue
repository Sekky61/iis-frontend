<template>
  <div class="rounded w-full bg-theyellow p-2 pt-6">
    <table class="table-auto w-full border-collapse border border-theorange">
      <thead>
        <tr>
          <th></th>
          <th v-for="head in header" :key="head">{{ head[0] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td class="text-center align-middle">
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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  emits: ["checkChange"],
  props: ["header", "rows"],
};
</script>

<style>
</style>