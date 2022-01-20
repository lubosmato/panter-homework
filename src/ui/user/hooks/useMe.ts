import {gql, useQuery} from "@apollo/client"
import {Me} from "./__generated__/Me"

const ME = gql`
  query Me {
    me {
      id
      email
      image
    }
  }
`
export const useMe = () => {
  return useQuery<Me>(ME)
}
