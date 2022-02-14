import { bootstrap } from 'yoshi-serverless-testing';
import HttpClient from 'yoshi-serverless-client';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';
import { fetchComments, siteId } from '../src/comments.api';

const serverlessApp = bootstrap();

let client: HttpClient;

describe('Ambassador module', () => {
  beforeAll(async () => {
    await serverlessApp.start();
    client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
  });

  it('fetch method should return comments', async () => {
    const mockComment = aComment().build();

    const commentsStub =
      serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
    commentsStub.CommentsService().fetch.when(siteId).resolve([mockComment]);

    const response = await client.request(fetchComments)();
    expect(response).toEqual([mockComment]);
  });
});
