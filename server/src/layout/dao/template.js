/* Logging */
import log from 'npmlog';

/* Data models */
import TemplateModel from '../db/schema/template';

/* DAO references */
import { getSlotByKey, getSlotListByKeys } from './slot';

/* Errors */
import NotFoundError from '../../core/errors/not_found';
import Conflict from '../../core/errors/conflict';

/* Logging prefix */
const LOG_PREFIX = 'LAYOUT_DAO_TEMPLATE';

export async function getTemplateByKey(key) {
  log.info(LOG_PREFIX, 'get template by key:', key);

  const template = await TemplateModel.findOne({ key });
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new NotFoundError(`can't get template, no template found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(template, undefined, 4));
  return template;
}

async function getTemplateByKeyOrNull(key) {
  log.info(LOG_PREFIX, 'get template by key or null:', key);

  try {
    return await getTemplateByKey(key);
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
    throw new Conflict(`can't create template, template with key already exists: ${key}`);
  }

  /* If the slot list is not valid, an exception is thrown */
  const slotList = await getSlotListByKeys(slots);

  const template = new TemplateModel();
  template.key = key;
  template.slots = slotList;

  log.verbose(LOG_PREFIX, JSON.stringify(JSON.stringify(template, undefined, 4)));
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
      throw new Conflict(`can't update template, template with key already exists: ${newKey}`);
    }

    template.key = newKey;
  }

  template.slots = slotList;

  log.verbose(LOG_PREFIX, JSON.stringify(JSON.stringify(template, undefined, 4)));
  return template.save();
}

export async function addOrUpdateTemplate(key, slots) {
  log.info(LOG_PREFIX, 'add or update template:', key, slots);

  try {
    return await updateTemplate(key, undefined, slots);
  } catch (e) {
    return addTemplate(key, slots);
  }
}

export async function removeTemplate(key) {
  log.info(LOG_PREFIX, 'delete template:', key);

  /* If the template is not found, an exception is thrown */
  await getTemplateByKey(key);

  const deleted = await TemplateModel.findOneAndDelete({ key });
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}

export async function getTemplateList() {
  log.info(LOG_PREFIX, 'get template list');

  const templates = await TemplateModel.find();
  log.verbose(LOG_PREFIX, JSON.stringify(templates, undefined, 4));
  return templates;
}

export async function getTemplateBySlot(key) {
  log.info(LOG_PREFIX, 'get template by slot:', key);

  /* If the slot is not found, an exception is thrown */
  const slot = await getSlotByKey(key);

  const templates = await TemplateModel.find({ slots: { $in: [slot] } });
  log.verbose(LOG_PREFIX, JSON.stringify(templates, undefined, 4));
  return templates;
}

export async function removeTemplates() {
  log.info(LOG_PREFIX, 'delete templates');

  const deleted = await TemplateModel.deleteMany();
  log.verbose(LOG_PREFIX, JSON.stringify(deleted, undefined, 4));
  return deleted;
}
