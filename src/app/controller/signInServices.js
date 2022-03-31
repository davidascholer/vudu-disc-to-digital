import createAccount from './createAccount';
import getAccount from './getAccount';
import localStorage from './localStorage'

const getUser = async () => {
  const user = await localStorage.getDataObject();
  if (user)
    return user;
  else
    return null;
}

//Save the user object to the local storage and app context.
const setUser = async user => {

  const result = await localStorage.storeDataObject(user);

  if (result.error)
    return { error: result.error }

  return { success: "Data saved." };
}

const signOut = async () => {
  const result = await localStorage.removeDataObject();
  if (result)
    return { success: "Signed out." }
  return;
}

const forgotPassword = email => {

  let resultMsg = "email doesn't exist";
  alert("an email with a link to reset your password has been sent to " + JSON.stringify(email));

}

export default {
  getUser,
  setUser,
  createAccount,
  getAccount,
  signOut,
  forgotPassword
}