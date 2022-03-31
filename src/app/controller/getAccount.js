/*
Calls a function in the model to try to get the user data when the user signs in. 
Called from the login screen.
*/
import getAccountAsync from "../model/crud/getAccountAsync";
import filterError from "./filterError";

const getAccount = async (id, password) => {

    try {
        const user = await getAccountAsync(id, password);

        if (user.ok)
            return user.data;
        else
            return filterError(user.data);


    } catch (error) {
        console.log('error: ' + error);
    }

}

export default getAccount;