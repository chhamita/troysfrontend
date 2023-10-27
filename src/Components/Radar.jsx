import React from 'react';

function Radar(props) {
  const currentWeather = props.currentWeather;
  
  return (
    <div className='wrapper'>
      <div className='container'>
        <div className='card border-0 shadow'>
          <div className='card-body'>       
            <div className="radarMap">
              {currentWeather ? (
                
                <div className="radarMapContent">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="temp-box">    
                        <div className="row align-items-center">
                          <div className="col-md-12 text-center">          
                            <div className="conditions-circle-wrap">
                              <div className="conditions-circle">
                                <div className="condition-data">
                                  <div className="hi-lo">

                                    <span className="hi">{currentWeather.current.feelslike_f}<sup>°F</sup></span>
                                    <span className="separator"> | </span>
                                    <span className="lo">{currentWeather.current.temp_f}<sup>°F</sup></span>
                                  </div>
                                  <div className="current-temp">
                                    <span className="temp">{currentWeather.current.temp_f}<sup>°F</sup> </span>
                                  </div>
                                  <div className="feels-like">  
                                    like <span className="temp temp-like">{currentWeather.current.feelslike_f}<sup>°F</sup> </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">  
                            <div className="radarMapInfo">
                              <div className="text-center">

                                {currentWeather.current.condition && (
                                  <img src={currentWeather.current.condition.icon} width={100} alt="Weather Icon" />
                                )}
                                {currentWeather.current.condition && (
                                    <h5>{currentWeather.current.condition.text}</h5>
                                )}

                              </div>
                              <div className="wind-speed">
                                <p className='h4 text-center'>WindSpeed : {currentWeather.current.wind_mph}</p>
                              </div> 
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <iframe
                        className="radarMapIframe w-100"
                        src={`https://www.rainviewer.com/map.html?loc=${currentWeather.location.lat},${currentWeather.location.lon},5&oFa=0&oC=0&oU=0&oCS=1&oF=0&oAP=0&c=3&o=83&lm=1&layer=radar&sm=1&sn=1&hu=false`}
                        width="100%"
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              ) : (
                <p>No radar data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Radar;
