import { createStore } from 'vuex';
import compModule from './modules/comp.module';

const store = createStore({
    strict: true,
    modules: {
        compModule,
    },
});

export default store;
