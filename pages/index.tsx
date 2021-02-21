import Link from 'next/link'
import Layout from '../components/Layout'

import tw from "tailwind-styled-components"

const StyledH1 = tw.h1`
  text-3xl
  bg-red-400
`

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <StyledH1>Hello Next.js 👋</StyledH1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
