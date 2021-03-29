import authAPI from '@/api/auth';

export default {
  state: {
    isSubmitting: false,
    userData: null,
    isLoggedIn: null,
    validationErrors: null
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.isLoggedIn = false;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoggedIn = null;
    }
  },
  actions: {
    register(context, payload) {
      return new Promise(resolve => {
        context.commit('registerStart');
        authAPI
          .register(payload)
          .then(response => {
            context.commit('registerSuccess', response.data.user);
            resolve(response.data.user);
          })
          .catch(result => {
            context.commit('registerFailure', result.response.data.errors);
          });
      });
    }
  }
};
