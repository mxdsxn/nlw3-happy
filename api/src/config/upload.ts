import multer from 'multer'
import path from 'path'

export default {
    storage: multer.diskStorage({
        destination: path.join(__dirname, '..', '..', 'uploads'),
        filename: (request, file, callback) => {
            const fileName = `${file.fieldname}-${Date.now()}-${Math.random() * 100000}${path.extname(file.originalname)}`

            callback(null, fileName)
        }
    })
}