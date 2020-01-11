/**
 * Временно храним список подсказок в json, до тех пор, пока не сделают хранение посказок в БД
 */
import localHintsMock from './temp_local_hints.json';
import globalHintsMock from './temp_global_hints.json';

import initHintsState from '../../../config/initHintsState';

const initState = new initHintsState();

const { localHints, globalHints } = initState;

export default {

    state: {
        localHints: localHints,
        globalHints: globalHints,
    },

    getters: {
        localHints(state) {
            return state.localHints;
        },
        globalHints(state) {
            return state.globalHints;
        },
    },

    mutations: {

        setLocalHints(state, hints) {
            state.localHints = hints;
        },

        setGlobalHints(state, hints) {
            state.globalHints = hints;
        }

    },

    actions: {
        loadHints({commit}) {

            /**
             * difine active hints
             * TODO
             */
            const currentPath = window.location.pathname.toString();

            let disabledList = localStorage.getItem('disabled-hints');
            let filteredGlobalHints = [];
            let filteredLocalHints = [];


            if(disabledList) {
                disabledList = disabledList.split(',');
                filteredGlobalHints = globalHintsMock.filter(hint => !disabledList.find(item => item === hint.target));

                if(localHintsMock[currentPath]) {
                    filteredLocalHints = localHintsMock[currentPath].filter(hint => !disabledList.find(item => item === hint.target));
                }
            } else {
                filteredGlobalHints = globalHintsMock;
                if(localHintsMock[currentPath]) {
                    filteredLocalHints = localHintsMock[currentPath];
                }
            }
            
            commit('setLocalHints', filteredLocalHints)
            commit('setGlobalHints', filteredGlobalHints)
        },

        disableHint({}, payload) {
            let disabledList = localStorage.getItem('disabled-hints');
            if(disabledList) {
                disabledList = disabledList.split(',');
       
                let exist = disabledList.find(item => item === payload);
                if(!exist) {
                    disabledList.push(payload);
                    localStorage.setItem('disabled-hints', disabledList);
                } 
            } else {
                localStorage.setItem('disabled-hints', [payload])
            }
        }
            
    },

}