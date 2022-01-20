import type {NextPage} from "next"
import React from "react"
import PageLayout from "../ui/layout/components/PageLayout"
import Dashboard from "../ui/user/components/Dashboard"
import LoginForm from "../ui/user/components/LoginForm"
import {useMe} from "../ui/user/hooks/useMe"

const Home: NextPage = () => {
  const {data, loading} = useMe()
  const me = data?.me

  return (
    <PageLayout>
      {loading ? (
        <div>Loading...</div> // TODO maybe add a placeholder? or figure out what is the proper way of doing this
      ) : me ? (
        <Dashboard />
      ) : (
        <LoginForm />
      )}
    </PageLayout>

  )
}

export default Home
