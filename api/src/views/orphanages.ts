import Orphanages from "../models/orphanages"
import imagesView from "../views/images"

export default {
    render(orphanage: Orphanages) {
        return {
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekend: orphanage.open_on_weekend,
            images: orphanage.images.map(image => image.view())
        }
    }
}