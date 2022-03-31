import AppContext from '../config/context';

const storeDataObject = async (value) => {

const localStorage = window.localStorage;

    try {
        await localStorage.setItem('@user_data', JSON.stringify(value));
        return true;
    } catch (e) {
        // saving error
        console.error(e);
        return false;
    }
}

const getDataObject = async () => {
    try {
        const data = await localStorage.getItem('@user_data');
        return JSON.parse(data);
    } catch (e) {
        // error reading value
        console.error(e);
        return {error:"Failed to get data from storage."}
    }
}

const removeDataObject = async () => {
    try {
        await localStorage.removeItem('@user_data');
        return true;
    } catch (e) {
        console.error(e);
        return false
    }
}

const removeAll = async () => {
    try {
        await localStorage.clear();
        return true;
    } catch (e) {
        console.error(e);
        return false
    }
}


export default {
    storeDataObject,
    getDataObject,
    removeDataObject,
    removeAll
}