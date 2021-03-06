require("dotenv").config();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const crypto = require("crypto");

const isValidHash = (hash) => {
  return hash.startsWith("00");
};

exports.validateSignup = (req, res, next) => {
  const { email, password, userName } = req.body;
  let errors = [];
  if (!email) {
    return res.status(400).json({
      error: "email is required",
    });
  }
  if (!userName) {
    return res.status(400).json({
      error: "userName is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }
  if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return res.status(400).json({
      error: "invalid mail",
    });
  }
  if (password.length < 3) {
    return res.status(400).json({
      error: "Password must have minimum 3 characters",
    });
  }
  next();
};

exports.makeSignup = (req, res) => {
  const { email, password, userName } = req.body;
  User.findOne({
    email,
  }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is already taken",
      });
    } else {
      const token = jwt.sign(
        {
          email,
          password,
          userName,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2d",
        }
      );

      var mailOptions = {
        from: "kartheekenumarthi@gmail.com",
        to: email,
        subject: `Blockchain Demo email Verification Link`,
        html: `
                <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <style type="text/css">
        body,
        p,
        div {
            font-family: inherit;
            font-size: 14px;
        }

        body {
            color: #000000;
        }

        body a {
            color: #1188E6;
            text-decoration: none;
        }

        p {
            margin: 0;
            padding: 0;
        }

        table.wrapper {
            width: 100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        img.max-width {
            max-width: 100% !important;
        }

        .column.of-2 {
            width: 50%;
        }

        .column.of-3 {
            width: 33.333%;
        }

        .column.of-4 {
            width: 25%;
        }

        @media screen and (max-width:480px) {

            .preheader .rightColumnContent,
            .footer .rightColumnContent {
                text-align: left !important;
            }

            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
                text-align: left !important;
            }

            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
                font-size: 80% !important;
                padding: 5px 0;
            }

            table.wrapper-mobile {
                width: 100% !important;
                table-layout: fixed;
            }

            img.max-width {
                height: auto !important;
                max-width: 100% !important;
            }

            a.bulletproof-button {
                display: block !important;
                width: auto !important;
                font-size: 80%;
                padding-left: 0 !important;
                padding-right: 0 !important;
            }

            .columns {
                width: 100% !important;
            }

            .column {
                display: block !important;
                width: 100% !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
                margin-left: 0 !important;
                margin-right: 0 !important;
            }
        }
    </style>
    <!--user entered Head Start-->
    <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Muli', sans-serif;
        }
    </style>
    <!--End Head user entered-->
</head>

<body>
    <center class="wrapper" data-link-color="#1188E6"
        data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                <tbody>
                    <tr>
                        <td valign="top" bgcolor="#FFFFFF" width="100%">
                            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0"
                                cellspacing="0" border="0">
                                <tbody>
                                    <tr>
                                        <td width="100%">
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                                            <table width="100%" cellpadding="0" cellspacing="0"
                                                                border="0" style="width:100%; max-width:600px;"
                                                                align="center">
                                                                <tbody>
                                                                    <tr>
                                                                        <td role="modules-container"
                                                                            style="padding:0px 0px 0px 0px; color:#000000; text-align:left;"
                                                                            bgcolor="#FFFFFF" width="100%" align="left">
                                                                            <table
                                                                                class="module preheader preheader-hide"
                                                                                role="module" data-type="preheader"
                                                                                border="0" cellpadding="0"
                                                                                cellspacing="0" width="100%"
                                                                                style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td role="module-content">
                                                                                            <p></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                            <table border="0" cellpadding="0"
                                                                                cellspacing="0" align="center"
                                                                                width="100%" role="module"
                                                                                data-type="columns"
                                                                                style="padding:30px 20px 30px 20px;"
                                                                                bgcolor="#f6f6f6">
                                                                                <tbody>
                                                                                    <tr role="module-content">
                                                                                        <td height="100%" valign="top">
                                                                                            <table class="column"
                                                                                                width="540"
                                                                                                style="width:540px; border-spacing:0; border-collapse:collapse; margin:0px 10px 0px 10px;"
                                                                                                cellpadding="0"
                                                                                                cellspacing="0"
                                                                                                align="left" border="0"
                                                                                                bgcolor="">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td
                                                                                                            style="padding:0px;margin:0px;border-spacing:0;">
                                                                                                            <table
                                                                                                                class="module"
                                                                                                                role="module"
                                                                                                                data-type="spacer"
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="table-layout: fixed;"
                                                                                                                data-muid="331cde94-eb45-45dc-8852-b7dbeb9101d7">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:0px 0px 20px 0px;"
                                                                                                                            role="module-content"
                                                                                                                            bgcolor="">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>

                                                                                                            <table
                                                                                                                class="module"
                                                                                                                role="module"
                                                                                                                data-type="spacer"
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="table-layout: fixed;"
                                                                                                                data-muid="27716fe9-ee64-4a64-94f9-a4f28bc172a0">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:0px 0px 30px 0px;"
                                                                                                                            role="module-content"
                                                                                                                            bgcolor="">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                            <table
                                                                                                                class="module"
                                                                                                                role="module"
                                                                                                                data-type="text"
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="table-layout: fixed;"
                                                                                                                data-muid="948e3f3f-5214-4721-a90e-625a47b1c957"
                                                                                                                data-mc-module-version="2019-10-22">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:50px 30px 18px 30px; line-height:36px; text-align:inherit; background-color:#ffffff;"
                                                                                                                            height="100%"
                                                                                                                            valign="top"
                                                                                                                            bgcolor="#ffffff"
                                                                                                                            role="module-content">
                                                                                                                            <div>
                                                                                                                                <div
                                                                                                                                    style="font-family: inherit; text-align: center">
                                                                                                                                    <span
                                                                                                                                        style="font-size: 43px">Thanks
                                                                                                                                        for
                                                                                                                                        signing
                                                                                                                                        up,
                                                                                                                                        ${userName}!&nbsp;</span>
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                            <table
                                                                                                                class="module"
                                                                                                                role="module"
                                                                                                                data-type="text"
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="table-layout: fixed;"
                                                                                                                data-muid="a10dcb57-ad22-4f4d-b765-1d427dfddb4e"
                                                                                                                data-mc-module-version="2019-10-22">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:18px 30px 18px 30px; line-height:22px; text-align:inherit; background-color:#ffffff;"
                                                                                                                            height="100%"
                                                                                                                            valign="top"
                                                                                                                            bgcolor="#ffffff"
                                                                                                                            role="module-content">
                                                                                                                            <div>
                                                                                                                                <div
                                                                                                                                    style="font-family: inherit; text-align: center">
                                                                                                                                    <span
                                                                                                                                        style="font-size: 18px">Please
                                                                                                                                        verify
                                                                                                                                        your
                                                                                                                                        email
                                                                                                                                        address
                                                                                                                                        to</span><span
                                                                                                                                        style="color: #000000; font-size: 18px; font-family: arial,helvetica,sans-serif">
                                                                                                                                        get
                                                                                                                                        access
                                                                                                                                        to
                                                                                                                                        Block chain demo</span><span
                                                                                                                                        style="font-size: 18px">.</span>
                                                                                                                                </div>
                                                                                                                                <div
                                                                                                                                    style="font-family: inherit; text-align: center">
                                                                                                                                    <span
                                                                                                                                        style="color: #ffbe00; font-size: 18px"><strong>Thank
                                                                                                                                            you!&nbsp;</strong></span>
                                                                                                                                </div>
                                                                                                                                <div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                            <table
                                                                                                                class="module"
                                                                                                                role="module"
                                                                                                                data-type="spacer"
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                width="100%"
                                                                                                                style="table-layout: fixed;"
                                                                                                                data-muid="7770fdab-634a-4f62-a277-1c66b2646d8d">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td style="padding:0px 0px 20px 0px;"
                                                                                                                            role="module-content"
                                                                                                                            bgcolor="#ffffff">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                            <table
                                                                                                                border="0"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                                class="module"
                                                                                                                data-role="module-button"
                                                                                                                data-type="button"
                                                                                                                role="module"
                                                                                                                style="table-layout:fixed;"
                                                                                                                width="100%"
                                                                                                                data-muid="d050540f-4672-4f31-80d9-b395dc08abe1">
                                                                                                                <tbody>
                                                                                                                    <tr>
                                                                                                                        <td align="center"
                                                                                                                            bgcolor="#ffffff"
                                                                                                                            class="outer-td"
                                                                                                                            style="padding:0px 0px 0px 0px;">
                                                                                                                            <table
                                                                                                                                border="0"
                                                                                                                                cellpadding="0"
                                                                                                                                cellspacing="0"
                                                                                                                                class="wrapper-mobile"
                                                                                                                                style="text-align:center;">
                                                                                                                                <tbody>
                                                                                                                                    <tr>
                                                                                                                                        <td align="center"
                                                                                                                                            bgcolor="#ffbe00"
                                                                                                                                            class="inner-td"
                                                                                                                                            style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                                                                                                                                            <a href="${process.env.CLIENT_URL}/verify/${token}"
                                                                                                                                                style="background-color:#ffbe00; border:1px solid #ffbe00; border-color:#ffbe00; border-radius:0px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:12px 40px 12px 40px; text-align:center; text-decoration:none; border-style:solid; font-family:inherit;"
                                                                                                                                                target="_blank">Verify
                                                                                                                                                Email
                                                                                                                                                Now</a>
                                                                                                                                        </td>
                                                                                                                                    </tr>
                                                                                                                                </tbody>
                                                                                                                            </table>
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>

                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>

                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                            <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </center>


</body>

</html>
            `,
        text: `Please click the link below to Activate your Account ${process.env.CLIENT_URL}/verify/${token}`,
      };

      sgMail
        .send(mailOptions)
        .then((data) => {
          return res.json({
            message:
              "Your verification mail sent to " +
              email +
              ". Kindly please check spam and Promotions folder aswell",
          });
        })
        .catch((err) => {
          console.log(err.response.body);
          return res.status(400).json({
            error: "error in sending mail,Sign in again",
          });
        });
    }
  });
};

