import { useState } from "react";
import './App.css'

function App() {
  const [belgilandi, setBelgilandi] = useState(false);
  const [bosildi, setBosish] = useState(false)
  const [mode, setMode] = useState(localStorage.getItem("theme"))
  localStorage.setItem("theme", mode)

  const [title, setTitle] = useState("")

  const [data, setData] = useState([
    {
      id: 1,
      title: "kitob o'qish",
      isDone: true
    },
    {
      id: 2,
      title: "mashq",
      isDone: false
    }
  ])

  return (
    <div className={mode == "dark" ? 'body active' : "body"}>
      <div className="container">
        <header>
          <h1>TODO LIST</h1>
        </header>
        <div className="inputs">
          <div className="inp">
            <input type="text" id='poisk' placeholder='Search note...' />
            <label htmlFor="poisk">
              <img className='poisk' src="/imgs/Vector.svg" alt="" />
            </label>
          </div>
          <div className="btns">
            <button className='all'>all <img src="/imgs/chevron-top.svg" alt="" /></button>
            <button onClick={() => {
              if (mode == "dark") {
                setMode("light")
              } else {
                setMode("dark")
              }
            }} className='darkmoon'><img className='sun' src="/imgs/sun.svg" alt="" /><img className="moon" src="/imgs/moon.svg" alt="" /></button>
          </div>
        </div>
        <main>
          <div className="rejalar">
            {
              data.map((item) => {
                return <div key={item.id} className="todo">
                  <div className={`list ${item.isDone ? "active" : ""}`}>
                    <input
                      type="checkbox"
                      checked={item.isDone}
                      onChange={() =>
                        setData(data.map(el =>
                          el.id === item.id ? { ...el, isDone: !el.isDone } : el
                        ))
                      }
                    />
                    <h3>{item.title}</h3>
                  </div>
                  <div className="tugma">
                    <img src="/imgs/Frame 6.svg" alt="" title='editing' />
                    <img src="/imgs/trash.svg" alt="" title='trash' />
                  </div>
                </div>
              })

            }
            <button onClick={() => setBosish(true)}
              className="addbtn"><img src="/imgs/plusbtnimg.svg" alt="" /></button>
          </div>
          {bosildi ? <div className={`overlay`}>
            <div className="modal">
              <h2>New Note</h2>

              <form onSubmit={(e) => {
                e.preventDefault()
                if (!title.trim()) {
                  alert("Bo'sh qiymat kiritib bo'lmaydi !!!")
                  return
                } else {
                  const obj = {
                    id: data.length + 1,
                    title: title,
                    isDone: false
                  }

                  setData([...data, obj])
                  setTitle("")
                  setBosish(false)
                }

              }} action="">
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Input your note..." />
                <div className="modalbtns">
                  <button type="button" className="canel" onClick={() => setBosish(false)}>Cancel</button>
                  <button className="apply">Apply</button>
                </div>


              </form>
            </div>
          </div> : ""}
        </main>
      </div>
    </div>
  )
}

export default App
