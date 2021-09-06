export const POPULATE_ALLOWED_CONTENT_TYPES = {
  path: 'allowedContentTypes',
  model: 'ContentType',
};

export const POPULATE_SLOTS_FULL = {
  path: 'slots',
  model: 'Slot',
  populate: POPULATE_ALLOWED_CONTENT_TYPES,
};

export const POPULATE_TYPE = {
  path: 'type',
  model: 'ContentType',
};

const POPULATE_TEMPLATE_FULL = {
  path: 'template',
  model: 'Template',
  populate: POPULATE_SLOTS_FULL,
};

const POPULATE_CONTENT_SLOT_FULL = {
  path: 'content.slot',
  model: 'Slot',
  populate: POPULATE_ALLOWED_CONTENT_TYPES,
};

const POPULATE_CONTENT_CONTENT_FULL = {
  path: 'content.content',
  model: 'Content',
  populate: POPULATE_TYPE,
};

export const POPULATE_VIEW_FULL = [
  POPULATE_TEMPLATE_FULL,
  POPULATE_CONTENT_SLOT_FULL,
  POPULATE_CONTENT_CONTENT_FULL,
];

const POPULATE_VIEW_OF_ROUTE = {
  path: 'view',
  model: 'View',
  populate: POPULATE_VIEW_FULL,
};

const POPULATE_USER_GROUPS_OF_ROUTE = {
  path: 'accessGroups',
  model: 'UserGroup',
};

export const POPULATE_ROUTE_FULL = [
  POPULATE_VIEW_OF_ROUTE,
  POPULATE_USER_GROUPS_OF_ROUTE,
];

export const POPULATE_REDIRECT_ROUTE = {
  path: 'redirect',
  model: 'Route',
  populate: POPULATE_ROUTE_FULL,
};

export const POPULATE_REFERER_ROUTE = {
  path: 'referer',
  model: 'Route',
  populate: POPULATE_ROUTE_FULL,
};

export const POPULATE_REDIRECT_FULL = [
  POPULATE_REFERER_ROUTE,
  POPULATE_REDIRECT_ROUTE,
];