exports.verifyEmail = (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, docoded) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          error: "Expired Token, Signup again",
        });
      } else {
        const { userName, email, password } = jwt.decode(token);
        let timeStamp = new Date().getTime();
        let nonce = 0;
        let prev = "0";
        let data = `Welcome ${userName}!`;
        let hash = "";
        while (!isValidHash(hash)) {
          nonce = nonce + 1;
          hash = crypto
            .createHmac("sha256", data)
            .update(nonce + prev + timeStamp.toString())
            .digest("hex");
        }
        const user = new User({
          email,
          password,
          userName,
          blocks: [
            {
              timeStamp,
              data,
              nonce,
            },
          ],
        });

        user.save((err, user) => {
          if (err) {
            if (err.code == 11000) {
              return res.status(400).json({
                error: "Already verified!",
              });
            }
            return res.status(500).json({
              error: "something went wrong",
            });
          } else {
            return res.json({
              message: "Email verfied",
            });
          }
        });
      }
    });
  } else {
    return res.status(400).json({
      error: "error in verification, please try again",
    });
  }
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email) {
    return res.status(400).json({
      error: "Email is required",
    });
  }
  if (!password) {
    return res.status(400).json({
      error: "Password is required",
    });
  }
  if (
    !email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    return res.status(400).json({
      error: "Invalid Email",
    });
  }
  if (password.length < 3) {
    return res.status(400).json({
      error: "Password will have minimum 3 characters",
    });
  }
  next();
};

exports.makeLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email,
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Please signup or Verify your email",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: `Email and password doesn't match`,
      });
    }
    const { _id, email, userName } = user;
    const token = jwt.sign(
      {
        _id,
        email,
        userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.json({ token });
  });
};
