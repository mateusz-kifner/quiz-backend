const jwt = require("jsonwebtoken");

module.exports.addToBlackList = token => {
  try {
    jwt.verify(token, process.env.JWT_KEY);
    blacklist.push(token);
  } catch {}
};

module.exports.logBlackList = () => {
  return blacklist;
};

module.exports.updateBlackList = () => {
  blacklist = this.removeNotValid(blacklist);
};
// permissions
// 3 bytes
// all, group, user
// all gives perrmission to access all users lower in hierarchy than you
// group gives perrmission to access users at your hierarchy level
// user gives perrmission to access your data
// bit 1 read
// bit 2 create
// bit 3 delete
// bit 4 patch

var permissions = {
  user: 0b000000001111,
  mod: 0b111100011111,
  admin: 0b111100011111,
  headadmin: 0b111111111111
};

var permissions_hierarchy = ["user", "mod", "admin", "headadmin"];

module.exports.permission = (permissonMask = 0b1111, permissionCode = 0) => {
  if (global.blacklist == undefined) {
    global.blacklist = Array();
  }
  return (req, res, next) => {
    try {
      let token = req.headers.authorization.split(" ")[1];
      for (blacklisted of global.blacklist) {
        if (blacklisted === token)
          return res.status(500).json({ error: { message: "Auth failed" } });
      }
      req.userJWT = jwt.verify(token, process.env.JWT_KEY);
      req.userPermCode = Object.keys(permissions_hierarchy).find(
        key => permissions_hierarchy[key] === req.userJWT.permission
      );
      if (req.userPermCode >= permissionCode) {
        req.userPermMask = permissions[req.userJWT.permission];
        if (req.userPermMask & (permissonMask !== permissonMask))
          return res.status(500).json({ error: { message: "Auth failed" } });
        next();
      } else {
        res.status(500).json({ error: { message: "Auth failed" } });
      }
    } catch (err) {
      return res.status(500).json({ error: { message: "Auth failed" } });
    }
  };
};

module.exports.removeNotValid = tokens => {
  let new_tokens = [];
  for (let token of tokens) {
    try {
      jwt.verify(token, process.env.JWT_KEY);
      new_tokens.push(token);
    } catch {}
  }
  return new_tokens;
};
