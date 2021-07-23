import React, {useState} from 'react';
import styled from 'styled-components'
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

export default function Home() {
  const githubUser = 'Bruninho2104';
  const [comunidades, setComunidades] = useState([{
    id: "2144253452324",
    title: "Eu odeio acordar cedo",
    image: "https://alurakut.vercel.app/capa-comunidade-01.jpg"
  }]);
  
  const pessoasFavoritas = [
  'juunegreiros', 
  'omariosouto', 
  'peas', 
  'rafaballerini', 
  'rafafaaa', 
  'felipefialho'
];

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
                id: new Date().toISOString,
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image'),
              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((comunidade)=>{
                return(
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`} >
                      <img src={comunidade.image} />
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
