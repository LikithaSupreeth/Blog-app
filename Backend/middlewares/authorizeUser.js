const authorizeUser = (permittedId) => {
    return (req, res, next) => {
        if(permittedId.includes(req.user.id)) {
            next()
        } else {
            res.status(403).json({ error: "you don't have permission to access this route"})
        }
    }
}

module.exports = authorizeUser