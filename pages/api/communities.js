import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {
  if (request.method === 'POST') {
    const token = '2276c2994e2b3695c7b5ec48c291c3'
    const client = new SiteClient(token)
    const createdRegister = await client.items.create({
      itemType: '968624',
      ...request.body
      // title: 'Comunidade de teste',
      // imageUrl: 'http://github.com/aaamenezes.png',
      // creatorSlug: 'aaamenezes'
    })
    response.json({
      data: 'fijcijdijd',
      createdRegister: createdRegister
    })

    return
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas no POST tem!'
  })
}