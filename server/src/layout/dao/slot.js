/* Logging */
import log from 'npmlog';

/* Populate */
import { POPULATE_ALLOWED_CONTENT_TYPES } from '../db/populators';

/* Data models */
import SlotModel from '../db/slot';

/* DAO references */
import { getContentTypeByKey, getContentTypeListByKeys } from './content_type';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_SLOT';

export async function getSlotByKey(key) {
  log.info(LOG_PREFIX, 'get slot by key:', key);

  const slot = await SlotModel.findOne({ key }).populate(POPULATE_ALLOWED_CONTENT_TYPES);
  if (!slot) {
    log.error(LOG_PREFIX, 'no slot found with key:', key);
    throw new Error(`can't get slot, no slot found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(slot, undefined, 4));
  return slot;
}

async function getSlotByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get slot by key or null:', key);

  try {
    return await getSlotByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'slot with key not found, returning with null', key);
    return null;
  }
}

export async function addSlot(key, types) {
  log.info(LOG_PREFIX, 'add slot:', key, types);

  const existingSlot = await getSlotByKeyOrNull(key);
  if (existingSlot) {
    log.error(LOG_PREFIX, 'slot with key already exists', key);
    throw new Error(`can't create slot, slot with key already exists: ${key}`);
  }

  /* If the content type list is not valid, an exception is thrown */
  const contentTypes = await getContentTypeListByKeys(types);

  const slot = new SlotModel();
  slot.key = key;
  slot.allowedContentTypes = contentTypes;

  log.verbose(LOG_PREFIX, JSON.stringify(slot, undefined, 4));
  return slot.save();
}

export async function updateSlot(key, newKey, types) {
  log.info(LOG_PREFIX, 'update slot:', key, newKey, types);

  /* If the slot is not found, an exception is thrown */
  const slot = await getSlotByKey(key);

  if (newKey) {
    const slotWithNewKey = await getSlotByKeyOrNull(newKey);
    if (slotWithNewKey) {
      log.error(LOG_PREFIX, 'slot with key already exists:', newKey);
      throw new Error(`can't update slot, slot with key already exists: ${newKey}`);
    }

    slot.key = newKey;
  }

  /* If the content type list is not valid, an exception is thrown */
  slot.allowedContentTypes = await getContentTypeListByKeys(types);

  log.verbose(LOG_PREFIX, JSON.stringify(slot, undefined, 4));
  return slot.save();
}

export async function addOrUpdateSlot(key, types) {
  log.info(LOG_PREFIX, 'add or update slot:', key, types);

  try {
    return await updateSlot(key, undefined, types);
  } catch (e) {
    return addSlot(key, types);
  }
}

export async function removeSlot(key) {
  log.info(LOG_PREFIX, 'delete slot:', key);

  /* If the slot is not found, an exception is thrown */
  await getSlotByKey(key);

  const deleted = await SlotModel
    .findOneAndDelete({ key })
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getSlotList() {
  log.info(LOG_PREFIX, 'get slot list');

  const slots = await SlotModel.find().populate(POPULATE_ALLOWED_CONTENT_TYPES);
  log.verbose(LOG_PREFIX, JSON.stringify(slots, undefined, 4));
  return slots;
}

export async function getSlotListByKeys(keys) {
  log.info(LOG_PREFIX, 'get slots for key set:', keys);

  const slotList = await SlotModel
    .find({ key: { $in: keys } })
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);

  if (slotList.length !== keys.length) {
    log.error(LOG_PREFIX, 'invalid slot key in list:', keys);
    throw new Error(`invalid slot key in list: ${keys}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(slotList, undefined, 4));
  return slotList;
}

export async function getSlotListForContentType(key) {
  log.info(LOG_PREFIX, 'get slot list for content type:', key);

  /* If the content type list is not valid, an exception is thrown */
  const contentType = await getContentTypeByKey(key);

  const slots = await SlotModel
    .find({ allowedContentTypes: { $in: [contentType] } })
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);

  log.verbose(LOG_PREFIX, JSON.stringify(slots, undefined, 4));
  return slots;
}

export async function removeSlots() {
  log.info(LOG_PREFIX, 'delete slots');

  const deleted = await SlotModel
    .deleteMany()
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
