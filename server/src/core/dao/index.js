import { removeApplicationProperties } from './application_property';

// eslint-disable-next-line import/prefer-default-export
export async function clearDB() {
  await removeApplicationProperties();
}
