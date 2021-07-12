import log from 'npmlog';
import TemplateModel from '../db/template';
import SlotModel from '../db/slot';
import { POPULATE_ALLOWED_CONTENT_TYPES, POPULATE_SLOTS_FULL } from '../db/populators';

const LOG_PREFIX = 'LAYOUT_DAO_TEMPLATE';

export async function addTemplate(key, slots) {
  log.info(LOG_PREFIX, 'add template:', key, slots);

  const existingTemplate = await TemplateModel.findOne({ key });
  if (existingTemplate) {
    log.error(LOG_PREFIX, 'template with key already exists', key);
    throw new Error(`can't create template, template with key already exists: ${key}`);
  }

  const slotList = await SlotModel.find({ key: { $in: slots } })
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);
  if (slotList.length !== slots.length) {
    log.error(LOG_PREFIX, 'invalid slot key in list:', slots);
    throw new Error(`can't create template, invalid slot key in list: ${slots}`);
  }

  const template = new TemplateModel();
  template.key = key;
  template.slots = slotList;

  log.verbose(LOG_PREFIX, JSON.stringify(JSON.stringify(template)));
  return template.save();
}

export async function updateTemplate(key, newKey, slots) {
  log.info(LOG_PREFIX, 'update template:', key, newKey, slots);

  const template = await TemplateModel.findOne({ key });
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't update template, no template found with key: ${key}`);
  }

  const slotList = await SlotModel.find({ key: { $in: slots } })
    .populate(POPULATE_ALLOWED_CONTENT_TYPES);
  if (slotList.length !== slots.length) {
    log.error(LOG_PREFIX, 'invalid slot key in list:', slots);
    throw new Error(`can't update template, invalid slot key in list: ${slots}`);
  }

  if (newKey) {
    const templateWithNewKey = await TemplateModel.findOne({ key: newKey });
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

export async function removeTemplate(key) {
  log.info(LOG_PREFIX, 'delete template:', key);

  const template = await TemplateModel.findOne({ key });
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't delete template, no template found with key: ${key}`);
  }

  const deleted = await TemplateModel.findOneAndDelete({ key }).populate(POPULATE_SLOTS_FULL);
  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}

export async function getTemplateByKey(key) {
  log.info(LOG_PREFIX, 'get template by key:', key);

  const template = await TemplateModel.findOne({ key }).populate(POPULATE_SLOTS_FULL);
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't get template, no template found with key: ${key}`);
  }

  log.verbose(LOG_PREFIX, JSON.stringify(template));
  return template;
}

export async function getTemplateList() {
  log.info(LOG_PREFIX, 'get template list');

  const templates = await TemplateModel.find().populate(POPULATE_SLOTS_FULL);
  log.verbose(LOG_PREFIX, JSON.stringify(templates));
  return templates;
}

export async function getTemplateBySlot(key) {
  log.info(LOG_PREFIX, 'get template by slot:', key);

  const slot = await SlotModel.findOne({ key });
  if (!slot) {
    log.error(LOG_PREFIX, 'no slot found with key:', key);
    throw new Error(`can't get template, no slot found with key: ${key}`);
  }

  const templates = await TemplateModel.find({ slots: { $in: [slot] } })
    .populate(POPULATE_SLOTS_FULL);
  log.verbose(LOG_PREFIX, JSON.stringify(templates));
  return templates;
}
