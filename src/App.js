import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import TodoList from "./features/todos/TodoList"
import Users from './features/users/Users'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/todos' element={<TodoList />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
