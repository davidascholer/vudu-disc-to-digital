/*
Calls a function in the model to attempt to save the user data to the database. 
Called from the login screen.
If no id, send the email as the id.
*/
import createAccountAsync from "../model/crud/createAccountAsync";
import filterError from "./filterError";

//ID will = email if logging in from the form.
//Password will be null if logging in from a media source.
const createAccount = async (name, email, password, id = email) => {

    try {

        //Check to see if the user has the maximum amount of accounts registered (3)
        let accounts = await localStorage.getItem('@user_accounts');
        accounts = JSON.parse(accounts);

        if (!accounts)
            await localStorage.setItem('@user_accounts', JSON.stringify({ creations: 1 }));

        // if (accounts.creations > 3)
        //     return { error: 'You have exceeded the maximum accounts for this device. Please login to one of your existing accounts.' }


        //If the password is null and the id doesn't match the email,
        //the user somehow got past the form password check. Return an error.
        if (password && id !== email)
            return { error: "Error Logging In" };

        const user = await createAccountAsync(name, email, password, id);

        if (user.ok) {
            await localStorage.setItem('@user_accounts', JSON.stringify({ creations: accounts.creations + 1 }));
            return user.data;
        }
        else
            return filterError(user.data);

    } catch (error) {
        return filterError(error);
    }

}

export default createAccount;