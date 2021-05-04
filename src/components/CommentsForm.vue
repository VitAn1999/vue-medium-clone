<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div>
        <app-error-message
          v-if="errorMessages"
          :message="errorMessages"
        ></app-error-message>
        <form @submit.prevent="onSubmit" class="card comment-form">
          <div class="card-block">
            <textarea
              v-model="commentBody"
              rows="3"
              class="form-control"
              placeholder="Write a comment..."
            ></textarea>
          </div>
          <div class="card-footer" style="text-align: start;">
            <img
              :src="currentUser.image"
              alt="authorAvatar"
              class="comment-author-img"
            />
            <button class="btn btn-sm btn-primary" type="submit">
              Post comment
            </button>
          </div>
        </form>
      </div>
      <app-loader v-if="isLoading"></app-loader>
      <div v-if="articleComments">
        <div
          class="card"
          v-for="(comment, index) in articleComments"
          :key="index"
        >
          <div class="card-block">
            <p class="card-text">{{ comment.body }}</p>
          </div>
          <div class="card-footer">
            <router-link
              class="comment-author"
              :to="{
                name: 'userProfile',
                params: { slug: `${comment.author.username}` }
              }"
            >
              <img :src="comment.author.image" class="comment-author-img" />
            </router-link>
            &nbsp;
            <router-link
              class="comment-author"
              :to="{
                name: 'userProfile',
                params: { slug: `${comment.author.username}` }
              }"
            >
              {{ comment.author.username }}
            </router-link>
            <span class="date-posted">{{
              comment.createdAt | date('date')
            }}</span>
            <span
              class="mod-options"
              v-if="currentUser.username === comment.author.username"
            >
              <i
                class="ion-trash-a"
                :id="comment.id"
                @click="deleteComment"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionType } from '@/store/modules/articleComments';
import { mapState } from 'vuex';
import AppErrorMessage from '@/components/ErrorMessage';
import AppLoader from '@/components/Loader';
export default {
  name: 'AppCommentsForm',
  components: { AppErrorMessage, AppLoader },
  props: {
    currentUser: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      commentBody: ''
    };
  },
  computed: {
    ...mapState({
      articleComments: state => state.articleComments.comments,
      errorMessages: state => state.articleComments.errors,
      isLoading: state => state.articleComments.isLoading
    }),
    slug() {
      return this.$route.params.slug;
    }
  },
  methods: {
    rerenderComponent() {
      this.$store.dispatch(actionType.getArticleComments, {
        slug: this.$route.params.slug
      });
    },
    async onSubmit() {
      await this.$store.dispatch(actionType.postArticleComment, {
        slug: this.slug,
        commentBody: this.commentBody
      });
      this.commentBody = '';
      this.rerenderComponent();
    },
    async deleteComment(event) {
      console.log('delete comment');
      await this.$store.dispatch(actionType.deleteArticleComment, {
        slug: this.slug,
        id: event.target.id
      });
      this.rerenderComponent();
    }
  },
  mounted() {
    this.rerenderComponent();
  }
};
</script>
