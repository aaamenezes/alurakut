import { SiteClient } from 'datocms-client'

export default async function removeRegister(request, response) {
  if (request.method === 'POST') {
    const token = '2276c2994e2b3695c7b5ec48c291c3'
    const client = new SiteClient(token)
    const itemID = request.headers.itemid
    await client.items.destroy(itemID)
      .then(res => response.json({ res }))
      .catch(error => console.error(error))
    return
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}