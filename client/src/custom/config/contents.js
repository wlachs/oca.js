/* Custom imports */
import SampleStaticContent from '../contents/SampleStaticContent';
import SampleDynamicContent from '../contents/SampleDynamicContent';

const content = [
  {
    key: 'SAMPLE_CONTENT_1',
    content: SampleStaticContent,
  },
  {
    key: 'SAMPLE_CONTENT_2',
    content: SampleDynamicContent,
  },
];

function getContent(key) {
  /* FIXME: handle if content is not found */
  return content.find((c) => c.key === key).content;
}

export default getContent;
