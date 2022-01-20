import {FC} from "react"
import {useMe} from "../hooks/useMe"
import styled from "styled-components"
const Image = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`

const MyUserAvatar: FC = () => {
  const {data} = useMe()
  if (!data?.me?.image) return null

  return <Image alt={data.me.email ?? ""} src={data.me?.image} />
}

export default MyUserAvatar
