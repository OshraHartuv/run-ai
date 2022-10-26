import toyService from '@/services/toy.service.js';

export default {
    state: {
        toys: [],
        filterBy: {
            name: '',
            departmentId: ''
        }
    },
    getters: {
        toys(state) {
            return state.toys;
        },
        toysToShow(state) {
            var toys = state.toys;
            var {name} = state.filterBy
            if (name) {
                const regex = new RegExp(name, 'i')
                toys = toys.filter((toy) => regex.test(toy.name));
            }

            // if (departmentId) {
            //     toys = companies.
            // }
            return toys;
        },
    },
    mutations: {
        setToys(state, { toys }) {
            state.toys = toys;
        },
        removeToy({ toys }, { id }) {
            const idx = toys.findIndex((toy) => toy._id === id);
            toys.splice(idx, 1);
        },
        saveToy({ toys }, { toy }) {
            const idx = toys.findIndex((currToy) => currToy._id === toy._id);
            idx === -1 ? toys.push(toy) : toys.splice(idx, 1, toy);
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadToys(context) {
            try {
                const filterBy = { ...context.state.filterBy };
                const toys = await toyService.query(filterBy);
                context.commit({ type: 'setToys', toys });
            } catch (err) {
                console.log("can't load toys:", err);
            }
        },
        async removeToy({ commit }, { id }) {
            try {
                await toyService.remove(id);
                commit({ type: 'removeToy', id });
            } catch (err) {
                console.log('cannot remove toy', err);
            }
        },
        async saveToy({ commit }, { toy }) {
            try {
                const savedToy = await toyService.save(toy);
                commit({ type: 'saveToy', toy: savedToy });
                return savedToy;
            } catch (err) {
                console.log(`can't save toy ${toy_id || ''}: ${err}`);
            }
        },
        async getToyById(context, { toyId }) {
            try {
                return await toyService.getById(toyId);
            } catch (err) {
                console.log(`can't get toy ${toyId}: ${err}`);
            }
        },
        async setFilter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            await dispatch({ type: 'loadToys' });
        },
    },
};

// loadToys(context, state) {
// // console.log(state.filterBy); // with proxy , state.filterBy is undifend
// let filterBy = { ...context.state.filterBy }; // important use context.state.filterBy
// //server side filter
// return toyService
//     .query(filterBy)
//     .then((toys) => {
//         context.commit({ type: 'setToys', toys });
//     })
//     .catch((err) => {
//         console.log('Error: cannot get toys', err);
//         throw err;
//     });
// },
//       context.commit   payload.id
// removeToy({ commit }, { id }) {
//     return toyService
//         .remove(id)
//         .then(() => {
//             commit({ type: 'removeToy', id });
//         })
//         .catch((err) => {
//             console.log('Error: cannot remove toy', err);
//             throw err;
//         });
// },
// saveToy({ commit }, { toy }) {
//     return toyService
//         .save(toy)
//         .then((savedToy) => {
//             commit({ type: 'saveToy', toy: savedToy });
//             console.log('savedToy', savedToy);
//             return savedToy; // can return if you we want showMsg
//         })
//         .catch((err) => {
//             console.log('Error: cannot save toy', err);
//             throw err;
//         });
// },
// getToyById(context, { toyId }) {
//     return toyService
//         .getById(toyId)
//         .then((toy) => {
//             //can add commit if needed
//             return toy;
//         })
//         .catch((err) => {
//             console.log('Error: cannot get toy', err);
//             throw err;
//         });
// },
// //set the filter and run the loadToys with the filter
// setFilterAct({ commit, dispatch }, { filterBy }) {
//     commit({ type: 'setFilter', filterBy });
//     dispatch({ type: 'loadToys' });
// },
