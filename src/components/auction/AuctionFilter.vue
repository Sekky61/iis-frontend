<template>
  <div class="text-center text-lg">
    <div>The filter component</div>
    <div>{{ category }} > {{ subcategory }}</div>
  </div>

  

  <div class="block py-10 px-4">
  <div class="mt-2 grid grid-cols-1 divide-y divide-yellow-500">
    <div class="py-4">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" checked />
          <span class="ml-2">Probíhající aukce</span>
        </label>
      </div>
     <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" checked />
          <span class="ml-2">Ukončené aukce</span>
        </label>
      </div>
    </div>
    <div class="py-4">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">Nabídkové aukce</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">Poptávkové aukce</span>
        </label>
      </div>
    </div>
    <div class="py-4">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">Uzavřené aukce</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">Otevřené aukce</span>
        </label>
      </div>
    </div>
     <div class="py-4">
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">....</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">...</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">...</span>
        </label>
      </div>
      <div>
        <label class="inline-flex items-center">
          <input type="checkbox" class="form-checkbox" />
          <span class="ml-2">...</span>
        </label>
      </div>


    </div>
    
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "subcategory"],
};
</script>

<style>
</style>