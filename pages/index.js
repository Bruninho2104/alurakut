import React, {useState, useEffect} from 'react';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from "../src/lib/AlurakutCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideabar(props) {
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">Seguidores ({props.items.length})</h2>
        {/* <ul>
          {seguidores.map((seguidor)=>{
            return(
              <li key={seguidor.id}>
                <a href={`/followers/${seguidor.title}`} >
                  <img src={seguidor.image} />
                  <span>{seguidor.title}</span>
                </a>
              </li>
            );
          })}
        </ul> */}
      </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'Bruninho2104';
  const [comunidades, setComunidades] = useState([]);
  
  const pessoasFavoritas = [
  'juunegreiros', 
  'omariosouto', 
  'peas', 
  'rafaballerini', 
  'rafafaaa', 
  'felipefialho'
];
const [seguidores, setSeguidores] = useState([]);

useEffect(()=>{
  //pegar a API de dados do github
  fetch('https:api.github.com/users/peas/followers')
  .then((respostaDoServidor)=>{
    return respostaDoServidor.json();
  })
  .then((respostaCompleta)=>{
    setSeguidores(respostaCompleta);
  })
  // API GraphQL
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '5ee78244ffdea58479cf7bb7ca6a37',
      'Content-type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({'query': `query {
      allCommunities {
        title
        id
        imageUrl
        creatorSlug
      }
    }`
  })
  })
  .then((response) => response.json())
  .then((respostaCompleta) => {
    const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
    setComunidades(comunidadesVindasDoDato)
  })
}, [])

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideabar githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(event) =>{
              event.preventDefault();
              const dadosDoForm = new FormData(event.target);

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: githubUser,
              }

              fetch('api/communities', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                const comunidade = dados.registroCriado;
                const comunidadesAtualizadas = [...comunidades, comunidade];
                setComunidades(comunidadesAtualizadas);
              });
            
            }}>
              <div>
                <input 
                  placeholder="Qual vai ser o nome da sua comunidade?" 
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input 
                  placeholder="Coloque uma URL para usarmos de capa." 
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>

              <button>
                Criar comunidade
              </button>

            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>

          <ProfileRelationsBox title="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((comunidade)=>{
                return(
                  <li key={comunidade.id}>
                    <a href={`/communities/${comunidade.id}`} >
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((pessoaAtual, indice)=>{
                return(
                  <li key={indice}>
                    <a href={`/users/${pessoaAtual}`} >
                      <img src={`https://github.com/${pessoaAtual}.png`} />
                      <span>{pessoaAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

        </div>
      </MainGrid>
    </>
  )
}
