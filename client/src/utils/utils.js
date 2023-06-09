export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const checkUserRoles = (user) => {
  if (user === null) return;
  if (user.user?.roles?.hasOwnProperty("Admin")) {
    return true;
  } else {
    return false;
  }
};
