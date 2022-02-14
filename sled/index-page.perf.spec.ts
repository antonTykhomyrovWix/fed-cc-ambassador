/// <reference types="sled-test-runner" />
import { benchmark } from '@wix/perfer-sled';
import { injectBMOverrides } from 'yoshi-flow-bm';

const SLED_DEFAULT_MSID = 'eeaf3519-1406-45f0-a8ea-a59a4ecbc1a6';

benchmark('render index page', async () => {
  const { page } = await sled.newPage({
    authType: 'free-user',
  });

  await injectBMOverrides({
    page,
    appConfig: require('../target/module-sled.merged.json'),
  });

  const bmUrl = `https://www.wix.com/dashboard/${SLED_DEFAULT_MSID}/fed-cc-ambassador`;

  await page.goto(bmUrl);

  await page.waitForSelector('[data-hook=get-started]');
});
