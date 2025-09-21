import axios from 'axios';
import { memo, useEffect, useState } from 'react';

const Home = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLaoding] = useState(true)

    useEffect(()=>{
        axios
            .get("https://dummyjson.com/products")
            .then(res => setData(res.data))
            .catch()
            .finally(()=> setLaoding(false))
    }, [])

  return (
    <div className="Home">
        {loading && <h1>Laoding...</h1>}
        {
            <div>
                {data?.products?.map((item:any) => (
                    <div key={item.id}>
                        <h3>{item.title}</h3>
                        <hr />
                    </div>
                ))}
            </div>
        }
    </div>
  );
};

export default memo(Home);