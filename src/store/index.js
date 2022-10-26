import { createStore } from 'vuex';
import compModule from './modules/comp.module';

const store = createStore({
    strict: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        compModule,
    },
});

export default store;
