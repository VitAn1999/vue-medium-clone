import authAPI from '@/api/auth';
import { setItem } from '@/helpers/localStorage';

export const mutationType = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
};

export const actionType = {
  register: '[auth] register',
  login: '[auth] login'
};

export default {
  state: {
    isSubmitting: false,
    userData: null,
    isLoggedIn: null,
    validationErrors: null
  },
  mutations: {
    [mutationType.registerStart](state) {
      state.isSubmitting = true;
      state.isLoggedIn = false;
    },
    [mutationType.registerSuccess](state, payload) {
      state.isSubmitting = false;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    [mutationType.registerFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoggedIn = null;
    },
    [mutationType.loginStart](state) {
      state.isSubmitting = true;
      state.isLoggedIn = false;
    },
    [mutationType.loginSuccess](state, payload) {
      state.isSubmitting = false;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    [mutationType.loginFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
      state.isLoggedIn = null;
    }
  },
  actions: {
    [actionType.register](context, payload) {
      return new Promise(resolve => {
        context.commit(mutationType.registerStart);
        authAPI
          .register(payload)
          .then(response => {
            context.commit(mutationType.registerSuccess, response.data.user);
            setItem('accessToken', response.data.user.token);
            resolve(response.data.user);
          })
          .catch(result => {
            context.commit(
              mutationType.registerFailure,
              result.response.data.errors
            );
          });
      });
    },
    [actionType.login](context, payload) {
      return new Promise(resolve => {
        context.commit(mutationType.loginStart);
        authAPI
          .login(payload)
          .then(response => {
            context.commit(mutationType.loginSuccess, response.data.user);
            setItem('accessToken', response.data.user.token);
            resolve(response.data.user);
          })
          .catch(result => {
            context.commit(
              mutationType.loginFailure,
              result.response.data.errors
            );
          });
      });
    }
  }
};
