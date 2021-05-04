<template>
  <div>
    <app-loader v-if="isLoading" />
    <app-error-message v-if="error" :message="error.message" />
    <div class="article-page" v-if="article">
      <div class="banner" v-if="article">
        <div class="container">
          <h1>{{ article.title }}</h1>
          <app-article-meta :article="article"></app-article-meta>
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
        <hr />
        <div class="article-actions">
          <app-article-meta :article="article"></app-article-meta>
        </div>
        <app-comments-form :current-user="userData"></app-comments-form>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';
import AppCommentsForm from '@/components/CommentsForm';
import AppArticleMeta from '@/components/ArticleMeta';

import { mapState, mapGetters } from 'vuex';
import { actionType as articleActionType } from '@/store/modules/article';
import { getterType as authGetterType } from '@/store/modules/auth';

export default {
  name: 'AppArticle',
  components: {
    AppLoader,
    AppErrorMessage,
    AppTagList,
    AppCommentsForm,
    AppArticleMeta
  },
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    }),
    ...mapGetters({
      userData: authGetterType.userData
    }),
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
    }
  }
};
</script>
