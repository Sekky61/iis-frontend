<template>
  <h1 class="text-xl text-center">Seznam mých aukcí</h1>
   <h2 class="text-lg">Probíhající aukce</h2>
    <div>
      <user-list :users="[1,2,3]"></user-list>
    </div>
    <h2 class="text-lg">Skončené aukce</h2>
    <div>
      <user-list :users="[1,2,3]"></user-list>
    </div>
 
</template>

<script>
import UserItem from "../../components/userlist/UserItem.vue";
import UserList from "../../components/userlist/UserList.vue";

export default {
  components: { UserItem , UserList},
  data() {
    return {
      
    };
  },

  computed: {

  },

  methods: {
    
  },
};
</script>

