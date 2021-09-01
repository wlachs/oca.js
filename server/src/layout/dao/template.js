/* Logging */
import log from 'npmlog';

/* Populate */
import { POPULATE_SLOTS_FULL } from '../db/populators';

/* Data models */
import TemplateModel from '../db/template';

/* DAO references */
import { getSlotByKey, getSlotListByKeys } from './slot';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_TEMPLATE';

export async function getTemplateByKey(key) {
  log.info(LOG_PREFIX, 'get template by key:', key);

  const template = await TemplateModel
    .findOne({ key })
    .populate(POPULATE_SLOTS_FULL);

  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't get template, no template found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(template));
  return template;
}

async function getTemplateByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get template by key or null:', key);

  try {
    return getTemplateByKey(key);
  } catch (e) {
    log.info(LOG_PREFIX, 'template with key not found, returning with null', key);
    return null;
  }
}

export async function addTemplate(key, slots) {
  log.info(LOG_PREFIX, 'add template:', key, slots);

  const existingTemplate = await getTemplateByKeyOrNull(key);
  if (existingTemplate) {
    log.error(LOG_PREFIX, 'template with key already exists', key);
    throw new Error(`can't create template, template with key already exists: ${key}`);
  }

  /* If the slot list is not valid, an exception is thrown */
  const slotList = await getSlotListByKeys(slots);

  const template = new TemplateModel();
  template.key = key;
  template.slots = slotList;

  log.verbose(LOG_PREFIX, JSON.stringify(JSON.stringify(template)));
  return template.save();
}

export async function updateTemplate(key, newKey, slots) {
  log.info(LOG_PREFIX, 'update template:', key, newKey, slots);

  /* If the template is not found, an exception is thrown */
  const template = await getTemplateByKey(key);

  /* If the slot list is not valid, an exception is thrown */
  const slotList = await getSlotListByKeys(slots);

  if (newKey) {
    const templateWithNewKey = await getTemplateByKeyOrNull(newKey);
    if (templateWithNewKey) {
      log.error(LOG_PREFIX, 'template with key already exists:', newKey);
      throw new Error(`can't update template, template with key already exists: ${newKey}`);
    }

    template.key = newKey;
  }

  template.slots = slotList;

  log.verbose(LOG_PREFIX, JSON.stringify(JSON.stringify(template)));
  return template.save();
}

export async function addOrUpdateTemplate(key, slots) {
  log.info(LOG_PREFIX, 'add or update template:', key, slots);

  try {
    return updateTemplate(key, undefined, slots);
  } catch (e) {
    return addTemplate(key, slots);
  }
}

export async function removeTemplate(key) {
  log.info(LOG_PREFIX, 'delete template:', key);

  /* If the template is not found, an exception is thrown */
  await getTemplateByKey(key);

  const deleted = await TemplateModel.findOneAndDelete({ key }).populate(POPULATE_SLOTS_FULL);
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getTemplateList() {
  log.info(LOG_PREFIX, 'get template list');

  const templates = await TemplateModel
    .find()
    .populate(POPULATE_SLOTS_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(templates));
  return templates;
}

export async function getTemplateBySlot(key) {
  log.info(LOG_PREFIX, 'get template by slot:', key);

  /* If the slot is not found, an exception is thrown */
  const slot = await getSlotByKey(key);

  const templates = await TemplateModel
    .find({ slots: { $in: [slot] } })
    .populate(POPULATE_SLOTS_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(templates));
  return templates;
}

export async function removeTemplates() {
  log.info(LOG_PREFIX, 'delete templates');

  const deleted = await TemplateModel
    .deleteMany()
    .populate(POPULATE_SLOTS_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
