import styled from 'styled-components';

function Logo() {
  return (
    <StyledLogo>
      Whispr
    </StyledLogo>
  )
}

export default Logo;

export const StyledLogo = styled.div`
color: white;
text-align: center;
font-size: 3rem;
margin-top: 1rem;
font-family: 'Raleway', sans-serif;
font-weight: bold;
`
