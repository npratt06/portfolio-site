import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MyPages } from './components/Navigation/NavDisplay/NavDisplay.interface';
import Home from './pages/Home';

function App() {
  let pages: JSX.Element[] = [];
  MyPages.pages.forEach(page => {
    pages.push(<Route key={page.key} path={page.linkPath} element={page.component} />);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {pages}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
