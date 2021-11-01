<template>
  <div>
    <label class="text-grey-darker text-sm font-bold pl-1">{{ label }}</label>
    <input
      class="
        focus:outline-none
        appearance-none
        rounded
        w-full
        mt-1
        py-2
        px-3
        text-grey-darker
        bg-white
        border
      "
      :type="type"
      :placeholder="placeholder"
      v-model="model"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(e) {
        this.$emit("fieldchange", e);
      },
    },
  },
};
</script>

<style>
.wrong input {
  border-color: red;
}
</style>