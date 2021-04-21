import { createStore, Store } from 'vuex';
import vuexPersistedstate from 'vuex-persistedstate';
import basic from './modules/basic';
import { BasicState } from './types';

export type State = {
    basic: BasicState
}

const store: Store<State> = createStore({
    plugins: [vuexPersistedstate()],
    modules: {
        basic
    }
});

export default store;
