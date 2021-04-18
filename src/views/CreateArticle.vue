<template>
  <div>
    <div>Create Article</div>
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
      },
      validationErrors: null,
      isSubmiting: false
    };
  },
  methods: {
    onSubmit(data) {
      console.log(data);
    }
  }
};
</script>
