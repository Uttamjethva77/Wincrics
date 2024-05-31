import { Box } from '@mui/material'
import React from 'react'
import Userpackages from './Packages'
import Blog from './Blog'
import Videos from './Videos'
import Winningsuser from './Winnings'


const Mainhome = () => {
  return (
    <Box >

        <Userpackages></Userpackages>
        <Blog></Blog>
        <Videos></Videos>
        <Winningsuser></Winningsuser>
    </Box>
  )
}

export default Mainhome