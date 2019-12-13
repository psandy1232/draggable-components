import React, { useState } from 'react';
import './App.css';
import Main from './Main';

const toolBoxData = [
  { id: 1, name: 'input', textToShow: 'Text Input' },
  { id: 2, name: 'dropdown', textToShow: 'Drop Down' },
  { id: 3, name: 'radio', textToShow: 'Radio Button' }
]

function App() {
  const [selTool, setSelTool] = useState(null)
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  }
  const onDragOver = (ev) => {
    ev.preventDefault();
  }
  const onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    if (id)
      setSelTool(id)
  }
  return (
    <div className="App">
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-8">
            <div className="mt-3" style={{ height: '100%' }}>
              <div style={{ height: '100%' }}>
                <div className="jumbotron bg-default" onDragOver={(e) => onDragOver(e)}
                  onDrop={(e) => { onDrop(e, "wip") }} style={{ border: '1px solid rgb(204, 204, 204)', minHeight: '80vh' }} >
                  {!selTool ?
                    <h3 className="list-group-item bg-light text-center text-muted">Select / Drop an item from Toolbox</h3>
                    :
                    <div>
                      Render Based on the tool which user selected <br />
                      {selTool == 1 &&
                        <input
                          type="text"
                          name="name"
                          value=""
                          placeholder="Enter your name"
                        />
                      }
                      {selTool == 2 &&
                        <select >
                          <option>Select</option>
                          <option>Testing 1</option>
                          <option>Testing 2</option>
                        </select>
                      }
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <ul className="list-group">

              {toolBoxData.map((items, i) =>
                <li
                  className="list-group-item mb-1"
                  onDragStart={(e) => onDragStart(e, items.id)}
                  draggable="true"
                  style={{ cursor: 'pointer', opacity: 1, backgroundColor: 'white' }}
                >
                  {items.textToShow}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {/* <Main /> */}
    </div>
  );
}

export default App;
