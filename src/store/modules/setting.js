import { mutationType as authMutationType } from '@/store/modules/auth';

export default {
  state: {
    isSubmitting: false,
    validationErrors: null
  },

  mutations: {
    [authMutationType.updateCurrentUserStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [authMutationType.updateCurrentUserSuccess](state) {
      state.isSubmitting = false;
    },
    [authMutationType.updateCurrentUserFailure](state, payload) {
      state.validationErrors = payload;
      state.isSubmitting = false;
    }
  }
};
