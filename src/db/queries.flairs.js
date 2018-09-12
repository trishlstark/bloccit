const Post = require("./models").Post;
const Flair = require("./models").Flair;

module.exports = {
    addflair(newflair, callback){
        return flair.create(newflair)
        .then((flair) => {
          callback(null, flair);
        })
        .catch((err) => {
          callback(err);
        })
      },

    getflair(id, callback){
        return flair.findById(id)
        .then((flair) => {
          callback(null, flair);
        })
        .catch((err) => {
          callback(err);
        })
      },

    deleteflair(id, callback){
        return flair.destroy({
          where: { id }
        })
        .then((deletedRecordsCount) => {
          callback(null, deletedRecordsCount);
        })
        .catch((err) => {
          callback(err);
        })
      },

    updateflair(id, updatedflair, callback){
        return flair.findById(id)
        .then((flair) => {
          if(!flair){
            return callback("flair not found");
          }
   
          flair.update(updatedflair, {
            fields: Object.keys(updatedflair)
          })
          .then(() => {
            callback(null, flair);
          })
          .catch((err) => {
            callback(err);
          });
        });
      } 
}