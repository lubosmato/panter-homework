import {FC} from "react"
import styled from "styled-components"
import {signIn} from "next-auth/react"

const Form = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const FormCard = styled.div`
  max-width: 500px;
`

const LoginButton = styled.button`
  width: 100%;
  margin-bottom: 1rem;
`

const LoginForm: FC = () => {
  return <Form>
    <FormCard className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Sign in</h5>
      </div>
      <div className="card-body pt-0">

        <LoginButton style={{background: "#4c8bf5"}} className="btn btn-primary" onClick={() => signIn("google")}>Sign in with Google</LoginButton>
        <LoginButton style={{background: "#333"}} className="btn btn-secondary" onClick={() => signIn("github")}>Sign in with GitHub</LoginButton>
      </div>
    </FormCard>
  </Form>
}

export default LoginForm
