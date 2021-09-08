import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import React from "react";
import Heading from "../ui/layout/components/Heading";
import PageLayout from "../ui/layout/components/PageLayout";
import MyUserAvatar from "../ui/user/components/MyUserAvatar";
import { useMe } from "../ui/user/hooks/useMe";

const Home: NextPage = () => {
  const me = useMe().data?.me;

  return (
    <PageLayout>
      <Heading>Hello</Heading>
      {me ? (
        <div>
          <p>hello {me.email}</p>
          <MyUserAvatar />
          <button onClick={() => signOut({ redirect: false })}>Signout </button>
        </div>
      ) : (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
    </PageLayout>
  );
};

export default Home;
