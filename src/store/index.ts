import { createStore } from 'vuex';
import basic from './modules/basic';
import vuexPersistedstate from 'vuex-persistedstate';

const store: any = createStore({
    plugins: [vuexPersistedstate()],
    modules: {
        basic
    }
});

export default store;
