import { Express, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

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
    const orphanagesRepository = getRepository(Orphanages)

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

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekend,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekend: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanagesRepository.create(data)

    await orphanagesRepository.save(orphanage)

    return res.status(201).json(orphanage)
  }
}
