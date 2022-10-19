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
    await db.collection('users').doc(res.uid).set(newUserData)
    return true
  })
  .catch((error) => {
    throw new functions.https.HttpsError(
      'failed-precondition',
      error
    )
  });
})

exports.deleteUser = functions.https.onCall((data, context) => {
  return admin.auth().deleteUser(data)
  .then(async (res) => {
    console.log('userRecord', res)
    await db.collection('users').doc(data).delete()
    return true
  })
  .catch((error) => {
    throw new functions.https.HttpsError(
      'failed-precondition',
      error
    )
  });
})