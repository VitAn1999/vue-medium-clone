<template>
  <div class="settings-page" v-if="userData">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          ></app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="form.image"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="form.password"
                  placeholder="New Password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button
            @click="logout"
            type="button"
            class="btn btn-outline-danger"
            :disabled="isSubmitting"
          >
            Or click here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { getterType as authGetterType } from '@/store/modules/auth';
import { actionType as authActionType } from '@/store/modules/auth';
import AppValidationErrors from '@/components/ValidationErrors';

export default {
  name: 'AppSettings',
  components: { AppValidationErrors },
  computed: {
    ...mapState({
      isSubmitting: state => state.setting.isSubmitting,
      validationErrors: state => state.setting.validationErrors
    }),
    ...mapGetters({
      userData: authGetterType.userData
    }),
    form() {
      return {
        image: this.userData.image,
        username: this.userData.username,
        bio: this.userData.bio,
        email: this.userData.email,
        password: ''
      };
    },
    updatedUser() {
      if (this.form.password) {
        return {
          image: this.form.image,
          username: this.form.username,
          bio: this.form.bio,
          email: this.form.email,
          password: this.form.password
        };
      } else {
        return {
          image: this.form.image,
          username: this.form.username,
          bio: this.form.bio,
          email: this.form.email
        };
      }
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch(authActionType.updateCurrentUser, {
        updatedUser: this.updatedUser
      });
    },
    logout() {
      this.$store.dispatch(authActionType.logout).then(() => {
        this.$router.push({ name: 'home' });
      });
    }
  }
};
</script>
