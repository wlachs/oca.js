export const POPULATE_USER_GROUP_KEY = {
  path: 'parent',
  model: 'UserGroup',
};

export const POPULATE_USER = {
  path: 'groups',
  model: 'UserGroup',
  populate: POPULATE_USER_GROUP_KEY,
};
