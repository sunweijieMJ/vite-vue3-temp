import { createStore, Store } from 'vuex';
import vuexPersistedstate from 'vuex-persistedstate';
import basic from './modules/basic';
import { State } from './types';

const store: Store<State> = createStore({
    plugins: [vuexPersistedstate()],
    modules: {
        basic
    }
});

export default store;
