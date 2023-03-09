import { useState, useRef } from "react";


const Api_Key = "e360ee07b5b24549a76224d2e9ebbe13"
const App = () => {

  const [data, setData] = useState(null)
  const [showWeather, setShowWeather] = useState(null)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null)

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];


  const weather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_Key}`;
    setLoading(true)
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(null);

        if(data.cod == 400 || data.cod == 404) {
          setShowWeather([
            {
              type: "Not Found",
              img: "https://cdn-icons-png.flaticon.com/512/4275/4275497.png"
            },
          ])
        }
        setShowWeather(
          WeatherTypes.filter((weather) => weather.type === data.weather[0].main)
        )
        console.log(data)
        setData(data)
        setLoading(false)


      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

  }

  return (


    <div className="bg-gray-800 h-screen grid place-items-center">

      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-x1 border-b 
             p-1 border-gray-200 font-semibold uppercase outline-none" />
          <button onClick={weather}>
            <img src="https://cdn-icons-png.flaticon.com/512/758/758651.png" alt="..." className="w-8" />
          </button>
        </div>
        <div className={`duration-300 delay-75 overflow-hidden 
        ${showWeather ? "h -[27rem]" : "h-0"}`}>
          {loading ?
            (<div className="grid place-items-center h-full">
              <img src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png"
                alt="..."
                className="w-14 mx-auto mb-2 animate-spin" />
            </div>) :

            (
              showWeather && (
                <div className="text-center flex flex-col gap-6 mt-10">
                  {
                    data && (
                      <p className="text-x1 font-semibold">
                        {data?.name + "," + data?.sys.country}
                      </p>

                    )}

                  <img src={showWeather[0]?.img} alt="..." className="w-52 mx-auto" />
                  <h3 className="text-2xl font-bold text-zinc-800">
                    {showWeather[0]?.type}
                  </h3>
                  {data && (
                    <>
                      <div className="flex justify-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                          alt="..."
                          className="h-9 mt-1"
                        />
                        <h3 className="text-4xl font-extrabold">{data?.main?.temp}&#176;c
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              )
            )}
        </div>
      </div>
    </div>

  )
}

export default App;
