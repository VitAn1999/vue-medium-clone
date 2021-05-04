<template>
  <span>
    <router-link
      v-if="isAnonimus"
      :to="{ name: 'register' }"
      class="btn btn-sm action-btn ng-binding btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ username }}
    </router-link>
    <button
      v-if="!isFollowingOptimistic"
      @click="follow"
      class="btn btn-sm action-btn btn-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{ username }}
    </button>
    <button
      v-if="isFollowingOptimistic"
      @click="follow"
      class="btn btn-sm action-btn btn-outline-secondary"
    >
      <i class="ion-plus-round"></i>
      &nbsp; Unfollow {{ username }}
    </button>
  </span>
</template>

<script>
import { actionType } from '@/store/modules/followingProfile';
export default {
  name: 'AppFollowingProfile',
  props: {
    isAnonimus: {
      type: Boolean,
      require: true
    },
    isFollowing: {
      type: Boolean,
      require: true
    },
    username: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      isFollowingOptimistic: this.isFollowing
    };
  },
  methods: {
    follow() {
      this.$store.dispatch(actionType.followingProfile, {
        username: this.username,
        isFollowing: this.isFollowingOptimistic
      });
      this.isFollowingOptimistic = !this.isFollowingOptimistic;
    }
  }
};
</script>
