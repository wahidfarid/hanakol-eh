import React from 'react';
import Head from 'next/head';
import tw from 'tailwind-styled-components';

type Props = {
    title?: string
}

const StyledHeader = tw.header`
  p-6
  bg-gradient-to-b
  from-yellow-300
  to-yellow-400
  flex
  justify-center
  absolute
  top-0
  w-full
`;
const StyledArabicTitleTW = tw.h1`
  text-5xl
  text-bold
  mx-6
  border-dashed
  border-4
  border-red-500
  p-2
`;
const Header = ({title} : Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <StyledHeader>
      {/* <StyledTitle>Hanakol eh</StyledTitle> */}
      <StyledArabicTitleTW
      style={
        {
          fontFamily: "'amiri' !important",
          fonWeight: "700 !important"
        }
      }>
        هناكل إيه
      </StyledArabicTitleTW>      
    </StyledHeader>
  </>
)

export default Header
