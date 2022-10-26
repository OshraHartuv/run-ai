import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'compDB';

export default {
    query,
    getById,
    save,
    getEmp,
    getDep,
};

async function query(filterBy) {
    try {
        var comps = await storageService.query(KEY);
        if (!comps || !comps.length) comps = _createComps();
        return comps;
    } catch (err) {
        console.log("can't get comps:", err);
        throw err;
    }
}

async function getById(id) {
    try {
        return await storageService.get(KEY, id);
    } catch (err) {
        console.log(`can't get comp ${comp_id}: ${err}`);
        throw err;
    }
}

async function save(comp) {
    try {
        return (await comp._id)
            ? storageService.put(KEY, comp)
            : storageService.post(KEY, comp);
    } catch (err) {
        console.log(`can't save comp ${comp_id || ''}: ${err}`);
    }
}

function getEmp(name = '', depId = '') {
    return {
        _id: utilService.makeId(),
        name,
        depId,
    };
}

function getDep(name) {
    return {
        _id: utilService.makeId(),
        name,
    };
}

function _createComps() {
    var comps = [
        _createComp('Wolt'),
        _createComp('Mozner'),
        _createComp('Elal'),
    ];
    comps.forEach((comp) => {
        var emps = [];
        comp.deps.forEach((dep) => {
            emps.push(..._createEmps(dep._id));
        });
        comp.emps.push(...emps);
    });
    localStorage.setItem(KEY, JSON.stringify(comps));
    return comps;
}

function _createComp(name, deps = _createDeps(), emps = []) {
    return {
        _id: utilService.makeId(),
        name,
        deps,
        emps,
    };
}



function _createDeps() {
    const depNames = [
        'Asset Management',
        'Creative Services',
        'Human Resources',
        'Operation',
        'Production',
        'Technology',
        'Marketing',
        'Sales',
    ];
    return depNames.map((name) => getDep(name));
}

function _createEmps(depId) {
    const emps = [];
    const names = [
        'Sarah Lee',
        'John doe',
        'Sam Smith',
        'Mathan Hirsh',
        'Nelly Anderson',
        'Gabe Berger',
        'Verded Hartuv',
        'Haya Brama',
        'Tamy Fries',
    ];
    for (var i = 0; i < 2; i++) {
        const name = names[utilService.getRandomInt(0, names.length - 1)];
        emps.push(getEmp(name, depId));
    }
    return emps;
}
