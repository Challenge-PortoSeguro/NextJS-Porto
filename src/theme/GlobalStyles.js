import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: #fff;
    font-family: 'Noto Sans', sans-serif;
  }

  ul, ol {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  body {
    background-color: #000;
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100vh;

    @media screen and (max-width: 720px) {
      overflow-y: auto;
    }
  }

  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyles