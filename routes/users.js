const Router = require('koa-router');

const router = new Router();

const requireAuth = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  }

  return ctx.throw(401, 'Unauthorized');
};

router.get('/check_auth', requireAuth, async (ctx) => {
  ctx.body = 'Logged in';
});

router.post('/logout', async (ctx) => {
  ctx.logout();
  ctx.status = 204;
});

router.post('/login', async (ctx) => {
  const { email } = ctx.request.body;

  if (!email) ctx.throw(400, 'Email is required');

  const deserializedUser = { email };
  await ctx.login(deserializedUser);
  ctx.body = deserializedUser;
});

module.exports = router;
