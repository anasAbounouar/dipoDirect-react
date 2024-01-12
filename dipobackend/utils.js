import jwt from 'jsonwebtoken';
import { OAuth2Client } from "google-auth-library";


export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: 'Invalid Token' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export async function verifyGoogle(client_id, jwtToken) {
  const client = new OAuth2Client(client_id);

  try {
    const ticket = await client.verifyIdToken({
      idToken: jwtToken,
      audience: client_id,
    });

    const payload = ticket.getPayload();

    return payload;
  } catch (err) {
    console.log(err);
  }
}