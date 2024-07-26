import { account } from ".";
/**
 *
 * @description Check if the user is logged in and throw an error if not otherwise return the user
 * @returns user
 */
async function checkIfUserIsLoggedIn() {
  let user;
  try {
    user = await account.get();
    if (!user?.$id) {
      return null;
    }
  } catch (e) {
    return null;
  }
  return user;
}

export { checkIfUserIsLoggedIn };
