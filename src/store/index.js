import { createStore } from 'vuex';
import toyModule from './modules/toy.module';

const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        toyModule,
    },
});

export default store;
