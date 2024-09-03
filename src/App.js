import React from 'react';
import './index.scss';
import { Collection } from './Collection';


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]


function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchvalue, setSearchValue] = React.useState('');
  const [category, setCategory] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(
    () => {
      setIsLoading(true);
      fetch(`https://66d00e89181d059277dd0cbc.mockapi.io/Pho${category ? `?category=${category}` : ''}`)
        .then((res) => res.json())
        .then((json) => setCollections(json))
        .catch((err)=>{
          console.warn(err);
          alert("Error while retrieving data")
        })
        .finally(() => setIsLoading(false))
    }, [category]
  )

  return (
    <>
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map(
              (_category, index) => 
                (<li className={index===category ? 'active' : ''}
                  onClick={() => setCategory(index)}
                  key={index}>
                  {_category.name}
                </li>)
            )
          }
        </ul>
        <input className="search-input" 
        placeholder="Поиск по названию" 
        value={searchvalue}
        onChange={(e) => setSearchValue(e.target.value)}/>
      </div>
      <div className="content">
        { isLoading ? (<h2>Collections are loading...</h2>) :
          (collections.filter((item) => 
            ( 
              item.name.toLowerCase().includes(searchvalue.toLowerCase())))
          .map((obj, index) =>
          (<Collection
            key={index}
            name={obj.name}
            images={obj.photos}
            />)
          ))
          
        }
        
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
    {/* <div className='overlay'/> */}
      
    </>
  );
}

export default App;
