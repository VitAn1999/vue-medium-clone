<template>
  <div id="app">
    <app-topbar></app-topbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppTopbar from '@/components/Topbar';
import { actionType } from '@/store/modules/auth';
export default {
  components: {
    AppTopbar
  },
  mounted() {
    this.$store.dispatch(actionType.getCurrentUser);
  }
};
</script>
