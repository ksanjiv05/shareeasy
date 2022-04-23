import axios from 'axios';

export const createPaste = async(body) => {
  try {
    const responce =await  axios.post('http://134.255.216.211:3001/api/paste', body)
    return responce;
} catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
};

export const createFile = async formData => {
  try {

    const options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(formData);

    const responce = await fetch('http://134.255.216.211:3001/api/file', options)
    
    return responce;
  } catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
};

export const createShorterLink = async(body) => {
  try {
    const responce =await  axios.post('http://134.255.216.211:3001/api/url', body)
    return responce;
  } catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
};


export const checkFile=async(url)=>{
  try {
    const responce =await  axios.get(url)
    return responce;
  } catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
}

export const tryDrycription=async(data)=>{
  try {
    const responce =await  axios.post("http://134.255.216.211:3001/api/checkPassword",data)
    return responce;
  } catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
}

export const getPaste=async(data)=>{
  try {
    const responce =await  axios.post("http://134.255.216.211:3001/api/getpaste",data)
    return responce;
  } catch (error) {
    console.log('unable to create paste', error);
    return null;
  }
}