//Return a success callback if the user email exists.
import genPWCodeAsync from "../model/crud/genPWCodeAsync";
import filterError from "./filterError";

const genPWCode = async (appID,origin) => {

    try {
        const result = await genPWCodeAsync(appID, origin);

        if (result.ok)
            return result;
        else
            return filterError(result.data);

    } catch (error) {
        // console.log('error: ' + error);
    }
}

export default genPWCode;