import axios from "axios"

function App() {

  async function buyFunction() {
    let response = await axios.post("http://localhost:3000/payment");

    if(response && response.status === 200) {
      window.location.href = response.data.url;
      console.log(response.data);
    }
  }

  return (
    <div>
      <button onClick={buyFunction}>
        Click me
      </button>
    </div>
  )
}

export default App
