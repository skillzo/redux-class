import {
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import "./App.css";
import PostList from "./features/post/PostList";

function App() {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route>
        <Route path="/" element={<PostList />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
