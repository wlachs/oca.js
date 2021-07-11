import log from 'npmlog';
import ContentTypeModel from '../db/content_type';
import SlotModel from '../db/slot';

const LOG_PREFIX = 'LAYOUT_DAO_SLOT';

export async function addSlot(key, types) {
  log.info(LOG_PREFIX, 'add slot:', key, types);

  const existingSlot = await SlotModel.findOne({ key });
  if (existingSlot) {
    log.error(LOG_PREFIX, 'slot with key already exists', key);
    throw new Error(`can't create slot, slot with key already exists: ${key}`);
  }

  const contentTypes = await ContentTypeModel.find({ key: { $in: types } });
  if (contentTypes.length !== types.length) {
    log.error(LOG_PREFIX, 'invalid content type in allowed content type list', types);
    throw new Error(`can't add slot, invalid content type in allowed content type list: ${types}`);
  }

  const slot = new SlotModel();
  slot.key = key;
  slot.allowedContentTypes = contentTypes;

  return slot.save();
}

export async function updateSlot(key, newKey, types) {
  log.info(LOG_PREFIX, 'update slot:', key, newKey, types);

  const slot = await SlotModel.findOne({ key });
  if (!slot) {
    log.error(LOG_PREFIX, 'no slot found with key:', key);
    throw new Error(`can't update slot, no content found with key: ${key}`);
  }

  if (newKey) {
    const slotWithNewKey = await SlotModel.findOne({ key: newKey });
    if (slotWithNewKey) {
      log.error(LOG_PREFIX, 'slot with key already exists:', newKey);
      throw new Error(`can't update slot, slot with key already exists: ${newKey}`);
    }
    slot.key = newKey;
  }

  const contentTypes = await ContentTypeModel.find({ key: { $in: types } });
  if (contentTypes.length !== types.length) {
    log.error(LOG_PREFIX, 'invalid content type in allowed content type list', types);
    throw new Error(`can't add slot, invalid content type in allowed content type list: ${types}`);
  }

  slot.allowedContentTypes = contentTypes;

  return slot.save();
}

export async function removeSlot(key) {
  log.info(LOG_PREFIX, 'delete slot:', key);

  const slot = await SlotModel.findOne({ key });
  if (!slot) {
    log.error(LOG_PREFIX, 'no slot found with key:', key);
    throw new Error(`can't delete slot, no slot found with key: ${key}`);
  }

  return SlotModel.findOneAndDelete({ key });
}

export async function getSlotByKey(key) {
  log.info(LOG_PREFIX, 'get slot by key:', key);

  const slot = await SlotModel.findOne({ key });
  if (!slot) {
    log.error(LOG_PREFIX, 'no slot found with key:', key);
    throw new Error(`can't get slot, no slot found with key: ${key}`);
  }

  return slot;
}

export async function getSlotList() {
  log.info(LOG_PREFIX, 'get slot list');

  return SlotModel.find();
}

export async function getSlotListForContentType(key) {
  log.info(LOG_PREFIX, 'get slot list for content type:', key);

  const contentType = await ContentTypeModel.findOne({ key });
  if (!contentType) {
    log.error(LOG_PREFIX, 'no content type found with key:', key);
    throw new Error(`can't get slot list, no content type found with key: ${key}`);
  }

  return SlotModel.find({ allowedContentTypes: { $in: [key] } });
}
