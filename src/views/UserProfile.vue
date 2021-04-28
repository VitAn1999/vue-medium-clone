<template>
  <div class="profile-page">
    <div class="user-info" v-if="userProfile">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="userProfile.image" alt="avatar" class="user-img" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <router-link
              v-if="isCurrentUser"
              :to="{ name: 'settings' }"
              class="btn btn-sm btn-outline-secondary action-btn"
            >
              <i class="ion-gear-a"></i>
              Edit Profile Setting
            </router-link>
            <app-following-profile
              v-else
              :isAnonimus="isAnonimus"
              :isFollowing="userProfile.following"
              :username="userProfile.username"
            ></app-following-profile>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{ active: $route.name === `userProfile` }"
                  :to="{ name: 'userProfile' }"
                  >My Articles</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :class="{
                    active: $route.name === `userProfileFavorites`
                  }"
                  :to="{ name: 'userProfileFavorites' }"
                  >Favorite Articles</router-link
                >
              </li>
            </ul>
          </div>
          <app-feed :apiUrl="apiUrl"></app-feed>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionType as userProfileActionType } from '@/store/modules/userProfile';
import { getterType as authGetterType } from '@/store/modules/auth';
import { mapState, mapGetters } from 'vuex';
import AppFeed from '@/components/Feed';
import AppFollowingProfile from '@/components/FollowingProfile';
export default {
  name: 'AppUserProfile',
  components: {
    AppFeed,
    AppFollowingProfile
  },
  computed: {
    ...mapState({
      isLoading: state => state.userProfile.isLoading,
      error: state => state.userProfile.error,
      userProfile: state => state.userProfile.data
    }),
    ...mapGetters({
      currentUser: authGetterType.userData,
      isAnonimus: authGetterType.isAnonimus
    }),
    isCurrentUser() {
      if (!this.currentUser || !this.userProfile) {
        return false;
      }
      return this.userProfile.username === this.currentUser.username;
    },
    username() {
      return this.$route.params.slug;
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorited=${this.username}`
        : `/articles?author=${this.username}`;
    }
  },
  watch: {
    username() {
      this.fetchUserProfile();
    }
  },
  mounted() {
    this.fetchUserProfile();
  },
  methods: {
    fetchUserProfile() {
      this.$store.dispatch(userProfileActionType.getUserProfile, {
        username: this.username
      });
    }
  }
};
</script>
