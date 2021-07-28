import {SiteClient} from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if(request.method === 'POST' ){
    const TOKEN = '3d26f32285ad756ba10a5fbc2bae73';
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({
      itemType: "1008908", //ID do model de "Community" criado no Dato.
      ...request.body,
    });
    
    response.json({
      registroCriado: registroCriado,
    });

    return;
  }

  response.status(404).json({
    message: 'Ainda não temos nada no GET, mas sim no POST'
  });
}