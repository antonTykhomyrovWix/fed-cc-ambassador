import { method } from 'yoshi-serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

export const siteId = '1bbb5d61-2e3b-457e-851c-51a67fa744a0';

export const fetchComments = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();
  return commentsService(this.context.aspects).fetch(siteId);
});
