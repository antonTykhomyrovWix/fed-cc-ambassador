import React, { FC } from 'react';
import {
  useTranslation,
  useAppLoaded,
  useRequest,
} from 'yoshi-flow-bm-runtime';

import { Page, Layout, Cell, Card, Text } from 'wix-style-react';

import { fetchComments } from '../comments.api';

const introUrl = 'https://github.com/wix-private/business-manager';

const Index: FC = () => {
  useAppLoaded({ auto: true });
  const { loading, error, data } = useRequest(fetchComments);

  const { t } = useTranslation();

  if (error) {
    return <div>ERROR !!!!</div>;
  }

  if (loading) {
    return <div>... !!!!</div>;
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        <Layout>
          <Cell>{JSON.stringify(data)}</Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
