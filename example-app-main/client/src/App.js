// Import required libraries and CSS file
import './App.css';
import { useEffect, useState } from 'react';

// Define the App functional component
function App() {
  // Create a state variable 'albums' with an initial value of an empty array
  const [albums, setAlbums] = useState([]);

  // useEffect hook for fetching data when the component mounts
  useEffect(() => {
    // Fetch data from the '/api/albums' endpoint
    fetch('/api/albums')
      // Convert the response to JSON
      .then((r) => r.json())
      // Update the 'albums' state variable with the fetched data
      .then((data) => setAlbums(data));
  }, []); // Empty dependency array ensures the effect runs only once


  // To use async/await instead of .then()...
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/albums');
      const data = await response.json();
      setAlbums(data);
    };
    fetchData();
  }, []);

  // The difference between the two is that the async/await version is more readable
  // and easier to debug. The .then() version is more concise and is a good choice
  // if you are not familiar with async/await.

  // Render the component
  return (
    <div className='app'>
      <div className='container'>
        // Check if the 'albums' array has data
        {albums.length > 0 && (
          <>
            <h2>Albums</h2>
            // Render the table
            <table>
              // Render table headers based on the keys of the first album object
              <thead>
                <tr>
                  {Object.keys(albums[0]).map((x, i) => (
                    <th key={x + i}>{x}</th>
                  ))}
                </tr>
              </thead>
              // Render table rows for each album in the 'albums' array
              <tbody>
                {albums.map((alb, i) => (
                  <tr key={'album_row' + i}>
                    // Render table data cells for each property of the current album
                    {Object.values(alb).map((x, j) => (
                      <td key={x + i + j}>{x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <code>{JSON.stringify(albums, null, 2)} </code>
            {/*
                    The first argument to JSON.stringify is the object to stringify.
                    The second argument is null and this will remove any white space.
                    The third argument is 2 and this will add two spaces to the beginning of each line.
                   */}
          </>
        )}
      </div>
    </div>
  );
}

// Export the App component
export default App;
