module.exports = ()=>{
    return (err, req, res, next)=>{
        res.status(401).end();
    }
}