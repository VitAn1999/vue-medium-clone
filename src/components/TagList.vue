<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="(tag, index) in tagList"
      :key="index"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppTagList',
  props: {
    tagList: {
      type: Array,
      require: false
    }
  }
};
</script>
