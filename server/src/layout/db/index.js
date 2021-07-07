import log from 'npmlog';
import ContentTypeModel from './content_type';
import ContentModel from './content';
import SlotModel from './slot';
import TemplateModel from './template';
import ViewModel from './view';
import RouteModel from './route';

const LOG_PREFIX = 'LAYOUT_DB';

async function initDB() {
  log.info(LOG_PREFIX, 'generate initial data');

  /* Generate initial content types */
  const mainType = new ContentTypeModel();
  mainType.key = 'MAIN';

  log.info(LOG_PREFIX, 'initial content types: ', mainType);
  await Promise.all([mainType.save()]);

  /* Generate initial content */
  const mainContent = new ContentModel();
  mainContent.key = 'HELLO_WORLD_TEXT';
  mainContent.type = mainType;
  mainContent.attributes.push({
    key: 'text',
    value: 'Hello World!',
  });

  log.info(LOG_PREFIX, 'initial content: ', mainContent);
  await Promise.all([mainContent.save()]);

  /* Generate initial content slot */
  const mainSlot = new SlotModel();
  mainSlot.key = 'MAIN';
  mainSlot.allowedContentTypes.push(mainType);

  log.info(LOG_PREFIX, 'initial slot: ', mainSlot);
  await Promise.all([mainSlot.save()]);

  /* Generate initial template */
  const mainTemplate = new TemplateModel();
  mainTemplate.key = 'MAIN';
  mainTemplate.slots.push(mainSlot);

  log.info(LOG_PREFIX, 'initial template: ', mainTemplate);
  await Promise.all([mainTemplate.save()]);

  /* Generate initial view */
  const mainView = new ViewModel();
  mainView.key = 'MAIN';
  mainView.template = mainTemplate;
  mainView.content.push({
    slot: mainSlot,
    content: mainContent,
  });

  log.info(LOG_PREFIX, 'initial view: ', mainView);
  await Promise.all([mainView.save()]);

  /* Generate default route */
  const rootRoute = new RouteModel();
  rootRoute.path = '/';
  rootRoute.view = mainView;

  log.info(LOG_PREFIX, 'initial view: ', rootRoute);
  await Promise.all([rootRoute.save()]);
}

export default initDB;
