const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //on récupère le token
    const decodedToken = jwt.verify(token, 'CODE_SECRET'); //on le décode
    const userId = decodedToken.userId; //on récupère l'id du token décodé
    //req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};