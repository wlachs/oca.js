import log from 'npmlog';

const LOG_PREFIX = 'LAYOUT_DAO_VALIDATE_VIEW';

function validateSlotContentAssignment(slot, content) {
  log.verbose(LOG_PREFIX, 'validate slot->content assignment', JSON.stringify(slot, undefined, 4), JSON.stringify(content, undefined, 4));

  const { key, allowedContentTypes } = slot;
  const assignment = content.find((contentAssignment) => contentAssignment.slot.key === key);

  if (!assignment) {
    log.error(LOG_PREFIX, 'no assigned content found for slot:', slot.key);
    return false;
  }

  if (allowedContentTypes.find((type) => type.key === assignment.content.type.key)) {
    log.verbose(LOG_PREFIX, 'valid slot->content association:', slot.key, assignment.content.key);
    return true;
  }

  return false;
}

function validate(view) {
  log.info(LOG_PREFIX, 'validate view:', JSON.stringify(view, undefined, 4));

  const { template, content } = view;
  const templateSlots = template.slots;

  /* Find for each template slot the matching content association in the content map */
  if (templateSlots.every((slot) => validateSlotContentAssignment(slot, content))) {
    log.info(LOG_PREFIX, 'view valid', JSON.stringify(view, undefined, 4));
  } else {
    log.error(LOG_PREFIX, 'view invalid', JSON.stringify(view, undefined, 4));
    throw new Error('view validation failed, view invalid');
  }
}

export default validate;
