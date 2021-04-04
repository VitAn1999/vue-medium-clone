<template>
  <div class="auth-page">
    <div class="container-page">
      <div class="row">
        <div class="col-md-4 offset-md-4 col-xs-12">
          <h1 class="text-xs-center">Sign In</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }"
              >Need an account?</router-link
            >
          </p>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button
              type="submit"
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from '@/components/ValidationErrors';
import { actionType } from '@/store/modules/auth';
export default {
  name: 'AppLogin',
  components: { AppValidationErrors },
  data() {
    return {
      email: this.email,
      password: this.password
    };
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting;
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors;
    }
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionType.login, {
          email: this.email,
          password: this.password
        })
        .then(user => {
          console.log('successfully login user: ', user);
          this.$router.push({ name: 'home' });
        });
    }
  }
};
</script>
