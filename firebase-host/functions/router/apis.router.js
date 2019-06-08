const express = require("express");
const router = express.Router();

const admin = require("firebase-admin");
require("../db");
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

router.post('/', async (req, res, next) => {
   
    try {
        const text = req.body.name;
        if (!text) throw new Error('Text is blank');
        const data = { text };
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