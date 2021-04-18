<template>
  <div class="container">
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
export default {
  name: 'AppErrorMessage',
  props: {
    message: {
      type: String,
      require: false,
      default: 'Something went wrong'
    }
  }
};
</script>
