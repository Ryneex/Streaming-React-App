import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { asyncloadmovie, removemovies } from '../store/actions/movieActions'
import { useParams } from 'react-router-dom'

const MovieDetail = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovies())
    }
  },[])
  return (
    <div className='text-white'>MovieDetail</div>
  )
}

export default MovieDetail