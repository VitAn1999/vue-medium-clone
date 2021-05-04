<template>
  <span>
    <button
      v-if="!description"
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

    <button
      v-if="description"
      @click="addFavorite"
      :class="{
        btn: true,
        'btn-sm': true,
        'btn-primary': isFavoritedOptimistic,
        'btn-outline-primary': !isFavoritedOptimistic
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      <span v-if="!isFavoritedOptimistic">Favorite</span>
      <span v-if="isFavoritedOptimistic">Unfavorite</span>
      Article
      <span>({{ favoritesCountOptimistic }})</span>
    </button>
  </span>
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
    },
    description: {
      type: Boolean,
      require: false
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
      this.$store
        .dispatch(actionType.addFavoriteArticle, {
          slug: this.slugArticle,
          isFavorited: this.isFavoritedOptimistic
        })
        .then(article => {
          this.favoritesCountOptimistic = article.favoritesCount;
          this.isFavoritedOptimistic = article.favorited;
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
