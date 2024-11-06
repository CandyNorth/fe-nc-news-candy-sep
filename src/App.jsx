import ArticleList from "./Components/ArticleList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>NC News</h1>
      </header>
      <main>
        <ArticleList />
      </main>
    </div>
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
