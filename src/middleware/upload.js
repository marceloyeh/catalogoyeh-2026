const multer = require('multer');
const upload = multer({ dest: 'temp_uploads/' }); // pasta temporária
module.exports = upload;