import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'

import Orphanages from './orphanages'
import imagesView from "../views/images"

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    path: string

    @ManyToOne(() => Orphanages, orphanage => orphanage.images)
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanages

    view = () => imagesView.render(this)
}