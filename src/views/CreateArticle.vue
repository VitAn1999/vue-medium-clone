<template>
  <div>
    <app-article-form
      :initial-data="initialData"
      :errors="validationErrors"
      :isSubmiting="isSubmiting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';
import { mapState } from 'vuex';
import { actionType } from '@/store/modules/createArticle';
export default {
  name: 'AppCreateArticle',
  components: { AppArticleForm },
  data() {
    return {
      initialData: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    };
  },
  computed: {
    ...mapState({
      validationErrors: state => state.createArticle.validationErrors,
      isSubmiting: state => state.createArticle.isSubmiting
    })
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionType.createArticle, { articleInput })
        .then(article => {
          this.$router.push({
            name: 'article',
            params: { slug: article.slug }
          });
        });
    }
  }
};
</script>
