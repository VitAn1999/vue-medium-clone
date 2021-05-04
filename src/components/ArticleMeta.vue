<template>
  <div class="article-meta">
    <router-link
      :to="{
        name: 'userProfile',
        params: { slug: article.author.username }
      }"
    >
      <img :src="article.author.image" />
    </router-link>
    <div class="info">
      <router-link
        class="author"
        :to="{
          name: 'userProfile',
          params: { slug: article.author.username }
        }"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ article.createdAt | date('date') }}</span>
    </div>
    <span v-if="isAuthor">
      <router-link
        class="btn btn-outline-secondary btn-sm"
        style="margin-right:5px"
        :to="{ name: 'editArticle', params: { slug: article.slug } }"
      >
        <i class="ion-edit"></i>
        Edit Article
      </router-link>
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
        <i class="ion-trash-a"></i>
        Delete Article
      </button>
    </span>
    <span v-else>
      <app-following-profile
        :isAnonimus="isAnonimus"
        :isFollowing="article.author.following"
        :username="article.author.username"
      ></app-following-profile>
      &nbsp;
      <app-add-favorite-article
        :isFavorited="article.favorited"
        :slugArticle="article.slug"
        :favoritesCount="article.favoritesCount"
        :description="descriptionForFavoriteArticle"
      ></app-add-favorite-article>
    </span>
  </div>
</template>

<script>
import { getterType as authGetterType } from '@/store/modules/auth';
import { mapGetters } from 'vuex';
import { actionType as articleActionType } from '@/store/modules/article';

import AppFollowingProfile from '@/components/FollowingProfile';
import AppAddFavoriteArticle from '@/components/AddFavoriteArticle';

export default {
  name: 'AppArticleMeta',
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  components: {
    AppFollowingProfile,
    AppAddFavoriteArticle
  },
  data() {
    return {
      descriptionForFavoriteArticle: true
    };
  },
  computed: {
    ...mapGetters({
      userData: authGetterType.userData,
      isAnonimus: authGetterType.isAnonimus
    }),
    isAuthor() {
      if (!this.userData.username || !this.article.author.username) {
        return false;
      } else {
        return this.userData.username === this.article.author.username;
      }
    }
  },
  methods: {
    deleteArticle() {
      this.$store
        .dispatch(articleActionType.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({
            name: 'userProfile',
            params: { slug: this.article.author.username }
          });
        });
    }
  }
};
</script>
