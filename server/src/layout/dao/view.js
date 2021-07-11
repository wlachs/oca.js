import log from 'npmlog';
import ViewModel from '../db/view';
import TemplateModel from '../db/template';
import ContentModel from '../db/content';
import SlotModel from '../db/slot';

const LOG_PREFIX = 'LAYOUT_DAO_VIEW';

async function resolveSlotContentMapping(mapping) {
  log.info(LOG_PREFIX, 'resolve slot->content mapping for:', mapping);

  const slotKeys = mapping.map((pair) => pair.slot);
  const slots = await Promise.all(slotKeys.map((key) => SlotModel.findOne({ key })));
  if (slots.length !== slotKeys.length) {
    log.error(LOG_PREFIX, 'invalid slot key in list:', slotKeys);
    throw new Error(`can't resolve slot->content mapping, invalid slot key in list: ${slotKeys}`);
  }

  const contentKeys = mapping.map((pair) => pair.content);
  const content = await Promise.all(contentKeys.map((key) => ContentModel.findOne({ key })));
  if (content.length !== contentKeys.length) {
    log.error(LOG_PREFIX, 'invalid content key in list:', contentKeys);
    throw new Error(`can't resolve slot->content mapping, invalid content key in list: ${contentKeys}`);
  }

  return slots.map((slot, id) => ({
    slot,
    content: content[id],
  }));
}

export async function addView(key, template, content) {
  log.info(LOG_PREFIX, 'add view:', key, template, content);

  const existingView = await ViewModel.findOne({ key });
  if (existingView) {
    log.error(LOG_PREFIX, 'view with key already exists', key);
    throw new Error(`can't create view, view with key already exists: ${key}`);
  }

  const existingTemplate = await TemplateModel.findOne({ key: template });
  if (!existingTemplate) {
    log.error(LOG_PREFIX, 'no template found with key:', template);
    throw new Error(`can't create view, no template found with key: ${template}`);
  }

  const view = new ViewModel();
  view.key = key;
  view.template = existingTemplate;
  view.content = await resolveSlotContentMapping(content);

  return view.save();
}

export async function updateView(key, newKey, template, content) {
  log.info(LOG_PREFIX, 'update view:', key, newKey, template, content);

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't update view, no view found with key: ${key}`);
  }

  const existingTemplate = await TemplateModel.findOne({ key: template });
  if (!existingTemplate) {
    log.error(LOG_PREFIX, 'no template found with key:', template);
    throw new Error(`can't update view, no template found with key: ${template}`);
  }

  if (newKey) {
    const viewWithNewKey = await ViewModel.findOne({ key: newKey });
    if (viewWithNewKey) {
      log.error(LOG_PREFIX, 'view with key already exists:', newKey);
      throw new Error(`can't update view, view with key already exists: ${newKey}`);
    }
    view.key = newKey;
  }

  view.template = existingTemplate;
  view.content = await resolveSlotContentMapping(content);

  return view.save();
}

export async function removeView(key) {
  log.info(LOG_PREFIX, 'delete view:', key);

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't delete view, no view found with key: ${key}`);
  }

  return ViewModel.findOneAndDelete({ key });
}

export async function getViewByKey(key) {
  log.info(LOG_PREFIX, 'get view by key:', key);

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't get view, no view found with key: ${key}`);
  }

  return view;
}

export async function getViewList() {
  log.info(LOG_PREFIX, 'get view list');

  return ViewModel.find();
}

export async function getViewByTemplate(key) {
  log.info(LOG_PREFIX, 'get view by template:', key);

  const template = await TemplateModel.findOne({ key });
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't get view, no template found with key: ${key}`);
  }

  return ViewModel.find({ template });
}
