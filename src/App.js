import { Route, Routes } from "react-router-dom";
import "./App.css";
import PostList from "./features/post/PostList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
    </Routes>
  );
}

export default App;
