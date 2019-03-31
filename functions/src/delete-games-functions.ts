import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.deleteGame = functions.firestore
  .document('games/{gameID}')
  .onDelete((snap, context) => {
    return new Promise( async (resolve, reject) => {
      const deletedGame = snap.data();
      if(deletedGame) {
        try{
          await admin.firestore().collection('files')
            .doc(deletedGame.pictureId)
            .delete()
            .then();

          const resultFromStorage = await admin.storage()
            .bucket().file('game-pictures/' + deletedGame.pictureId)
            .delete()
            .then()

          resolve(resultFromStorage);
        } catch (e) {
          reject(e);
        }


        /*
        admin.firestore().collection('files')
          .doc(deletedProduct.pictureId)
          .delete()
          .then(value => {
              admin.storage()
                .bucket().file('product-pictures/' + deletedProduct.pictureId)
                .delete()
                .then(res => resolve(res), err => reject(err))
                .catch(err => reject(err))
            },
            err => reject(err))
          .catch(err => reject(err))*/
      } else {
        reject('No product deleted');
      }

    });
  });
