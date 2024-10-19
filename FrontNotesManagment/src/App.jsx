import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import SingleNote from "./Pages/SingleNote"
import PrivateRoutes from "./utils/PrivateRoutes"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/singleNote" element={<SingleNote />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* For 404 page */}
        <Route path="*" element={() => <h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App