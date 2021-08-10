/* Custom imports */
import MissingContent from '../content/MissingContent';

const CONTENT_MAP = [
  {
    key: 'MISSING_CONTENT',
    content: MissingContent,
  },
];

function getContent(key) {
  const content = CONTENT_MAP.find((c) => c.key === key);

  if (!content) {
    return MissingContent;
  }

  return content;
}

export default getContent;
