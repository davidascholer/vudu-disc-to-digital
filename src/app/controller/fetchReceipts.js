
import fetchReceiptsAsync from '../model/crud/fetchReceiptsAsync';
import filterError from './filterError';

const fetchReceipts = async (id) => {

    try {
        const result = await fetchReceiptsAsync(id);

        if (result.ok)
            return result.data;
        else
            return filterError(result.data);

    } catch (error) {
        console.log('error: ' + error);
    }

}

export default fetchReceipts;