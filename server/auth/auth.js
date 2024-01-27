const { json } = require('express');
const graph = require('./graph');
const router = require('express-promise-router')();
const jwt = require('jsonwebtoken');

/* GET auth callback. */
router.get('/signin',
  async function (req, res) {
    const urlParameters = {
      scopes: process.env.OAUTH_SCOPES.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI
    };
    console.log(urlParameters);
    try {
      const authUrl = await req.app.locals
        .msalClient.getAuthCodeUrl(urlParameters);
      res.redirect(authUrl);
    }
    catch (error) {
      console.log(`Error: ${error}`);
      req.flash('error_msg', {
        message: 'Error getting auth URL',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
      res.redirect('/');
    }
  }
);

router.get('/callback',
  async function(req, res) {
    const tokenRequest = {
      code: req.query.code,
      scopes: process.env.OAUTH_SCOPES.split(','),
      redirectUri: process.env.OAUTH_REDIRECT_URI
    };

    try {
      const response = await req.app.locals
        .msalClient.acquireTokenByCode(tokenRequest);
      console.log("The access token: ",response);
      const idtoken = response.idToken;
      console.log("The id token: ",idtoken);
      // Save the user's homeAccountId in their session
      req.session.userId = response.account.homeAccountId;


      const user = await graph.getUserDetails(
        req.app.locals.msalClient,
        req.session.userId
      );
      console.log(user);
      // Add the user to user storage
      req.app.locals.users[req.session.userId] = {
        displayName: user.displayName,
        email: user.mail || user.userPrincipalName,
        timeZone: user.mailboxSettings.timeZone,
        program: user.jobTitle,
        rollNo: user.surname
      };
      jwt.sign(
      {isowner: true, id: user.mail || user.userPrincipalName},
      process.env.JWT_SEC,
      (err, token) => {
        console.log("The token: ",token);
        user.token = token;
        console.log(user);
        res.send(JSON.stringify(user));
      }
    );
    } catch(error) {
      req.flash('error_msg', {
        message: 'Error completing authentication',
        debug: JSON.stringify(error, Object.getOwnPropertyNames(error))
      });
    }
  }
);

router.get('/signout',
  async function(req, res) {
    // Sign out
    if (req.session.userId) {
      // Look up the user's account in the cache
      const accounts = await req.app.locals.msalClient
        .getTokenCache()
        .getAllAccounts();

      const userAccount = accounts.find(a => a.homeAccountId === req.session.userId);

      // Remove the account
      if (userAccount) {
        req.app.locals.msalClient
          .getTokenCache()
          .removeAccount(userAccount);
      }
    }

    // Destroy the user's session
    req.session.destroy(function (err) {
      res.redirect('/');
    });
  }
);

module.exports = router;