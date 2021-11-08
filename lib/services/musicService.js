const MusicService = {
    baseUrl: "http://localhost:3001",

    doLoad(url) { // Base method for doing http Get requests
        if (!url.includes(this.baseUrl)) { url = this.baseUrl + url }

        // console.log(url)
        return fetch(url).then(response => {
            if (response.status === 404) { return '' }
            if (response.status === 200) { return response.json() }})
            .then(data => {
                // console.log(data)
                return data
            })
    },

    getArtists() {
        return this.doLoad('/artists').then(jsonData => {
            return jsonData
        }).catch(e => {
            console.log('Error retrieving artists...', e)
        })
    },

    getSongs() {
        return this.doLoad('/songs').then(jsonData => {
            return jsonData
        }).catch(e => {
            console.log('Error retrieving songs...', e)
        })
    },

    getSongsByArtistName(artistName) {
        return this.doLoad(`/songs?artist=${artistName}`).then(jsonData => {
            return jsonData
        }).catch(e => {
            console.log('Error retrieving songs...', e)
        })
    },

    getSongsByGenreName(genreName) {
        return this.doLoad(`/songs?genre=${genreName}`).then(jsonData => {
            return jsonData
        }).catch(e => {
            console.log('Error retrieving songs...', e)
        })
    },
}

export default MusicService
