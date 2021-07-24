import { SiteClient } from 'datocms-client'

export default async function createPerson(request, response) {
  if (request.method === 'POST') {
    const token = '2276c2994e2b3695c7b5ec48c291c3'
    const client = new SiteClient(token)
    const createdRegister = await client.items.create({
      itemType: '990909',
      nickname: request.body.nickname
    })
    response.json({ createdRegister })
    return
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}