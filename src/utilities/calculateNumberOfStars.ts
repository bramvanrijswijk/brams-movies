import _ from 'lodash'

const calculateNumberOfStars = (rating: number) => {
  return _.round(rating / 2, 0)
}

export default calculateNumberOfStars
