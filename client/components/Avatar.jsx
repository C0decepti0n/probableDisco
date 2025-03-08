import React, { useState, useEffect } from "react";
const axios = require("axios");

function Avatar(props) {
  const [formInputs, setFormInputs] = useState({
    name: "",
    idleImage: "",
    activeImage: "",
    userId: 0,
  });

  // get avatars from the database on first render
  useEffect(() => {
    getAvatars();
  }, []);

  // make sure current image is set when avatars are updated
  useEffect(() => {
    if (!props.currentImage.name && props.avatars.length > 0) {
      props.setCurrentImage(props.avatars[0]);
    }
  }, [props.avatars]);

  // Debugging: Log current image and avatars
  useEffect(() => {
    console.log("Current Image:", props.currentImage);
    console.log("Avatars:", props.avatars);
  }, [props.currentImage, props.avatars]);

  const getAvatars = () => {
    axios.get("/avatar")
      .then((response) => {
        if (response.data.length > 0) {
          props.setAvatars(response.data);
          // a default avatar is set
          // props.setCurrentImage(response.data[0]); 
        }
      })
      .catch((err) => {
        console.error("Failed to get avatarsArray from database", err);
      });
  };

  const addAvatar = () => {
    axios
      .post("/avatar", formInputs)
      .then(() => {
        // refresh avatars after adding
        getAvatars(); 
      })
      .catch((err) => {
        console.error("Failed to create new avatar in database", err);
      });
  };

  const deleteAvatar = () => {
    // makes sure theres an image to delete
    if (!props.currentImage) return; 

    axios
      .delete(`/avatar/${props.currentImage._id}`, {
        data: { userId: props.currentImage.userId },
      })
      .then(() => {
        getAvatars(); 
      })
      .catch((err) => {
        console.error("Failed to delete current avatar in database", err);
      });
  };

  const modAvatar = () => {
    const changes = {};
    for (let key in formInputs) {
      if (formInputs[key] !== "" && key !== "userId") {
        changes[key] = formInputs[key];
      }
    }

    // prevents mod if no image is selected
    if (!props.currentImage) return; 

    axios
      .patch(`/avatar/${props.currentImage._id}`, changes)
      .then(() => {
        // refresh avatars after mod
        getAvatars(); 
      })
      .catch((err) => {
        console.error("Failed to update current avatar in database", err);
      });
  };

  // prevent errors if props.currentImage is undefined
  // if (!props.currentImage) {
  //   return <p>Loading avatar...</p>;
  // }

  return (
    <div>
      <span>idleImage</span>
      <img
        src={props.currentImage.idleImage}
        alt="Idle Avatar"
        height="20%"
        width="20%"
      />
      <span>activeImage</span>
      <img
        src={props.currentImage.activeImage}
        alt="Active Avatar"
        height="20%"
        width="20%"
      />
      <select onChange={e => props.setCurrentImage(props.avatars[e.target.options.selectedIndex])}>

        {/* Dropdown for selecting avatars */}
        {props.avatars.map((avatar) => (
          <option
            key={avatar._id}
            value={avatar._id}
            onSelect={() => props.setCurrentImage(avatar)}
          >
            {avatar.name}
          </option>
        ))}
      </select>
      <button onClick={deleteAvatar}>Delete</button>

      <div>
        <input
          onChange={(e) =>
            setFormInputs((original) => ({
              ...original,
              name: e.target.value,
            }))
          }
          placeholder="Name of Avatar"
        />
        <input
          onChange={(e) =>
            setFormInputs((original) => ({
              ...original,
              idleImage: e.target.value,
            }))
          }
          placeholder="Idle Image Link"
        />
        <input
          onChange={(e) =>
            setFormInputs((original) => ({
              ...original,
              activeImage: e.target.value,
            }))
          }
          placeholder="Active Image Link"
        />
      </div>

      <button onClick={addAvatar}>Add</button>
      <button onClick={modAvatar}>Modify Current Avatar</button>
    </div>
  );
}

export default Avatar;