import {useState, useEffect} from 'react';
import axios from 'axios';

export function useFetch(uri){
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=> {
        async function fetchData(){
        try {
          setError();
          setLoading(true)
          const {data}= await axios.get(uri);
          console.log(data);
          setData(data.data);
          setLoading(false);
        } catch (error) {
            setLoading(false);
          setError(error);
        }
      };
      fetchData();
      }
      , [uri]);

    return {loading, data, error};
}
