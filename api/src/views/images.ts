import Images from "../models/images"

export default {
    render(image: Images) {
        return {
            id: image.id,
            url: `http://localhost:3333/uploads/${image.path}`
        }
    }
}