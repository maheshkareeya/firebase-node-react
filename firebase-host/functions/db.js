const admin = require("firebase-admin");
const serviceAccount = require("./fir-node-react-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-node-react.firebaseio.com"
});

