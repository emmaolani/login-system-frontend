import Footer  from "./footer";
import Nabar from "./nav";
import MainContent from "./main";
import { useState, useEffect }from "react"


export default function Page() {
  function makeRequest () {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:80/books', true)
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }else {
          reject({
            status: this.status,
            statusText:  xhr.statusText
          })
        }
      }
      xhr.send()
    })
  }

  async function onLoad() {
    try { 
      let req = await makeRequest()
      setlibrary(prevLibrary => {
        return req
      })
      
    } catch (error) {
      console.log('something went wrong')
    }
      
  }

  const [products, setlibrary] = useState("");

  useEffect(()=>{  
    onLoad()
  },[])  

  let showcase 
  
  if (Array.isArray(products)) {
    showcase = products.map((product) => {
      return <MainContent
        key = {product._id}
        item= {product}
      />
    })  
  }
  
  return (
    <div>
      <Nabar/>
      <div className='books'>
        {showcase}
      </div>
      <button onClick={onLoad}>
        <p>latest</p>
      </button>
      <Footer/>
    </div>
  )  
}