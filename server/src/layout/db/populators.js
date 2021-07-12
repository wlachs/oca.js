export const POPULATE_SLOTS_FULL = {
  path: 'slots',
  model: 'Slot',
  populate: {
    path: 'allowedContentTypes',
    model: 'ContentType',
  },
};

export const POPULATE_TYPE = {
  path: 'type',
  model: 'ContentType',
};

export const POPULATE_ALLOWED_CONTENT_TYPES = {
  path: 'allowedContentTypes',
  model: 'ContentType',
};
