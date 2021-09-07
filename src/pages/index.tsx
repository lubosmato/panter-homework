import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import MyUserAvatar from "../ui/user/component/MyUserAvatar";
import { useMe } from "../ui/user/hooks/useMe";
import styled from "styled-components";
const Base = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
`;
const Home: NextPage = () => {
  const me = useMe().data?.me;

  return (
    <Base>
      {me ? (
        <div>
          <p>hello {me.email}</p>
          <MyUserAvatar />
          <button onClick={() => signOut({ redirect: false })}>Signout </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </Base>
  );
};

export default Home;
