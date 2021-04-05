import authAPI from '@/api/auth';
import { setItem } from '@/helpers/localStorage';

export const mutationType = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',

  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure'
};

export const actionType = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser'
};

export const getterType = {
  userData: '[auth] userData',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonimus: '[auth] isAnonimus'
};

export default {
  state: {
    isSubmitting: false,
    userData: null,
    isLoggedIn: null,
    validationErrors: null,
    isLoading: false
  },
  getters: {
    [getterType.userData](state) {
      return state.userData;
    },
    [getterType.isLoggedIn](state) {
      return !!state.isLoggedIn;
    },
    [getterType.isAnonimus](state) {
      return state.isLoggedIn === false;
    }
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
    },

    [mutationType.getCurrentUserStart](state) {
      state.isLoading = true;
      state.userData = null;
    },
    [mutationType.getCurrentUserSuccess](state, payload) {
      state.isLoading = false;
      state.userData = payload;
      state.isLoggedIn = true;
    },
    [mutationType.getCurrentUserFailure](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
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
    },
    [actionType.getCurrentUser](context) {
      return new Promise(resolve => {
        context.commit(mutationType.getCurrentUserStart);
        authAPI
          .getCurrentUser()
          .then(response => {
            context.commit(
              mutationType.getCurrentUserSuccess,
              response.data.user
            );
            resolve(response.data.user);
          })
          .catch(() => {
            context.commit(mutationType.getCurrentUserFailure);
          });
      });
    }
  }
};
