const functions = require("firebase-functions");
const admin = require('firebase-admin');
const regionalFunctions = functions.region('asia-northeast3');

admin.initializeApp();

exports.createUser = regionalFunctions.https.onRequest((request, response) => {
  admin.auth.createUser({
    email: 'user@example.com',
    emailVerified: true,
    password: 'secretPassword',
  })
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:');
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });
})