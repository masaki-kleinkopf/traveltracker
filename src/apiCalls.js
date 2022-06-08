const getData = (api,id) => {
    if (id){
        return fetch(`http://localhost:3001/api/v1/${api}/${id}`).then(
            (response) => response.json()
        );
    } else {
        return fetch(`http://localhost:3001/api/v1/${api}`).then(
            (response) => response.json()
        );
    }
};

const postData = (apiName,data) => {
    const postDetails = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    let endpoint = `http://localhost:3001/api/v1/${apiName}`
    return fetch(endpoint, postDetails)
      .then(response => {
        if (!response.ok) {
          console.log('Sorry! Something went wrong')
        }
        return response.json()
      })
  }

  export { getData, postData };