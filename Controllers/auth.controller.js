const conn = require("../config/db.config");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuth(req, res) {
  try {
    const { token } = req.body;

    // 1️⃣ VERIFY TOKEN FROM GOOGLE
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;

    // 2️⃣ CHECK IF USER EXISTS
    const [rows] = await conn.execute(
      "SELECT * FROM admin_users WHERE admin_email = ?",
      [email]
    );

    let user = rows[0];

    // 3️⃣ AUTO-CREATE USER IF FIRST LOGIN
    if (!user) {
      const [insert] = await conn.execute(
        "INSERT INTO admin_users (admin_email, admin_name, admin_password_hash) VALUES (?, ?, ?)",
        [email, name, "GOOGLE_LOGIN"]
      );

      user = {
        admin_id: insert.insertId,
        admin_email: email,
        admin_name: name,
      };
    }

    // 4️⃣ GENERATE JWT
    const accessToken = jwt.sign(
      {
        id: user.admin_id,
        email: user.admin_email,
        name: user.admin_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token: accessToken,
      user: {
        id: user.admin_id,
        email: user.admin_email,
        name: user.admin_name,
        picture,
      },
    });
  } catch (err) {
    console.error("Google Login Error:", err);
    res.status(400).json({ success: false, error: "Invalid Google token" });
  }
}


module.exports = {googleAuth}