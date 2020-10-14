import { Express, Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Orphanages from '../models/orphanages'

export default {
  async show(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanages)

    const { id } = req.params
    const orphanage = await orphanagesRepository.findOneOrFail(id,
      {
        relations: ['images']
      })

    return res.status(200).json(orphanage.view())
  },
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanages)

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    })

    return res.status(200).json(orphanages.map(orphanage => orphanage.view()))
  },
  async create(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekend
    } = req.body

    const requestImages = req.files as Express.Multer.File[]

    const images = requestImages.map(image => {
      return { path: image.filename }
    })
    const orphanagesRepository = getRepository(Orphanages)

    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekend,
      images
    })

    await orphanagesRepository.save(orphanage)

    return res.status(201).json(orphanage)
  }
}
