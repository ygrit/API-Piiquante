const Sauce = require('../models/Sauce');

// Like ou dislike de Sauce  avec If et else

exports.likeSauce = (req, res, next) =>{
    const Like = req.body.like;
    const userId = req.body.userId;
//chercher l'objet dans la base de données
    Sauce.findOne({_id: req.params.id})
    .then((sauce)=>{

        if(Like === 1){
            //mise à jour de base
            Sauce.updateOne({_id: req.params.id},
                {$inc: {likes:+1}, 
                $push:{usersLiked: userId}})
            .then(()=>res.status(200).json({ message : "L'utilisateur a liké" }))
            .catch(error=> res.status(400).json({ message: "Requête impossible !" }));
        }
        else if(Like === -1){
            Sauce.updateOne({_id: req.params.id},
                {$inc: {dislikes:+1}, 
                $push:{usersDisliked: userId}
            })
            .then(()=>res.status(200).json({ message:"L'utilisateur a disliké" }))
            .catch(error=> res.status(400).json({ message : "Erreur" }));
        }
        else if(Like === 0){
            if(sauce.usersLiked.includes(userId)){
                Sauce.updateOne({_id: req.params.id},
                    {$inc:{likes:-1}, 
                    $pull:{usersLiked:userId}
                })
                .then(()=>res.status(200).json({ message: "L'utilisateur à retiré son like"} ))
                .catch(error=>res.status(400).json({ message : "Erreur" }));
            }
            else if(sauce.usersDisliked.includes(userId)){
                Sauce.updateOne({_id:req.params.id},
                    {$inc:{dislikes:-1}, 
                    $pull:{usersDisliked:userId}
                })
                .then(()=>res.status(200).json({ message : "L'utilisateur à retiré son dislike" }))
                .catch(error=> res.status(400).json({ message : "Erreur" }));
            }
        }
    })
    .catch(error=>res.status(404).json({ message : "erreur" }));
};