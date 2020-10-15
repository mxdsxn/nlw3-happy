import baseUrl from './baseUrl'

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
    orphanageList,
    orphanageShow
}