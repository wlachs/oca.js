/* Custom imports */
import MissingContent from '../content/MissingContent';

const CONTENT_MAP = [
  {
    key: 'MISSING_CONTENT',
    content: MissingContent,
  },
];

function getContent(key) {
  const contentAssociation = CONTENT_MAP.find((c) => c.key === key);

  if (!contentAssociation) {
    return MissingContent;
  }

  return contentAssociation.content;
}

export default getContent;
