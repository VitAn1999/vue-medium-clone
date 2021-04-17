<template>
  <div class="text-center">{{ message }}</div>
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
