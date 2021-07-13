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

export const POPULATE_ROUTE_FULL = {
  path: 'view',
  model: 'View',
  populate: POPULATE_VIEW_FULL,
};
