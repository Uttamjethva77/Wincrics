

// console.log(process.env.JWT);
function authenticateTokenn(req, res, next) {
  const token = req.headers['userauth'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

    if (token=="eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ"){
        next();
    }
    
  ;
}

module.exports = { authenticateTokenn };
