<template>
  <div>
    <app-loader v-if="isLoading"></app-loader>
    <app-article-form
      v-if="article"
      :initial-data="initialData"
      :errors="validationErrors"
      :isSubmiting="isSubmiting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';
import AppLoader from '@/components/Loader';
import { mapState } from 'vuex';
import { actionType } from '@/store/modules/editArticle';
export default {
  name: 'AppEditArticle',
  components: { AppArticleForm, AppLoader },
  computed: {
    ...mapState({
      isLoading: state => state.editArticle.isLoading,
      isSubmiting: state => state.editArticle.isSubmiting,
      validationErrors: state => state.editArticle.validationErrors,
      article: state => state.editArticle.article
    }),
    initialData() {
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      };
    }
  },
  mounted() {
    this.$store.dispatch(actionType.getArticle, {
      slug: this.$route.params.slug
    });
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionType.editArticle, {
          slug: this.$route.params.slug,
          articleInput: articleInput
        })
        .then(
          this.$router.push({
            name: 'article',
            params: { slug: this.$route.params.slug }
          })
        );
    }
  }
};
</script>
