import React from 'react'
import ContentLoader from 'react-content-loader'

const Card = props => {
  return (
    <ContentLoader
      viewBox="0 0 260 160"
      height={160}
      width={260}
      speed={2}
      {...props}
    >
      <rect x="10" y="5" rx="3" ry="3" width="210" height="50" />
      <rect x="10" y="70" rx="3" ry="3" width="200" height="100" />
    </ContentLoader>
  )
}

Card.metadata = {
  name: 'PhátMai', // My name
  github: 'lPaths', // Github username
  description: 'Card', // Little tagline
  filename: 'Card', // filename of your loader
}

export default Card
