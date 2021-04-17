<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <app-loader v-if="isLoading" />
    <app-error-message v-if="error" />
    <div v-if="data" class="tag-list">
      <router-link
        :to="{ name: 'tag', params: { slug: tag } }"
        v-for="(tag, index) in data.tags"
        :key="index"
        class="tag-default tag-pill"
        >{{ tag }}</router-link
      >
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';

import { actionType } from '@/store/modules/tags';
import { mapState } from 'vuex';

export default {
  name: 'AppTags',
  props: {
    tagsUrl: {
      type: String,
      require: true
    }
  },
  components: { AppLoader, AppErrorMessage },
  computed: {
    ...mapState({
      isLoading: state => state.tags.isLoading,
      data: state => state.tags.data,
      error: state => state.tags.error
    })
  },
  mounted() {
    this.$store.dispatch(actionType.getTags, { tagsUrl: this.tagsUrl });
  }
};
</script>
