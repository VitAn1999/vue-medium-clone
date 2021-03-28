import authAPI from '@/api/auth';

export default {
  state: {
    isSubmitting: false
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
    },
    registerSuccess(state) {
      state.isSubmitting = false;
    },
    registerFailure(state) {
      state.isSubmitting = false;
    }
  },
  actions: {
    register(context, payload) {
      return new Promise(resolve => {
        context.commit('registerStart');
        authAPI
          .register(payload)
          .then(response => {
            console.log(response);
            context.commit('registerSuccess', response.data.user);
            resolve(response.data.user);
          })
          .catch(e => {
            console.log(e);
            context('registerFailure', e.response.data.errors);
          });
      });
    }
  }
};
