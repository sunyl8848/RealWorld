const crypo = require('crypto');

module.exports = (str)=>{
    return crypo.createHash('md5').update(str).digest('hex');
}