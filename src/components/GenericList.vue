<template>
  <div class="rounded w-full bg-theyellow p-2">
    <div class="h-8 p-2">Table name</div>
    <table class="table-auto w-full border-collapse border border-theorange">
      <thead>
        <tr>
          <th></th>
          <th v-for="head in header" :key="head">{{ head[0] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row">
          <td>
            <input
              type="checkbox"
              @change.prevent="$emit('checkChange', $event)"
              :value="row.id"
              :checked="row.checked"
            />
          </td>
          <td v-for="i in header" :key="i" class="border border-theorange">
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