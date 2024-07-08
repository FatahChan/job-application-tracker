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
      throw new Error("User is not logged in");
    }
  } catch (e) {
    throw new Error("User is not logged in");
  }
  return user;
}

export { checkIfUserIsLoggedIn };
