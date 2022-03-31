import mailerAsync from "../model/crud/mailerAsync";
import filterError from "./filterError";

const mailer = async (name, email, message, origin) => {

    try {
        const result = await mailerAsync(name, email, message, origin);

        if (result.ok)
            return result;
        else
            return filterError(result.data);

    } catch (error) {
        // console.log('error: ' + error);
    }
}

export default mailer;