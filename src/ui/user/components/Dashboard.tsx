import {FC} from "react"
import {useMe} from "../hooks/useMe"

const Dashboard: FC = () => {
  const me = useMe().data?.me

  return <div>Hello your dashboard</div>
}

export default Dashboard
