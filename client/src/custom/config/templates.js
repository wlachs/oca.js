/* Custom imports */
import Sample from '../templates/Sample';

const template = [
  {
    key: 'SAMPLE_TEMPLATE',
    content: Sample,
  },
];

function getTemplate(key) {
  return template.find((t) => t.key === key).content;
}

export default getTemplate;
