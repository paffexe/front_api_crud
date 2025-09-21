import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";

const About = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["recipe"],
    queryFn: () =>
      axios.get("https://dummyjson.com/recipes").then((res) => res.data),
  });

  return (
    <div className="About">
      {isLoading && <h1>Laoding...</h1>}
      <div>
        {data?.recipes?.map((item: any) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(About);
