export default function filterSongs(songs, filterValue) {
  return songs?.filter(song => {
    return Object.values({...song, spotifyId: ''}).some(value => {
      return value?.toString().toLowerCase().includes(filterValue.toLowerCase())
    })
  })
}
