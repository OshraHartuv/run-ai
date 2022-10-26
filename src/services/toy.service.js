import { storageService } from './async-storage.service.js';
import { utilService } from './util.service.js';

const KEY = 'toysDB';

export default {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
};

async function query(filterBy) {
    try {
        var toys = await storageService.query(KEY);
        if (!toys || !toys.length) toys = _createToys();
        return toys;
    } catch (err) {
        console.log("can't get toys:", err);
    }
}

async function getById(id) {
    try {
        return await storageService.get(KEY, id);
    } catch (err) {
        console.log(`can't get toy ${toy_id}: ${err}`);
    }
}

async function remove(id) {
    try {
        return await storageService.remove(KEY, id);
    } catch (err) {
        console.log(`can't delete toy ${toy_id}: ${err}`);
    }
}

async function save(toy) {
    try {
        return (await toy._id)
            ? storageService.put(KEY, toy)
            : storageService.post(KEY, toy);
    } catch (err) {
        console.log(`can't save toy ${toy_id || ''}: ${err}`);
    }
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: null,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: new Date(Date.now()).toLocaleString(),
        inStock: true,
        reviews: ['Good', 'Nice', 'Fun'],
    };
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY));
    if (!toys || !toys.length) {
        toys = [
            _createToy(
                'Talking Doll',
                123,
                ['Doll', 'Battery Powered', 'Baby'],
                ['Good', 'Nice', 'Fun']
            ),
            _createToy('Ball', 50, ['Outdoor', 'Baby'], ['Amazing!']),
            _createToy('Cards', 250, ['Box game'], ['wow!', 'awesome']),
        ];
        localStorage.setItem(KEY, JSON.stringify(toys));
    }
    return toys;
}

function _createToy(name, price, labels, reviews) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        inStock: true,
        createdAt: new Date(Date.now()).toLocaleString(),
        reviews: reviews,
    };
}
