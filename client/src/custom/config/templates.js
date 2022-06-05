/* Custom imports */
import TwoComponentPage from '../templates/TwoComponentPage';
import ThreeComponentPage from '../templates/ThreeComponentPage';
import MissingPage from '../templates/MissingPage';

const TEMPLATE_MAP = [
  {
    key: 'TWO_SLOT_PAGE_TEMPLATE',
    content: TwoComponentPage,
  },
  {
    key: 'THREE_SLOT_PAGE_TEMPLATE',
    content: ThreeComponentPage,
  },
  {
    key: 'MISSING_TEMPLATE',
    content: MissingPage,
  },
];

function getTemplate(key) {
  const template = TEMPLATE_MAP.find((t) => t.key === key);

  if (!template) {
    return MissingPage;
  }

  return template.content;
}

export default getTemplate;
