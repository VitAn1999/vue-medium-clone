<template>
  <div>
    <div v-if="isLoading" class="text-center">Loading...</div>
    <div v-if="error" class="text-center">Something went wrong...</div>
    FEED TOGGLE
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
          <div class="pull-xs-right">ADD FAVORITE ARTICLE</div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { actionType } from '@/store/modules/feed';
import { mapState } from 'vuex';
export default {
  name: 'AppFeed',
  props: {
    apiUrl: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    })
  },
  mounted() {
    this.$store.dispatch(actionType.getFeed, { apiUrl: this.apiUrl });
  }
};
</script>
