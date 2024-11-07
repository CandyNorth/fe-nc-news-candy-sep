import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "./Components/ArticleList";
import SingleArticle from "./Components/SingleArticle";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>NC News</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:article_id" element={<SingleArticle />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;

//Jays suggestions:
//https://be-nc-news-candy-sep.onrender.com/api/articles

//make an article list component
//make an api call to get the articles - axios foolow the docs nc nogtes
// render each article in a list of article card components
//render the article list in the app

//useState, axios and useEffect
