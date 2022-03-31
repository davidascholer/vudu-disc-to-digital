import purchaseTokensAsync from "../model/crud/purchaseTokensAsync";
import filterError from "./filterError";

const purchaseTokens = async (id, purchaseID, receipt) => {

    const errMsg = "Could not complete purchase.";

    try {
        const result = await purchaseTokensAsync(id, purchaseID, receipt);

        if (result.ok)
            return result;
        else
            return filterError(result.data);

    } catch (error) {
        console.log('error: ' + error);
    }
}

export default purchaseTokens;