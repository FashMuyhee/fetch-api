import { useState, useEffect } from 'react'

const useInfiniteScroll = (data = [], page = 1) => {
  const [slicedData, setSlicedData] = useState([])
  const [loading, setLoading] = useState(false)

  const PAGE_NUMBER = 20 * page

  const sliceItemsArray = () => {
    setLoading(true)
    const sliced = data.slice(0, PAGE_NUMBER).map((item) => {
      return item
    })
    setSlicedData(sliced)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  useEffect(() => {
    sliceItemsArray()
  }, [page, data])

  return { result: slicedData, fetchMore: sliceItemsArray, loading }
}

export default useInfiniteScroll
