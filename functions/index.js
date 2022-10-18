const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp()

const db = admin.firestore()

exports.createUser = functions.https.onCall((data, context) => {
  return admin.auth().createUser(data)
  .then(async (res) => {
    console.log('userRecord', res)
    const newUserData = {
      email: data.email,
      name: data.displayName ? data.displayName : 'Default User',
      role: 'user',
      avatar: null,
    }
    db.collection('users').add(newUserData)
    return true
  })
  .catch((error) => {
    throw new functions.https.HttpsError(
      'failed-precondition',
      error
    )
  });
})