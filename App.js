import React, { useState } from 'react';
import './App.css';
import Main from './Main';

const toolBoxData = [
  { id: 1, name: 'input', textToShow: 'Text Input' },
  { id: 2, name: 'dropdown', textToShow: 'Drop Down' },
  { id: 3, name: 'radio', textToShow: 'Multiple Choice' },
  { id: 4, name: 'Date', textToShow: 'Date' },
  { id: 5, name: 'heading', textToShow: 'Heading Text' },
  { id: 6, name: 'subheading', textToShow: 'Sub Heading Text' },
  { id: 7, name: 'checkbox', textToShow: 'Check Boxes' },
  { id: 8, name: 'textarea', textToShow: 'Multiline Input' }
];

const initialFormFieldData = {
  'input': {
    'fieldtype':'input',
    'placeHolderLabel': 'Choose Label Name',
    'placeHolderText': 'Enter Your Name',
    'id': 'userid',
    'name': 'username',
    'required': true,
    'defaultValue': 'testing',
    'sortorder' : 0
  },
  'dropdown': {
    'fieldtype':'dropdown',
    'placeHolderLabel': 'Placeholder Label',
    'placeHolderText': 'Enter Your Name',
    'id': 'userid',
    'name': 'username',
    'required': false,
    'defaultValue': '',
    'sortorder' : 0
  }
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [popupShow, setTogglePopup] = useState(false);
  const [popupData, setPopupData] = useState();
  const [activeTaskIndex,setActiveTaskIndex] = useState(null);

  const onDragStart = (ev, name) => {
    ev.dataTransfer.setData("name", name);
  }
  const onDragStartItem = (e,sortorder) => {
    e.dataTransfer.setData("text/html", e.parentNode)
    
  }

  const onDragOver = (ev) => {
    ev.preventDefault();    
  }
  const onDrop = (ev) => {
    let fieldtype = ev.dataTransfer.getData("name");    
    if (fieldtype) {
      let data = initialFormFieldData[fieldtype];
      data.sortorder = tasks.length;
      setTasks([...tasks,
        data
      ]);
    }
  }
  const updatePopupData = (key=null,val=null) => {
    setPopupData({
      ...popupData,
      [key]:val
    })
    //setPopupData(tasks[index]);
  }
  const editFieldData = (index) => {
    setActiveTaskIndex(index);
    setPopupData(tasks[index]);
    setTogglePopup(true)
  }
  const closePopup = () => {
    setActiveTaskIndex(null);
    setPopupData(null);
    setTogglePopup(false);
  }
  const reaplceFormDataWithPopupData = () => {
    let replaceData = tasks;
    replaceData[activeTaskIndex] = popupData;
    setTasks(replaceData)
    setTogglePopup(false)
  }
  const deleteFieldData = (i) => {
    let data = tasks;
    data.splice(i,1);
    setTasks(data);
  }
  console.log(tasks,"tas")
  return (
    <div className="App">
      <div className="container">
        <div className="innercontainer">


          <div className="drop-fluid">
            <div className="drop-inner">


              <div className="drop-area"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => { onDrop(e) }}
              >

                {tasks.length == 0 ?
                  <h3
                    className="notoolboxes">
                    Select / Drop an item from Toolbox
                    </h3>
                  :
                  <div>
                    {tasks.map((task, index) =>
                      <div key={index}
                        className="tools-dropped-area"
                      >
                        
                          <div 
                            className="tools-dropped-item"
                            onDragStart={(e) => onDragStartItem(e,1)}
                            onDragOver={(e) => onDragOver(e)}
                            //onDrop={(e) => { onDrop(e) }}
                            draggable="true"
                          >

                            <div className="tool-label">
                              <label>
                              {task.required && <span className="required">*</span> }
                                {task.placeHolderLabel}
                              </label>                              
                              <ul className="tool-actions">
                                <li onClick={() => {editFieldData(index)}}>Edit</li>
                                <li onClick={() => {deleteFieldData(index)}}>Delete</li>
                              </ul>
                            </div>
                              
                            {task.fieldtype == 'input' &&
                              <input className="text-input"  type="text" 
                                name={task.name} 
                                id={task.id} 
                                placeholder={task.placeHolderText} 
                                required = {task.required}
                                value = {task.defaultValue}
                              />
                            }
                            {task.fieldtype == 'dropdown' &&
                              <select >
                                <option>Select</option>
                                <option>Testing 1</option>
                                <option>Testing 2</option>
                              </select>
                            }
                            {task.fieldtype == 'radio' &&
                              <>
                                <input type="radio" name="name" id="name" value="Male" /> Male
                                <input type="radio" name="name" id="name" value="Female" /> Female
                              </>
                            }
                          </div>
                      </div>
                    )}

                  </div>
                }
              </div>

            </div>
          </div>

          <div className="toolbox-container">
            <ul className="toolbox-list">
              {toolBoxData.map((items, i) =>
                <li
                  key={i}
                  onDragStart={(e) => onDragStart(e, items.name)}
                  draggable="true"
                >
                  {items.textToShow}
                </li>
              )}
            </ul>
          </div>


          
          {popupShow && 
            <div className="popup-container">
              <div className="popup-inner">
                <span onClick={() => {closePopup()}} className="popup-close"  > X </span>                
                <h2 className="popup-header">{popupData.fieldtype} Editor</h2>
                <div className="popform">
                  <label>Label Name : </label>
                  <input type="text" 
                         value = {popupData.placeHolderLabel} 
                         onChange={e => updatePopupData("placeHolderLabel",e.target.value)}
                  />

                  <label>Default Value : </label>
                  <input type="text" 
                         value = {popupData.defaultValue} 
                         onChange={e => updatePopupData("defaultValue",e.target.value)}
                  />
                  
                  <label>Input Name attr :</label>
                  <input type="text" 
                         value = {popupData.name} 
                         onChange={e => updatePopupData("name",e.target.value)}        
                  />

                  <label>Input id attr:</label>
                  <input type="text" 
                         value = {popupData.id} 
                         onChange={e => updatePopupData("id",e.target.value)}
                  />

                  <label>Mandatory/Required:</label>
                  <input type="checkbox"  
                      checked = {popupData.required ? true : false} 
                      onChange={e => updatePopupData("required",!popupData.required)}
                  /> Mandatory/Required
                
                  <div className="buttons-grp">
                    <button 
                      className="done"
                      onClick={e => reaplceFormDataWithPopupData()}
                    >Done</button>
                    <button 
                      className="cancel"
                      onClick={() => {closePopup()}}
                      >Cancel</button>
                  </div>

                </div>
              </div>
            </div>
          }


      </div>
    </div>
      {/* <Main /> */ }
    </div >
  );
}

export default App;
