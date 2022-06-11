/* Custom imports */
import MissingContent from '../content/MissingContent';
import TopBarContent from '../content/TopBarContent';
import HomeImageContent from '../content/HomeImageContent';
import ContactEmailContent from '../content/ContactEmailContent';
import ProjectListContent from '../content/ProjectListContent';
import HeaderTextContent from '../content/HeaderTextContent';
import LoginFormContent from '../content/LoginFormContent';
import EditorContent from '../content/EditorContent';

const CONTENT_MAP = [
  /*
   * Type-based component associations
   */
  {
    key: 'HEADER_CONTENT_TYPE',
    content: HeaderTextContent,
  },
  {
    key: 'TOP_BAR_CONTENT_TYPE',
    content: TopBarContent,
  },
  {
    key: 'LOGIN_FORM_CONTENT_TYPE',
    content: LoginFormContent,
  },
  {
    key: 'ADMIN_EDITOR_CONTENT_TYPE',
    content: EditorContent,
  },
  /*
   * Key-based component associations
   */
  {
    key: 'MISSING_CONTENT',
    content: MissingContent,
  },
  {
    key: 'HOME_IMAGE_CONTENT',
    content: HomeImageContent,
  },
  {
    key: 'CONTACT_EMAIL_CONTENT',
    content: ContactEmailContent,
  },
  {
    key: 'PROJECT_LIST_CONTENT',
    content: ProjectListContent,
  },
];

function getContent(key, type) {
  const contentAssociation = CONTENT_MAP.find((c) => c.key === key);

  if (contentAssociation) {
    return contentAssociation.content;
  }

  const contentTypeAssociation = CONTENT_MAP.find((c) => c.key === type);

  if (contentTypeAssociation) {
    return contentTypeAssociation.content;
  }

  return () => MissingContent({ what: `${key} of type ${type}` });
}

export default getContent;
