import compService from '@/services/comp.service.js';

export default {
    state: {
        comps: [],
        // filterBy: {
        //     name: '',
        //     departmentId: ''
        // }
    },
    getters: {
        comps(state) {
            return state.comps;
        },
        miniComps(state) {
            return state.comps.map(comp => ({_id: comp._id, name: comp.name}));
        },
        // compsToShow(state) {
        //     var comps = state.comps;
        //     var {name} = state.filterBy
        //     if (name) {
        //         const regex = new RegExp(name, 'i')
        //         comps = comps.filter((comp) => regex.test(comp.name));
        //     }

        //     // if (departmentId) {
        //     //     comps = compsanies.
        //     // }
        //     return comps;
        // },
    },
    mutations: {
        setComps(state, { comps }) {
            state.comps = comps;
        },
        // removeComp({ comps }, { id }) {
        //     const idx = comps.findIndex((comp) => comp._id === id);
        //     comps.splice(idx, 1);
        // },
        // saveComp({ comps }, { comp }) {
        //     const idx = comps.findIndex((currComp) => currComp._id === comp._id);
        //     idx === -1 ? comps.push(comp) : comps.splice(idx, 1, comp);
        // },
        // setFilter(state, { filterBy }) {
        //     state.filterBy = filterBy;
        // },
    },
    actions: {
        async loadComps({ commit }) {
            try {
                const comps = await compService.query();
                commit({ type: 'setComps', comps });
            } catch (err) {
                console.log("can't load comps:", err);
            }
        },
        //     async removeComp({ commit }, { id }) {
        //         try {
        //             await compService.remove(id);
        //             commit({ type: 'removeComp', id });
        //         } catch (err) {
        //             console.log('cannot remove comp', err);
        //         }
        //     },
        //     async saveComp({ commit }, { comp }) {
        //         try {
        //             const savedComp = await compService.save(comp);
        //             commit({ type: 'saveComp', comp: savedComp });
        //             return savedComp;
        //         } catch (err) {
        //             console.log(`can't save comp ${comp_id || ''}: ${err}`);
        //         }
        //     },
        //     async getCompById(context, { compId }) {
        //         try {
        //             return await compService.getById(compId);
        //         } catch (err) {
        //             console.log(`can't get comp ${compId}: ${err}`);
        //         }
        //     },
        //     async setFilter({ commit, dispatch }, { filterBy }) {
        //         commit({ type: 'setFilter', filterBy });
        //         await dispatch({ type: 'loadComps' });
        //     },
    },
};
