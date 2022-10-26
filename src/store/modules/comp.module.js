import compService from '@/services/comp.service.js';

export default {
    state: {
        comps: [],
        currCompId: null,
    },
    getters: {
        comps(state) {
            return state.comps;
        },
        miniComps(state) {
            return state.comps.map((comp) => ({
                _id: comp._id,
                name: comp.name,
            }));
        },
        currCompId(state) {
            return state.currCompId;
        },
        currComp(state) {
            return state.comps.find((comp) => comp._id === state.currCompId);
        },
    },
    mutations: {
        setComps(state, { comps }) {
            state.comps = comps;
        },
        setCompId(state, { compId }) {
            state.currCompId = compId;
        },
        saveComp({ comps }, { comp }) {
            const idx = comps.findIndex(
                (currComp) => currComp._id === comp._id
            );
            idx === -1 ? comps.push(comp) : comps.splice(idx, 1, comp);
        },
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
        setCompId({ commit }, { compId }) {
            commit({ type: 'setCompId', compId });
        },
        async getCompById(context, { compId }) {
            try {
                return await compService.getById(compId);
            } catch (err) {
                console.log(`can't get comp ${compId}: ${err}`);
            }
        },
        async saveComp({ commit }, { comp }) {
            try {
                const savedComp = await compService.save(comp);
                commit({ type: 'saveComp', comp: savedComp });
                return savedComp;
            } catch (err) {
                console.log(`can't save comp ${comp_id || ''}: ${err}`);
            }
        },
    },
};
