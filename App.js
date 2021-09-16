import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native'
import axios from 'axios'
import useInfiniteScroll from './src/hooks/useInfiniteScroll'
export default function App() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState([])
  const [page, setPage] = useState(1)
  const { result, fetchMore, } = useInfiniteScroll(data, page);
  const [text, setText] = useState('')

  const callApi = async () => {
    try {
      const { data } = await axios('https://api.publicapis.org/entries')
      setData(data?.entries)
    } catch (error) {
      setData([])
    }
  }

  const loadMoreData = () => {
    setPage(prev => prev + 1);
    fetchMore()
  };

  const renderItem = ({ item }) => {
    const { Auth, API, Description, Link, HTTPS, Cors, Category } = item

    return (
      <View style={styles.card}>
        <Text>{`API Source :${API}`}</Text>
        <Text>{`Description : ${Description}`}</Text>
        <View style={styles.cardFooter}>
          <View>
            <Text>Link : </Text>
          </View>
          <View>
            <Text>{Link}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View><Text>Category : </Text></View>
          <View>
            <Text>{Category}</Text>
          </View>
        </View>
        <View style={styles.cardFooter}>
          <View><Text>{`HTTPs :${HTTPS} `}</Text></View>
          <View>
            <Text>{`Cors :${Cors}`}</Text>
          </View>
        </View>
      </View>
    )
  }

  const handleSearch = (query) => {
    setText(query)
    const res = data.filter((ele) => ele.Category.toLowerCase() === query.toLowerCase())
    setSearch(res)
  }

  useEffect(() => {
    callApi()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        data={text.length > 0 ? search : result}
        key={(item, index) => index}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        ListFooterComponent={result.length > 0 ? (<Button title="Load More" onPress={loadMoreData} />) : null}
        ListHeaderComponent={<TextInput placeholder="Search By Category" placeholderTextColor="teal" onChangeText={handleSearch} style={styles.input} onSubmitEditing={handleSearch} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 20
  },
  card: {
    backgroundColor: 'white',
    height: 150,
    borderRadius: 10,
    borderColor: 'teal',
    borderWidth: 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10
  },
  cardFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  input: {
    borderRadius: 10,
    borderColor: 'teal',
    color: 'black',
    padding: 10,
    borderWidth: 1

  }
})