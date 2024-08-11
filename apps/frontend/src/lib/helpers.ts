
// Returns true if project is running in dev env
export const in_dev_env =
  !!process && process.env.NODE_ENV === "development";
