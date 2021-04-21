<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <app-validation-errors
            v-if="errors"
            :validation-errors="errors"
          ></app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Title"
                  v-model="title"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  v-model="description"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="Write your article"
                  rows="8"
                  v-model="body"
                >
                </textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
              </fieldset>

              <button
                type="submit"
                class="btn btn-lg pull-xs-right btn-primary"
                :disabled="isSubmiting"
              >
                Public Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors';
export default {
  name: 'AppArticleForm',
  components: {
    AppValidationErrors
  },
  props: {
    initialData: {
      type: Object,
      require: true
    },
    errors: {
      type: Object,
      require: false
    },
    isSubmiting: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: ''
    };
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      };
      console.log(form);
      this.$emit('articleSubmit', form);
    }
  }
};
</script>
