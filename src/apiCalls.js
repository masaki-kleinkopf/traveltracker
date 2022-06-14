import { submitErrorMessage, submitSuccessfulMessage } from "../src/scripts.js"
const getData = (api, id) => {
    if (id){
        return fetch(`http://localhost:3001/api/v1/${api}/${id}`).then(
            (response) => response.json()
            .catch(err => console.log(err))
        );
    } else {
        return fetch(`http://localhost:3001/api/v1/${api}`).then(
            (response) => response.json()
            .catch(err => console.log(err))
        );
    }
};

const postData = (apiName,data) => {
    const postDetails = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    let endpoint = `http://localhost:3001/api/v1/${apiName}`
    return fetch(endpoint, postDetails)
      .then(response => {
        if (!response.ok) {
          console.log('Sorry! Something went wrong');
          submitErrorMessage.classList.remove('hidden');
        } else {
          submitSuccessfulMessage.classList.remove('hidden');
          submitErrorMessage.classList.add('hidden')
        }
      })
      .catch(err => console.log(err))
  }

  export { getData, postData };