import log from 'npmlog';
import validate from './validators/view_validator';
import ViewModel from '../db/view';
import TemplateModel from '../db/template';
import { POPULATE_SLOTS_FULL, POPULATE_VIEW_FULL } from '../db/populators';
import resolveSlotContentMapping from './utils/slot_content_mapping_resolver';

const LOG_PREFIX = 'LAYOUT_DAO_VIEW';

export async function addView(key, template, content, pageTitle) {
  log.info(LOG_PREFIX, 'add view:', key, template, JSON.stringify(content));

  const existingView = await ViewModel.findOne({ key });
  if (existingView) {
    log.error(LOG_PREFIX, 'view with key already exists', key);
    throw new Error(`can't create view, view with key already exists: ${key}`);
  }

  const existingTemplate = await TemplateModel
    .findOne({ key: template })
    .populate(POPULATE_SLOTS_FULL);

  if (!existingTemplate) {
    log.error(LOG_PREFIX, 'no template found with key:', template);
    throw new Error(`can't create view, no template found with key: ${template}`);
  }

  const view = new ViewModel();
  view.key = key;
  view.template = existingTemplate;
  view.content = await resolveSlotContentMapping(content);
  view.pageTitle = pageTitle;

  validate(view);
  log.verbose(LOG_PREFIX, JSON.stringify(view));
  return view.save();
}

export async function updateView(key, newKey, template, content, pageTitle) {
  log.info(LOG_PREFIX, 'update view:', key, newKey, template, JSON.stringify(content));

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't update view, no view found with key: ${key}`);
  }

  const existingTemplate = await TemplateModel
    .findOne({ key: template })
    .populate(POPULATE_SLOTS_FULL);

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
  view.pageTitle = pageTitle;

  validate(view);
  return view.save();
}

export async function removeView(key) {
  log.info(LOG_PREFIX, 'delete view:', key);

  const view = await ViewModel.findOne({ key });
  if (!view) {
    log.error(LOG_PREFIX, 'no view found with key:', key);
    throw new Error(`can't delete view, no view found with key: ${key}`);
  }

  return ViewModel
    .findOneAndDelete({ key })
    .populate(POPULATE_VIEW_FULL);
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

  const views = await ViewModel
    .find()
    .populate(POPULATE_VIEW_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(views));
  return views;
}

export async function getViewByTemplate(key) {
  log.info(LOG_PREFIX, 'get view by template:', key);

  const template = await TemplateModel.findOne({ key });
  if (!template) {
    log.error(LOG_PREFIX, 'no template found with key:', key);
    throw new Error(`can't get view, no template found with key: ${key}`);
  }

  return ViewModel
    .find({ template })
    .populate(POPULATE_VIEW_FULL);
}

export async function removeViews() {
  log.info(LOG_PREFIX, 'delete views');

  const deleted = await ViewModel
    .deleteMany()
    .populate(POPULATE_VIEW_FULL);

  log.verbose(LOG_PREFIX, JSON.stringify(deleted));
  return deleted;
}
