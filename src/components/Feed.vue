<template>
  <div>
    <app-loader v-if="isLoading" />
    <app-error-message v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
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
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username }
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <app-add-favorite-article
              :isFavorited="article.favorited"
              :slugArticle="article.slug"
              :favoritesCount="article.favoritesCount"
            ></app-add-favorite-article>
          </div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <app-tag-list :tagList="article.tagList" />
        </router-link>
      </div>
      <app-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseUrl"
      />
    </div>
  </div>
</template>

<script>
import AppPagination from '@/components/Pagination';
import AppLoader from '@/components/Loader';
import AppErrorMessage from '@/components/ErrorMessage';
import AppTagList from '@/components/TagList';
import AppAddFavoriteArticle from '@/components/AddFavoriteArticle';

import { actionType } from '@/store/modules/feed';
import { mapState } from 'vuex';
import { LIMIT } from '@/helpers/constants';
import { parseUrl, stringify } from 'query-string';

export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      limit: LIMIT
    };
  },
  components: {
    AppPagination,
    AppLoader,
    AppErrorMessage,
    AppTagList,
    AppAddFavoriteArticle
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    currentFullUrl() {
      return this.$route.fullPath;
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * this.limit - this.limit;
    }
  },
  watch: {
    currentFullUrl() {
      this.fetchFeed();
    }
  },
  methods: {
    fetchFeed() {
      const parseApiUrl = parseUrl(this.apiUrl);
      const stringifiedQuery = stringify({
        ...parseApiUrl.query,
        limit: this.limit,
        offset: this.offset
      });
      const fullApiUrl = `${parseApiUrl.url}?${stringifiedQuery}`;
      this.$store.dispatch(actionType.getFeed, { apiUrl: fullApiUrl });
    }
  },
  mounted() {
    this.fetchFeed();
  }
};
</script>
