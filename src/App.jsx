import { useEffect, useState } from 'react'
import Inputbox from '../components/Inputbox'
import './App.css'
import UrlCard from '../components/UrlCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

function App() {
  const [urls, setUrls] = useState([]); // State to store the URLs
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

  useEffect(() => {
    const urls = localStorage.getItem("urls");
    if (urls) {
      setUrls(JSON.parse(urls));
    }
  } 
  , []);

  const addUrl = async (url) => {
    setErrorMessage("");
    console.log("API token: ", import.meta.env.VITE_API_TOKEN);
    try {
      const result = await axios.post(
        'https://api.tinyurl.com/create',
        {
          url: url.address,
          domain: "tinyurl.com",
          description: "string"
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`, // Ensure you're using the right environment variable
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Response from API: ", result);
      url.address = result.data.data.tiny_url; // Adjust based on the actual response structure
      console.log("URL added successfully: ", url);
  
      setUrls((prev) => [...prev, url]);
      saveUrls([...urls, url]);
    } catch (error) {
      console.log("Error while adding URL: ", error);
      setErrorMessage("Invalid URL. Please try again");
    }
  };
  

  const saveUrls = (urls) => {
    localStorage.setItem("urls", JSON.stringify(urls));
  }

  const handleUrlClick = (url) => {
    setUrls((prev) => {
      return prev.map((item) => {
        if (item.address === url) {
          return {
            ...item,
            timesVisited: item.timesVisited + 1,
          };
        }
        return item;
      });
    });
    saveUrls(urls.map((item) => {
      if (item.address === url) {
        return {
          ...item,
          timesVisited: item.timesVisited + 1,
        };
      }
      return item;
    }));
  }

  const handleUrlDelete = (url) => {
    setUrls((prev) => {
      return prev.filter((item) => item.address !== url);
    });
    saveUrls(urls.filter((item) => item.address !== url));
  }

  return (
    <>
      <Header />
      <div className="App">
        <Inputbox addUrl={addUrl} errorMessage={errorMessage}/>
      </div>

      <div id="cardContainer">
        {urls.map((url, index) => {
          return (
            <UrlCard 
              key={index} 
              url={url.address} 
              name={url.name} 
              visited={url.timesVisited} 
              handleUrlClick={handleUrlClick} 
              handleUrlDelete={handleUrlDelete}
            />
          );
        })}
      </div>
      <Footer />  
    </>
  )
}

export default App