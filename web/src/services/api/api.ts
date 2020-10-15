import baseUrl from './baseUrl'

const orphanageCreate = async (data: FormData) => {
    try {
        return await (await baseUrl.post('orphanages', data))
    } catch (error) {
        console.error(error)
    }
}

const orphanageList = async () => {
    try {
        return await (await baseUrl.get('orphanages')).data
    } catch (error) {
        console.error(error)
    }
}

const orphanageShow = async (id: number) => {
    try {
        return await (await baseUrl.get(`orphanages/${id}`)).data
    } catch (error) {
        console.error(error)
    }
}

export default {
    orphanageCreate,
    orphanageList,
    orphanageShow
}