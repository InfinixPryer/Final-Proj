import React, { useEffect, useState } from "react";
import Footer from "../footer";
import h1 from "../h1.jpg";
const HomePage = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    setData("p");
    return () => {};
  }, []);

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-96">
        <img src={h1} alt="" />
      </div>
      <p>
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat."
      </p>
      <Footer />
    </>
  );
};

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div>
        <span className="flex w-24 m-auto justify-around relative">
          <span className="p-2 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
          <span className="p-2 rounded-full absolute  animate-bounce  bg-gray-400"></span>
          <span className="p-2 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
