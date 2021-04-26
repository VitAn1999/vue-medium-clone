<template>
  <button
    @click="addFavorite"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic
    }"
  >
    <i class="ion-heart"></i>
    &nbsp; <span>{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import { actionType } from '@/store/modules/favoriteArticle';
export default {
  name: 'AppAddFavoriteArticle',
  props: {
    isFavorited: {
      type: Boolean,
      require: true
    },
    favoritesCount: {
      type: Number,
      require: true
    },
    slugArticle: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount
    };
  },
  methods: {
    addFavorite() {
      this.$store.dispatch(actionType.addFavoriteArticle, {
        slug: this.slugArticle,
        isFavorited: this.isFavoritedOptimistic
      });
      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic--;
      } else {
        this.favoritesCountOptimistic++;
      }
      this.isFavoritedOptimistic = !this.isFavoritedOptimistic;
    }
  }
};
</script>
