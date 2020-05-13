const session = require('koa-session');
const passport = require('koa-passport');

const { memoryStore } = require('./db');

const initPassportWithSession = (app) => {
  app.keys = [process.env.SESSION_SECRET_KEY];
  app.use(session({
    maxAge: 60 * 60 * 1000,
    rolling: true,
    renew: true,
    httpOnly: true,
    store: memoryStore,
  }, app));

  passport.serializeUser(({ email }, done) => {
    done(null, { email });
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = initPassportWithSession;
