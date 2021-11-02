import admin from 'firebase-admin';
var serviceAccount = require("../unq-arq-soft-1-grupo-e-firebase-adminsdk-jsxd9-cc4382a65f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default admin;