import React, { useState } from 'react';
import '../utility/dashboard.css'; // Custom CSS for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatbot from './Chatbot';
import mueseumlogo from '../img/mueseumheader.jpeg';
// Sample data
const data = {
    "cities": [
      {
        "city": "New Delhi",
        "museums": [
          {
            "name": "National Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 300
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 500
              }
            }
          },
          {
            "name": "National Gallery of Modern Art",
            "entry_fee": {
              "children": {
                "Indian": 1,
                "Foreigner": 200
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 500
              }
            }
          }
        ]
      },
      {
        "city": "Mumbai",
        "museums": [
          {
            "name": "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
            "entry_fee": {
              "children": {
                "Indian": 20,
                "Foreigner": 300
              },
              "adult": {
                "Indian": 30,
                "Foreigner": 500
              }
            }
          },
          {
            "name": "Dr. Bhau Daji Lad Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 100
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 200
              }
            }
          }
        ]
      },
      {
        "city": "Kolkata",
        "museums": [
          {
            "name": "Indian Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 500
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 1000
              }
            }
          },
          {
            "name": "Victoria Memorial",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 200
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 500
              }
            }
          }
        ]
      },
      {
        "city": "Chennai",
        "museums": [
          {
            "name": "Government Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 150
              },
              "adult": {
                "Indian": 15,
                "Foreigner": 250
              }
            }
          },
          {
            "name": "Fort St. George Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 100
              },
              "adult": {
                "Indian": 15,
                "Foreigner": 250
              }
            }
          }
        ]
      },
      {
        "city": "Bengaluru",
        "museums": [
          {
            "name": "Visvesvaraya Industrial and Technological Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 250
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 400
              }
            }
          },
          {
            "name": "Government Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 150
              },
              "adult": {
                "Indian": 15,
                "Foreigner": 300
              }
            }
          }
        ]
      },
      {
        "city": "Hyderabad",
        "museums": [
          {
            "name": "Salar Jung Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 500
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 1000
              }
            }
          },
          {
            "name": "Telangana State Archaeology Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 200
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 500
              }
            }
          }
        ]
      },
      {
        "city": "Jaipur",
        "museums": [
          {
            "name": "Albert Hall Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 300
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 500
              }
            }
          },
          {
            "name": "City Palace Museum",
            "entry_fee": {
              "children": {
                "Indian": 15,
                "Foreigner": 350
              },
              "adult": {
                "Indian": 30,
                "Foreigner": 600
              }
            }
          }
        ]
      },
      {
        "city": "Ahmedabad",
        "museums": [
          {
            "name": "Calico Museum of Textiles",
            "entry_fee": {
              "children": {
                "Indian": 20,
                "Foreigner": 200
              },
              "adult": {
                "Indian": 40,
                "Foreigner": 400
              }
            }
          },
          {
            "name": "Sardar Vallabhbhai Patel National Memorial",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 100
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 200
              }
            }
          }
        ]
      },
      {
        "city": "Lucknow",
        "museums": [
          {
            "name": "State Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 200
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 400
              }
            }
          },
          {
            "name": "1857 Memorial Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 100
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 200
              }
            }
          }
        ]
      },
      {
        "city": "Pune",
        "museums": [
          {
            "name": "Raja Dinkar Kelkar Museum",
            "entry_fee": {
              "children": {
                "Indian": 10,
                "Foreigner": 250
              },
              "adult": {
                "Indian": 20,
                "Foreigner": 500
              }
            }
          },
          {
            "name": "Mahatma Phule Museum",
            "entry_fee": {
              "children": {
                "Indian": 5,
                "Foreigner": 100
              },
              "adult": {
                "Indian": 10,
                "Foreigner": 200
              }
            }
          }
        ]
      }
    ]
  }
  

  function Dashboard() {
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const handleCityChange = (cityName) => {
      setSelectedCity(prevCity => prevCity === cityName ? null : cityName);
    };
  
    const getAvailableMuseums = () => {
      if (!selectedCity) return [];
      const cityData = data.cities.find(city => city.city === selectedCity);
      return cityData ? cityData.museums : [];
    };
    const handleMuseumChange = (museumName) => {
        setSelectedMuseum(prevMuseum=>prevMuseum===museumName?null: museumName);
      };
    return (
      <div className="dashboard">
        <div className="header">
          <img src={mueseumlogo} alt="Logo" className="logo" />
          <h2>GalleryGateway</h2>
        </div>
        
        <div className="content">
          <div className="cards">
            {/* City Card */}
            <div className="card city-card">
              <h2>Cities</h2>
              {data.cities.map(city => (
                <div key={city.city} className="city-item">
                  <input 
                    type="radio" 
                    id={`city-${city.city}`} 
                    name="city" 
                    checked={selectedCity === city.city}
                    onChange={() => handleCityChange(city.city)}
                  />
                  <label htmlFor={`city-${city.city}`}>{city.city}</label>
                </div>
              ))}
            </div>
  
            {/* Museum Available Card */}
            <div className="card museum-card">
            <h2>Museums Available</h2>
            {selectedCity && (
              <div>
                {getAvailableMuseums().map(museum => (
                  <div key={museum.name} className="museum-item">
                    <input 
                      type="radio" 
                      id={`museum-${museum.name}`} 
                      name="museum" 
                      value={museum.name}
                      checked={selectedMuseum === museum.name}
                      onChange={() => handleMuseumChange(museum.name)}
                    />
                    <label htmlFor={`museum-${museum.name}`}>{museum.name}</label>
                  </div>
                ))}
              </div>
            )}
            {!selectedCity && <p>Please select a city to view museums.</p>}
          </div>
            {/* Chatbot Card */}
            <Chatbot selectedCity={selectedCity} selectedMuseum={selectedMuseum}/>
          </div>
        </div>
      </div>  );
}

export default Dashboard;
