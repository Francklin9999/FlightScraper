import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { PORT_BACKEND } from '../../../const';
import '../styles/Search.css';

function Search() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const url = new URL('http://localhost:3000/api');
        const params = {                 
            "origin": "YUL",
            "destination": "JFK",
            "departure": ["18", "12", "2024"],
            "return": ["10", "01", "2025"],
            "adults": 1,
            "class": "economy",
            "headless": true,
        };

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url)
        .then(async response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body
            .pipeThrough(new TextDecoderStream())
            .getReader();
            
            while(true) {
                const {done, value} = await reader.read();
                setLoading(false);
                if(done) break;
                const _value = JSON.parse(value);
                console.log(_value["price"]);
                setData(prevData => [...prevData, _value]);
            };

        })
        .catch(error => {
            setError(error);
        });
    }, []);
    
    if(loading) {
        return (
            <div className="search-loading-screen">
                <p>Loading...</p>
                <div className="🤚">
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="👉"></div>
                    <div className="🌴"></div>		
                    <div className="👍"></div>
                </div>
            </div>
        );
    };

    if(error) {
        return (
            <div>Error</div>
        );
    };

    return (
        <>
            <div className="search-content">
                {data.map((item, index) => (
                    <div className="container search-result" key={index}>
                        <div className="row search-site">
                            <p className="search-params-text">Site: {item['site']}</p>
                        </div>
                        <div className="row search-params">
                            <p>Price: {item['price']}</p><p>Adult: {item['adultNumber']}</p><p>Class: {item['class']}</p>
                        </div>
                        <div className="row search-link">
                            <a href={item["url"]} target="_blank" rel="noopener noreferrer">Website Link</a>
                        </div>
                    </div>
                ))}
            </div>
        </>
      );
};

export default Search;