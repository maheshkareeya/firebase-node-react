const admin = require("firebase-admin");
const serviceAccount = require("./firebase-key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://firebase-node-react.firebaseio.com"
});
