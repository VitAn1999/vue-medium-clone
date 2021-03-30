<template>
  <div>
    <ul class="error-messages">
      <li v-for="error in errorMessages" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    validationErrors: {
      type: Object,
      require: true
    }
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map(name => {
        const message = this.validationErrors[name].join(', ');
        return `${name} ${message}`;
      });
    }
  }
};
</script>
