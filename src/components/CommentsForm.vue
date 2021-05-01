<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div>
        <app-validation-erorrs
          :validation-errors="validationErros"
        ></app-validation-erorrs>
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
      <div class="card">
        <div class="card-block">
          <p class="card-text"></p>
        </div>
        <div class="card-footer">
          <router-link class="comment-author">
            <img :src="image" class="comment-author-img" />
          </router-link>
          <router-link class="comment-author"> </router-link>
          <span class="date-posted"></span>
          <span class="mod-options">
            <i class="ion-trash-a" @click="deleteComment"></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCommentsForm',
  props: {
    currentUser: {
      type: Object,
      require: true
    }
  },
  mounted() {
    console.log(this.currentUser);
  }
};
</script>
