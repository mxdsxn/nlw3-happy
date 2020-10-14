import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm'

import Images from './images'
import orphanageView from '../views/orphanages'

@Entity('orphanages')
export default class Orphanages {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    name: string
    @Column()
    latitude: number
    @Column()
    longitude: number
    @Column()
    about: string
    @Column()
    instructions: string
    @Column()
    opening_hours: string
    @Column()
    open_on_weekend: boolean

    @OneToMany(() => Images, image => image.orphanage, {
        cascade: ['insert', "update"]
    })
    @JoinColumn({ name: 'orphanage_id' })
    images: Images[]

    view = () => orphanageView.render(this)
}