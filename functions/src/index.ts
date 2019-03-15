import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {object} from 'firebase-functions/lib/providers/storage';
import {reject} from 'q';

admin.initializeApp()

exports.deleteGame = functions.firestore
  .document('games/{gameID}')
  .onDelete((snap, context) => {
    return new Promise(async (resolve, reject) => {
      const deletedGame = snap.data();
      if (deletedGame) {
        try {
          await admin.firestore().collection('files')
            .doc(deletedGame.pictureId)
            .delete()
            .then();

          const resultFromStorage = await admin.storage()
            .bucket().file('game-pictures/' + deletedGame.gameId)
            .delete()
            .then();

          resolve(resultFromStorage);
        } catch (err) {
          reject(err)
        }



        admin.firestore().collection('files')
          .doc(deletedGame.pictureId)
          .delete()
          .then(value => {
              admin.storage()
                .bucket().file('game-pictures/' + deletedGame.gameId)
                .delete()
                .then(res => resolve(res), err => reject(err))
            .catch(err => reject(err))
            },
            err => reject(err))
          .catch(err => reject(err))
      } else {
        reject('no game deleted');
      }

  });
});


 exports.uploadNewGameImage =
   functions.storage.object().onFinalize((object) => {
     return new Promise((resolve, reject) => {
       if(object && object.name && object.metadata) {
         const fileMeta = {
           lastModified: object.updated,
           name: object.metadata.originalName,
           type: 'image/png',
           size: object.size
         };
         const nameForDoc = object.name.split('/')[1];
       }
     })

   });
