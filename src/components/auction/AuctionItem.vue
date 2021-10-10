<template>
  <div class="h-56 min-h-full flex">
    <div
      class="
        h-56
        w-56
        bg-red-500
        flex-none
        rounded-l-xl
        border-2 border-red-primary
      "
    >
      <img
        class="rounded-l-xl"
        src="/resources/mock-auction-picture.jpg"
        alt=""
      />
    </div>
    <div
      class="
        w-full
        flex flex-col
        rounded-r-xl
        pl-4
        border-2 border-red-primary border-l-0
      "
    >
      <div class="text-2xl py-4">{{ auction.name }}</div>
      <div class="text-4xl pb-4 font-extrabold">
        {{ auction.price + " Kč" }}
      </div>
      <div class="text-l">
        <div>Zbývá 1:48h</div>
        <div>4 příhozy za poslední hodinu</div>
      </div>
      <div class="py-3 flex flex-row gap-3">
        <div class="w-16 bg-red-secondary rounded-full text-center">tag1</div>
        <div class="w-16 bg-red-secondary rounded-full text-center">tag2</div>
        <div class="w-16 bg-red-secondary rounded-full text-center">tag3</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    auction: {
      name: String,
      price: Number,
    },
  },
};
</script>

<style>
</style>