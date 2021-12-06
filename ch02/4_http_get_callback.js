const httpGet = (path = '/', callback) => {
  const response = {
    status: 200,
    payload: {
      id: 420,
      firstName: 'Gerardo',
      lastName: 'larios'
    }
  }

  if (response.status >= 400) {
    callback(response, new Error('Something went wrong'));
  }

  callback(response);
}

const render = (json, error) => {
  if (error) {
    console.error('error\n', error);
  }

  console.log('RENDER', json?.payload);
}

httpGet('/user/420', render);
