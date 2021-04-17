<template>
  <div class="article-page" v-if="article">
    <div class="banner">
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
          <router-link
            class="btn btn-outline-secondary btn-sm"
            style="margin-right:5px"
            :to="{ name: 'editArticle', params: { slug: article.slug } }"
          >
            <i class="ion-edit"></i>
            Edit Article
          </router-link>
          <button class="btn btn-outline-danger btn-sm">
            <i class="ion-trash-a"></i>
            Delete Article
          </button>
        </div>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          TAGLIST
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { actionType } from '@/store/modules/article';
export default {
  name: 'AppArticle',
  computed: {
    ...mapState({
      isLoading: state => state.article.isLoading,
      error: state => state.article.error,
      article: state => state.article.data
    })
  },
  mounted() {
    this.$store.dispatch(actionType.getArticle, {
      slug: this.$route.params.slug
    });
  }
};
</script>
