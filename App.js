import React, { useState } from 'react';
//import './App.css';
//import Main from './Main';

const getUniqueRandValue = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  //return '_' + Math.random().toString(36).substr(2, 9);
}

const toolBoxData = [
  { name: 'input', textToShow: 'Text Input' },
  { name: 'dropdown', textToShow: 'Drop Down' },
  { name: 'radio', textToShow: 'Multiple Choice' },
  { name: 'date', textToShow: 'Date' },
  { name: 'heading', textToShow: 'Heading' },
  { name: 'subheading', textToShow: 'Sub Heading' },
  { name: 'numberinput', textToShow: 'Number Input' },
  { name: 'textarea', textToShow: 'Multiline Input' }
];

const initialFormFieldData = {
  'input': {
    'fieldtype':'input',
    'textToShow': 'Text Input',
    'placeHolderLabel': 'Choose Label Name',
    'placeHolderText': 'Enter Your Name',
    'id': 'userid',
    'name': 'username',
    'required': true,
    'defaultValue': '',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue()
  },
  'numberinput': {
    'fieldtype':'numberinput',
    'textToShow': 'Number Input',
    'placeHolderLabel': 'Choose Label Name',
    'placeHolderText': '',
    'minimum' : null,
    'maximum' : null,
    'id': 'userid',
    'name': 'username',
    'required': true,
    'defaultValue': '',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue()
  },
  'textarea': {
    'fieldtype':'textarea',
    'textToShow': 'Multiline Input',
    'placeHolderLabel': 'Choose Label Name',
    'placeHolderText': 'Enter Your Name',
    'id': 'userid',
    'name': 'name',
    'required': true,
    'defaultValue': '',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue()
  },
  'dropdown': {
    'fieldtype':'dropdown',
    'textToShow': 'Drop Down',
    'placeHolderLabel': 'Placeholder Label',
    'placeHolderText': 'Enter Your Name',
    'id': 'id',
    'name': 'name',
    'required': true,
    'defaultValue': '',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue(),
    'options' : [
      {'id' : getUniqueRandValue(), 'option' : 'option 1'},
      {'id' : getUniqueRandValue(), 'option' : 'option 2'},
    ]
  },
  'radio': {
    'fieldtype':'radio',
    'textToShow': 'Multiple Choice',
    'placeHolderLabel': 'Placeholder Label',
    'placeHolderText': 'Enter Your Name',
    'id': 'id',
    'name': 'name',
    'required': true,
    'defaultValue': '',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue(),
    'options' : [
      {'id' : getUniqueRandValue(), 'name':'male', 'idattr':'male', 'label' : 'Male', 'option' : 'Male'},
      {'id' : getUniqueRandValue(), 'name':'female', 'idattr':'female', 'label' : 'Female', 'option' : 'Female'},
    ]
  },
  'date': {
    'fieldtype':'date',
    'textToShow': 'Date',
    'placeHolderLabel': 'YYYY-MM-DD',
    'id': 'date',
    'name': 'date',
    'required': true,
    'placeHolderText': 'Enter Your Name',
    'sortorder' : 0,
    'uniqId' : getUniqueRandValue()
  },
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
      data.uniqId =  getUniqueRandValue();
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
  }
  /* Select option operation code goes here */
  const addSelectOption = () => {
    let newArr = [...popupData.options, {'id':getUniqueRandValue(),'option':''}];
    setPopupData({
      ...popupData,
      options : newArr
    })
  }
  const updatePopupSelectOption = (index,value) => {
    let newArr = [...popupData.options];
    newArr[index] = {'id':getUniqueRandValue(),'option':value};     
    setPopupData({
      ...popupData,     
      options : newArr
    })
  }
  const deletePopupSelectOption = (index, id) => {
    let newArr = [...popupData.options];
    newArr = newArr.filter(item => item.id !== id);
    setPopupData({
      ...popupData,
      options : newArr
    })  
  }
  /* End of Select option opreation code */

  /* Radio options operation code goes here */
  const addRadioOption = () => {
    let newArr = [...popupData.options, {'id':getUniqueRandValue(),'label':'','option':''}];
    setPopupData({
      ...popupData,
      options : newArr
    })
  }
  const updatePopupRadioOption = (index,key,value) => {
    let newArr = [...popupData.options];
    newArr[index][key] = value;
    setPopupData({
      ...popupData,     
      options : newArr
    })
  }
  const deletePopupRadioOption = (index, id) => {
    let newArr = [...popupData.options];
    newArr = newArr.filter(item => item.id !== id);
    setPopupData({
      ...popupData,
      options : newArr
    })
  }
  /* End of Select option opreation code */

  
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
  const deleteFieldData = (uniqId) => {
    let data = tasks.filter(item => item.uniqId !== uniqId);
    setTasks(data);    
  }
  console.log(tasks,"t")
  return (
    <div className="App">
      <div className="container">
        <div className="main_fluid">

        <div className = "container_fluid">
            <h3>Form Builder</h3>            
        </div>


        <div className = "container_fluid">
          <div className="drop-fluid">
            <div className="drop-inner">
              <div className="drop-area"
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => { onDrop(e) }}
              >

                {tasks.length === 0 ?
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
                              <div className="form_field_type">
                                {task.textToShow}
                              </div>
                              <label>
                                {task.required && <span className="required">*</span> }
                                {task.placeHolderLabel}
                              </label>                              
                              <ul className="tool-actions">
                                <li onClick={() => {editFieldData(index)}}>Edit</li>
                                <li onClick={() => {deleteFieldData(task.uniqId)}}>Delete</li>
                              </ul>
                            </div>
                              
                            {task.fieldtype === 'input' &&
                              <input className="text-input"  type="text" 
                                name={task.name} 
                                id={task.id} 
                                placeholder={task.placeHolderText} 
                                required = {task.required}
                                value = {task.defaultValue}
                                readOnly
                              />
                            }

                            {task.fieldtype === 'numberinput' &&
                              <input className="text-input"  type="number" 
                                name={task.name} 
                                id={task.id} 
                                placeholder={task.placeHolderText} 
                                required = {task.required}
                                value = {task.defaultValue}
                                minimum = {task.minimum}
                                maximum = {task.maximum}                                
                              />
                            }

                            {task.fieldtype === 'date' &&
                              <input className="text-input"  type="date" 
                                name={task.name} 
                                id={task.id} 
                                placeholder={task.placeHolderText} 
                                required = {task.required}                                
                              />
                            }

                            {task.fieldtype === 'textarea' &&
                              <textarea className="text-input text-area"   
                                name={task.name} 
                                id={task.id}
                                placeholder={task.placeHolderText} 
                                required = {task.required}                                
                              >
                                {task.defaultValue}
                              </textarea>
                            }
                            {task.fieldtype === 'dropdown' &&
                              <select >
                                <option>Select</option>
                                {task.options.map((items, i) =>
                                  <option key={i}>{items.option}</option>
                                )}
                              </select>
                            }

                            {task.fieldtype === 'radio' &&
                              <>
                                {task.options.map((items, i) =>
                                  <div key={i} className="radio_cont">
                                    <input type="radio" value={items.option} 
                                      checked = {items.option === task.defaultValue ? true : false }
                                    /> 
                                    <label>{items.label}</label>
                                  </div>
                                )}
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


        </div>

          {popupShow && 
            <div className="popup-container">
              <div className="popup-inner">
                <span onClick={() => {closePopup()}} className="popup-close"  > X </span>                
                <h2 className="popup-header">{popupData.textToShow} Editor</h2>
                <div className="popform">
                  
                  <label>Label Name : </label>
                  <input type="text" 
                         value = {popupData.placeHolderLabel} 
                         onChange={e => updatePopupData("placeHolderLabel",e.target.value)}
                  />

                  { (popupData.fieldtype === 'input' || popupData.fieldtype === 'numberinput' || popupData.fieldtype === 'textarea') && 
                    <>
                      <label>Default Value : </label>
                      <input type="text" 
                            value = {popupData.defaultValue} 
                            onChange={e => updatePopupData("defaultValue",e.target.value)}
                      />
                    </>
                  }
                  
                  { (popupData.fieldtype === 'numberinput') && 
                    <>
                      <label>Minimum : </label>
                      <input type="number" 
                            value = {popupData.minimum} 
                            onChange={e => updatePopupData("minimum",e.target.value)}
                      />

                      <label> Maximum : </label>
                      <input type="number" 
                            value = {popupData.maximum} 
                            onChange={e => updatePopupData("maximum",e.target.value)}
                      />
                    </>
                  }

                  {popupData.fieldtype !== 'radio' &&
                    <>
                      <label>{popupData.textToShow} Name attr :</label>
                      <input type="text" 
                            value = {popupData.name} 
                            onChange={e => updatePopupData("name",e.target.value)}        
                      />

                      <label>{popupData.textToShow} id attr:</label>
                      <input type="text" 
                            value = {popupData.id} 
                            onChange={e => updatePopupData("id",e.target.value)}
                      />
                    </>
                  }

                  <label>Mandatory/Required:</label>
                  <input type="checkbox"  
                      checked = {popupData.required ? true : false} 
                      onChange={e => updatePopupData("required",!popupData.required)}
                  /> Mandatory/Required

                  
                  { ( popupData.options && popupData.fieldtype === 'dropdown' ) &&
                     <>
                      <div>
                          <h2>Options</h2>                        
                          {popupData.options.map((items, i) =>
                            <div className="popup-options">
                              <input type="text"  
                                onChange={e => updatePopupSelectOption(i,e.target.value)}      
                                value={items.option}  />
                              <span onClick={e => deletePopupSelectOption(i,items.id)}>X</span>
                            </div>  
                          )}
                      </div>
                      <div className="buttons-grp">
                        <button
                          className="done"
                          onClick={e => addSelectOption()}>Add Option</button>
                      </div>
                    </>
                  }


                  { ( popupData.options && popupData.fieldtype === 'radio' ) &&
                     <>
                      <div>
                          <h2>Options</h2>                        
                          {popupData.options.map((items, i) =>
                            <div key={i} className="popup-options">
                              <input type="text"  
                                onChange={e => updatePopupRadioOption(i,'label',e.target.value)}      
                                value={items.label} 
                                placeholder = "Label"
                                className="col-25"  />
                              <input type="text"  
                                onChange={e => updatePopupRadioOption(i,'option',e.target.value)}      
                                value={items.option} 
                                placeholder = "Value"
                                className="col-25" />
                              <input type="text"  
                                onChange={e => updatePopupRadioOption(i,'name',e.target.value)}      
                                value={items.name} 
                                placeholder = "Name Attr"
                                className="col-25"  />
                              <input type="text"  
                                onChange={e => updatePopupRadioOption(i,'idattr',e.target.value)}      
                                value={items.idattr} 
                                placeholder = "Id Attr"
                                className="col-25"  />
                              <span onClick={e => deletePopupRadioOption(i,items.id)}>X</span>
                            </div>  
                          )}
                      </div>
                      <div className="buttons-grp">
                        <button
                          className="done"
                          onClick={e => addRadioOption()}>Add Option</button>
                      </div>

                      <label>Default Selection : </label>
                      <select onChange={e => updatePopupData("defaultValue",e.target.value)} >
                        <option>Select</option>
                        {popupData.options.map((items, i) =>
                          <option key={i}>{items.option}</option>
                        )}
                      </select>
                    </>
                  }
                  
                
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
    
    </div >
  );
}

export default App;
