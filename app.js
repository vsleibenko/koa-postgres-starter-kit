// INIT ENV VARS
require('dotenv').config();

// LIBS
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const passport = require('./passport');

// ROUTES
const usersRouter = require('./routes/users');

// APP
const app = new Koa();

passport(app);
app.use(bodyParser());
app.use(cors({
  origin: (ctx) => {
    if (!process.env.CORS_ALLOWED_ORIGINS) return false;
    const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS.split(',');
    const requestedOrigin = ctx.accept.headers.origin;
    const grantPermission = allowedOrigins.find((origin) => origin === requestedOrigin);

    return grantPermission || false;
  },
  credentials: true,
}));

// GLOBAL ERROR HANDLING
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
    ctx.app.emit('error', err, ctx);
  }
});

app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(process.env.PORT || 3000);
