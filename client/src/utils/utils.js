export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const ROLES = {
  User: 2021,
  Editor: 1992,
  Admin: 5051,
};
