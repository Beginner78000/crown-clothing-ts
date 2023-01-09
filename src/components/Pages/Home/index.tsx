import { Outlet } from "react-router-dom";

import Categories from "../../Categories";

function Home() {
  return (
    <div>
        <Outlet />
        <Categories />
    </div>
  );
}

export default Home;