import React, { ReactNode } from 'react'

import tw from 'tailwind-styled-components';
import styled from 'styled-components';

import Header from './Header';

type Props = {
  children?: ReactNode
  title?: string
}



const StyledContainer = styled.div`
  min-height: calc(100vh - 85px);
  height: 100%;
`
const StyledContainerTW = tw(StyledContainer)`
  container
  h-full
  mx-auto
  bg-white
  bg-opacity-50
  p-12
  pt-44
`;

const StyledFooter = tw.footer`
  absolute
  bottom-0
  p-1
  justify-center
  w-full
  bg-yellow-100
  text-center
  text-sm
`

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Header title={title}/>
    <StyledContainerTW>
      {children}
    </StyledContainerTW>
    <StyledFooter>
      <span><a href="https://github.com/wahidmagdy/hanakol-eh">Made with  ❤️  from  🇪🇬</a></span>
    </StyledFooter>
  </div>
)

export default Layout
