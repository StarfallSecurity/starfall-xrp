import axios from "axios";


export async function getNFTs() {
  try{
    const response = await axios.get('/api/users');
    console.log('response  ', response)
    return response.data;
  }catch(error) {
    return [];
  }

}