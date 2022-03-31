import getStripeSecretAsync from "../model/crud/getStripeSecretAsync";
import filterError from "./filterError";

const getStripeSecret = async (priceID) => {

    try {
        const user = await getStripeSecretAsync(priceID);

        if (user.ok)
            return user.data;
        else
            return filterError(user.data);

    } catch (error) {
        console.log('error: ' + error);
    }
}

export default getStripeSecret;