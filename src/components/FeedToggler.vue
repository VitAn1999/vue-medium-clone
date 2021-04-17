<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{ name: 'yourFeed' }"
          class="nav-link"
          :class="{ active: routerName === 'yourFeed' }"
          >Your Feed</router-link
        >
      </li>
      <li class="nav-item">
        <router-link
          :to="{ name: 'home' }"
          class="nav-link"
          :class="{ active: routerName === 'home' }"
          >Global Feed</router-link
        >
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{ name: 'tag' }"
          class="nav-link"
          :class="{ active: routerName === 'tag' }"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getterType } from '@/store/modules/auth';
export default {
  name: 'AppFeedToggler',
  props: {
    tagName: {
      type: String,
      require: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterType.isLoggedIn
    }),
    routerName() {
      return this.$route.name;
    }
  }
};
</script>
