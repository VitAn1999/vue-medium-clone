<template>
  <div>
    <app-loader v-if="isLoading" />
    <app-error-message v-if="error" :message="error.message" />
    <div class="article-page" v-if="article">
      <div class="banner" v-if="article">
        <div class="container">
          <h1>{{ article.title }}</h1>
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
              <span class="date">{{ article.createdAt }}</span>
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
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteArticle"
              >
                <i class="ion-trash-a"></i>
                Delete Article
              </button>
            </span>
          </div>
        </div>
      </div>
      <div class="container page">
        <div class="row article-content">
          <div class="col-xs-12">
            <div>
              <p>{{ article.body }}</p>
            </div>
            <app-tag-list :tagList="article.tagList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';

import { mapState, mapGetters } from 'vuex';
import { actionType as articleActionType } from '@/store/modules/article';
import { getterType as authGetterType } from '@/store/modules/auth';

export default {
  name: 'AppArticle',
  components: { AppLoader, AppErrorMessage, AppTagList },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      userData: authGetterType.userData
    }),
    isAuthor() {
      if (!this.userData.username || !this.article.author.username) {
        return false;
      } else {
        return this.userData.username === this.article.author.username;
      }
    },
    currentPage() {
      return this.$route.fullPath;
    }
  },
  watch: {
    currentPage() {
      this.rerenderPage();
    }
  },
  mounted() {
    this.rerenderPage();
  },
  methods: {
    rerenderPage() {
      this.$store.dispatch(articleActionType.getArticle, {
        slug: this.$route.params.slug
      });
    },
    deleteArticle() {
      this.$store
        .dispatch(articleActionType.deleteArticle, {
          slug: this.$route.params.slug
        })
        .then(() => {
          this.$router.push({ name: 'home' });
        });
    }
  }
};
</script>
