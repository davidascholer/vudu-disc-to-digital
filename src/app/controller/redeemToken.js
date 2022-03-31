/*REDEEM TOKEN
-Subtracts a token.
-Returns a new token count and a new redemptions array.
*/
//set userData.token to newTokenCount and redemptions to newRedemptionsArray.
import redeemTokenAsync from "../model/crud/redeemTokenAsync";
import filterError from "./filterError";

const redeemToken = async (appID,product) => {

    try {
        const result = await redeemTokenAsync(appID,product);

        if (result.ok)
            return result;
        else
            return filterError(result.data);

    } catch (error) {
        // console.log('error: ' + error);
    }
}

export default redeemToken;