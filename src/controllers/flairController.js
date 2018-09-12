const flairQueries = require("../db/queries.flairs.js");


module.exports = {
    new(req, res, next){
        res.render("flairs/new", {postId: req.params.postId});
      },

    create(req, res, next){
        let newflair= {
          title: req.body.name,
          body: req.body.color,
          postId: req.params.postId
        };
        flairQueries.addflair(newflair, (err, flair) => {
          if(err){
            res.redirect(500, "/flairs/new");
          } else {
            res.redirect(303, `/posts/${newflair.postId}/flairs/${flair.id}`);
          }
        });
      },

    show(req, res, next){
        flairQueries.getflair(req.params.id, (err, flair) => {
          if(err || flair == null){
            res.redirect(404, "/");
          } else {
            res.render("flairs/show", {flair});
          }
        });
      },
     
    destroy(req, res, next){
        flairQueries.deleteflair(req.params.id, (err, deletedRecordsCount) => {
          if(err){
            res.redirect(500, `/posts/${req.params.postId}/flairs/${req.params.id}`)
          } else {
            res.redirect(303, `/posts/${req.params.postId}`)
          }
        });
      },
      
    edit(req, res, next){
        flairQueries.getflair(req.params.id, (err, flair) => {
          if(err || flair == null){
            res.redirect(404, "/");
          } else {
            res.render("flairs/edit", {flair});
          }
        });
      },
    
   update(req, res, next){
        flairQueries.updateflair(req.params.id, req.body, (err, flair) => {
            if(err || flair == null){
                res.redirect(404, `/posts/${req.params.postId}/flairs/${req.params.id}/edit`);
            } else {
                res.redirect(`/posts/${req.params.postId}/flairs/${req.params.id}`);
            }
            });
    }

    
   
}