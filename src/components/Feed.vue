<template>
  <div>FEED {{ apiUrl }}</div>
</template>

<script>
import { actionType } from '@/store/modules/feed';
export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      require: true
    }
  },
  mounted() {
    this.$store.dispatch(actionType.getFeed, { apiUrl: this.apiUrl });
  }
};
</script>
