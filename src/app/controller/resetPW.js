//Return a success callback if the user email exists.
import resetPWAsync from "../model/crud/resetPWAsync";
import filterError from "./filterError";

const resetPW = async (email, password, code) => {

    try {
        const result = await resetPWAsync(email, password, code);

        if (result.ok)
            return result;
        else
            return filterError(result.data);

    } catch (error) {
        // console.log('error: ' + error);
    }
}

export default resetPW;