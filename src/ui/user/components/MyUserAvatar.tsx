import {useRef, FC, useState} from "react"
import {useMe} from "../hooks/useMe"
import styled from "styled-components"
import {signOut} from "next-auth/react"

const Avatar = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin-bottom: 0.5rem;
`

const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MyUserAvatar: FC = () => {
  const {data} = useMe()
  if (!data?.me?.image) return null

  return <AvatarWrapper>
    <Avatar alt={data.me.email ?? ""} src={data.me?.image} />
    <span>Hi {data.me.name}!</span>
    <button className="btn btn-sm btn-outline-primary" onClick={() => signOut({redirect: false})}>Logout</button>
  </AvatarWrapper>
}

export default MyUserAvatar
