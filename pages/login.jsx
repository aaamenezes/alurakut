import React from 'react'
import { useRouter } from 'next/router'
import nookie from 'nookies'

export default function Login() {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');

  function handleSubmit(event) {
    event.preventDefault();
    fetch('https://alurakut.vercel.app/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ githubUser })
    })
      .then(async response => {
        const responseData = await response.json()
        const token = responseData.token;
        nookie.set(null, 'USER_TOKEN', token, {
          path: '/',
          maxAge: 86400 * 7
        })
        router.push('/')
      })
  }

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">

        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />
          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!</p>
            <input
              placeholder='Usuário'
              name='nickname'
              value={githubUser}
              onChange={evento => setGithubUser(evento.target.value)}
            />
            {githubUser.length === 0 && 'Preencha o campo'}
            <button type="submit">Login</button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login"><strong>ENTRAR JÁ</strong></a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>© 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a></p>
        </footer>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookie.get(context)
  if (cookies.USER_TOKEN) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // const token = cookies.USER_TOKEN
  // const { githubUser } = jwt.decode(token)
  // return { props: { githubUser } }
  return { props: {} }
}
