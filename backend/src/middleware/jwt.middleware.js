import jwt from 'jsonwebtoken';

let verificarToken = (req, res, next) => {
  let token = req.get("Authorization");//headers

  jwt.verify(token, "secret", (err, decoded) => {

    if (err) {
      return res.status(401).json({
        ok: false,
        err
      });
    }

    req.user = decoded.user;

    next();
  });

};

export default verificarToken;