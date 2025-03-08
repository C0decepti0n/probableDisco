import React, { useState, useEffect } from 'react';
const axios = require('axios');

function Settings({ themes, setThemes, theme, setTheme}) {
  // create formValues state to keep track of formValues
  const [formValues, setFormValues] = useState({
    themeName: '',
    primaryColor: '',
    secondaryColor: '',
    tertiaryColor: '',
    cursor: '',
    font: '',
    borderRadius: '',
    userId: 0,
  });

  useEffect(() => {
    // run getThemes to change the application's state's themes upon first render of the Settings component
    getThemes();
  }, []);

  useEffect(() => {
    // any time themes is altered, set the current theme to the first theme in themes (but only if the current theme is no longer present in the themes array and the first theme in the themes array is not undefined)
    // aka, changes theme only upon the first time that themes is altered OR whenever a theme gets deleted
    if (!themes.includes(theme) && themes[0] !== undefined) {
      setTheme(themes[0]);
    }
  }, [themes])

  // TESTING LOGGING
  useEffect(() => {
    console.log(theme, themes)
  }, [theme, themes])

  const getThemes = () => {
    // send a GET request to /settings on server to get an array of all themes in the db
    axios.get('/settings')
      .then(settings => {
        // set themes in App's state to be the returned settings data
        setThemes(settings.data);
      })
      .catch(err => {
        // handle errors
        console.error('Failed to get theme settings from database', err);
      });
  };

  const addTheme = () => {
    // send a POST request to /settings on the server to add a new theme to the db
    axios.post('/settings', formValues)
      .then(() => {
        // set themes in App's state to be the new list of themes in the db by calling getThemes
        getThemes();
      })
      .catch(err => {
        // handle errors
        console.error('Failed to create new theme in database', err);
      });
  };

  const updateTheme = () => {
    // put only the non-empty form values into a new object that will be sent as the PATCH request's body
    const valuesToChange = {};
    // loop through the formValues object
    for (let key in formValues) {
      // for each key/value pair in formValues (excluding userId), give valuesToChange a copy of the same key/value pair as long as the value isn't an empty string
      if (formValues[key] !== '' && key !== 'userId') {
        valuesToChange[key] = formValues[key];
      }
    }

    // send PATCH request to /settings/:id on the server to alter the db record associated with the theme currently being used
    axios.patch(`/settings/${theme._id}`, valuesToChange)
      .then(() => {
        // set themes in App's state to be the new list of themes in the db by calling getThemes
        getThemes();
      })
      .catch(err => {
        // handle errors
        console.error('Failed to update current theme in database', err);
      });
  };
  const deleteTheme = () => {
    // send a DELETE request to /settings/:id on the server to delete the db record associated with the theme currently being used
    // include the current theme's userId in the body (under the data key) so that the server doesn't need to find said userId from the db again
    axios.delete(`/settings/${theme._id}`, {
      data: {userId: theme.userId}
    })
      .then(() => {
        // set themes in App's state to be the new list of themes in the db by calling getThemes
        getThemes();
      })
      .catch(err => {
        // handle errors
        console.error('Failed to delete current theme in database', err);
      });
  };

  const updateFormValues = (key, value) => {
    console.log(value);
    setFormValues(currentValues => {
      // update the corresponding form value in Setting's form values state to be the inputted value from the forms
      currentValues[key] = value;
      // return the new state for Setting's form values
      return currentValues;
    });

    console.log(formValues);
  }

  return (
    <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius}}>
      <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font, fontWeight:'bold'}}>Theme Loadouts</span>
      {/* set the current theme to the selected theme from the list of option tags in the select tag */}
      <select id='themes' onChange={e => setTheme(themes[e.target.options.selectedIndex])}>
        {
          themes.map((themeObj) => {
            return (
              <option key={themeObj._id}>
              {themeObj.themeName}
              </option>
            )
          })
        }
      </select>
      <button onClick={deleteTheme}>Delete Theme</button>
      {/* forms can be filled out with info that is saved in state and then is used for either POST requests or Patch requests */}
      <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius}}>
        <div style={{background:theme.secondaryColor, borderColor:theme.tertiaryColor, borderWidth:5, borderStyle:'solid', borderRadius:theme.borderRadius}}>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Theme Name</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('themeName', e.target.value)} placeholder='insert the name of your theme'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Primary Color [text]</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('primaryColor', e.target.value)} placeholder='insert primary color (can be name or hex value)'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Secondary Color [background]</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('secondaryColor', e.target.value)} placeholder='insert secondary color (can be name or hex value)'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Tertiary Color [border]</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('tertiaryColor', e.target.value)} placeholder='insert tertiary color (can be name or hex value)'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Custom cursor image</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('cursor', e.target.value)} placeholder='insert image link for you mouse cursor (max size is 128x128) (leave blank for auto)'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Font</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('font', e.target.value)} placeholder='insert name of desired font'></input>
          <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Corner Rounding</span>
          <input style={{width:'90%'}} onChange={e => updateFormValues('borderRadius', e.target.value)} placeholder='insert number (of pixels) you want to round the corners of boxes by' type='number'></input>
        </div>
        <span style={{color:theme.primaryColor, display:'block', fontFamily:theme.font}}>Using these forms, you can:</span>
        <button onClick={addTheme}>Add Theme</button>
        <button onClick={updateTheme}>Update Current Theme <span style={{color:'dimgrey'}}>empty fields are ignored</span></button>
      </div>
    </div>
  )
};

export default Settings;