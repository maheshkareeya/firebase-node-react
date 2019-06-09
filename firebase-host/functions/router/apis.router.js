const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
const serviceAccount = require("../fir-node-react-firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-node-react.firebaseio.com"
});
const db = admin.firestore();



router.get('/', async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('notes').get();
        const notes = [];
        noteSnapshot.forEach((doc) => {
            notes.push({
                id: doc.id,
                data: doc.data()
            });
        });
        res.json(notes);
    } catch(e) {
        next(e);
    }
});


router.get('/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        const note = await db.collection('notes').doc(id).get();
        if (!note.exists) {
            throw new Error('note does not exists');
        }
        res.json({
            id: note.id,
            data: note.data()
        });
    } catch(e) {
        next(e);
    }
})
router.get('/delete/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('id is blank');
        db.collection('notes').doc(id).delete()
        .then(()=>{res.json({message:"deleted"})})
        .catch((err)=>res.json({message:"error"}))
        // res.json({
            
        //     message: "deleted"
        // });
    } catch(e) {
        next(e);
    }
})
router.post('/', async (req, res, next) => {
   
    try {
        const id = req.body.id;
        const title = req.body.title;
        const body = req.body.body;
        if (!id) throw new Error('Text is blank');
        const data = { id, title, body };
        const ref = await db.collection('notes').add(data);
        res.json({
            id: ref.id,
            data
        });
    } catch(e) {
        next(e);
    }
});



module.exports = router;