/* Custom imports */
import SimplePage from '../templates/SimplePage';
import MissingPage from '../templates/MissingPage';

const TEMPLATE_MAP = [
  {
    key: 'SIMPLE_PAGE_TEMPLATE',
    content: SimplePage,
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
