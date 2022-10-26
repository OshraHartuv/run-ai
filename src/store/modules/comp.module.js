import compService from '@/services/comp.service.js';

export default {
    state: {
        comps: [],
        currCompId: null,
        filterBy: {
            deps: [],
        },
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
        filteredEmps(state, getters) {
            if (!getters.currComp) return 
            let emps =  JSON.parse(JSON.stringify(getters.currComp)).emps;
            let { deps ,name } = state.filterBy;
            if (deps && deps.length) {
                emps = emps.filter(emp=> deps.includes(emp.depId))
            }
            if (name){
                const regex = new RegExp(name, 'i')
                emps = emps.filter((emp) => regex.test(emp.name));
            }
            return emps
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
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadComps({ commit }) {
            try {
                const comps = await compService.query();
                commit({ type: 'setComps', comps });
            } catch (err) {
                console.log("can't load comps:", err);
                throw err;
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
                throw err;
            }
        },
        async saveComp({ commit }, { comp }) {
            try {
                const savedComp = await compService.save(comp);
                commit({ type: 'saveComp', comp: savedComp });
                return savedComp;
            } catch (err) {
                console.log(`can't save comp ${comp_id || ''}: ${err}`);
                throw err;
            }
        },
        setFilter({ commit}, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
        },
    },
};
