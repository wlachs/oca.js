import log from 'npmlog';
import SlotModel from '../../db/slot';
import { POPULATE_ALLOWED_CONTENT_TYPES, POPULATE_TYPE } from '../../db/populators';
import ContentModel from '../../db/content';

const LOG_PREFIX = 'LAYOUT_DAO_UTILS_SLOT_CONTENT_MAPPING_RESOLVER';

async function resolveSlotContentMapping(mapping) {
  log.info(LOG_PREFIX, 'resolve slot -> content mapping for:', JSON.stringify(mapping));

  const slotKeys = mapping.map((pair) => pair.slot);
  const slots = await Promise.all(slotKeys.map(
    (key) => SlotModel
      .findOne({ key })
      .populate(POPULATE_ALLOWED_CONTENT_TYPES),
  ));

  if (slots.length !== slotKeys.length) {
    log.error(LOG_PREFIX, 'invalid slot key in list:', slotKeys);
    throw new Error(`can't resolve slot->content mapping, invalid slot key in list: ${slotKeys}`);
  }

  const contentKeys = mapping.map((pair) => pair.content);
  const content = await Promise.all(contentKeys.map(
    (key) => ContentModel
      .findOne({ key })
      .populate(POPULATE_TYPE),
  ));

  if (content.length !== contentKeys.length) {
    log.error(LOG_PREFIX, 'invalid content key in list:', contentKeys);
    throw new Error(`can't resolve slot->content mapping, invalid content key in list: ${contentKeys}`);
  }

  const mappedContent = slots.map((slot, id) => ({
    slot,
    content: content[id],
  }));

  log.verbose(LOG_PREFIX, JSON.stringify(mappedContent));
  return mappedContent;
}

export default resolveSlotContentMapping;
