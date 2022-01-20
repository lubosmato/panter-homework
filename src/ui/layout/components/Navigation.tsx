import {FunctionComponent} from "react"
import styled from "styled-components"
import MyUserAvatar from "../../user/components/MyUserAvatar"

const Nav = styled.nav`
  margin: 1rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.span`
  font-size: min(7vw, 3rem);
`

const Navigation: FunctionComponent = ({children}) =>
  <Nav>
    <Logo className="navbar-brand">Good ol&apos; Todo App</Logo>
    <MyUserAvatar />
  </Nav>

export default Navigation
