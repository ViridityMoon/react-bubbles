import React, { useState } from "react";
import { axiosWithAuth } from '../auth/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToAffect, setColorToAffect] = useState(initialColor);

  const redirect = () => {
    document.location.reload(true);
  };

  const editColor = color => {
    setEditing(true);
    setColorToAffect(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/api/colors/${colorToAffect.id}`, colorToAffect)
      .then(res => {
        setColorToAffect(initialColor)
      })
      .catch(err => console.log(err.response));

      redirect();
  };

  const addColor = () => {
    axiosWithAuth()
      .post('/api/colors', colorToAffect)
      .then(res => {
        console.log(res);
        setColorToAffect(initialColor)
      })
      .catch(err => console.log(err.response));
    redirect();
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    
      redirect();
  };

  return (
    <div className="colors-wrap">
      <p>Colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation(); // this makes the other onClick not happen
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => setAdding(true)}>Add a Color</button>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAffect({ ...colorToAffect, color: e.target.value })
              }
              value={colorToAffect.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAffect({
                  ...colorToAffect,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAffect.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      { adding && (
        <form onSubmit={addColor}>
        <h3>add color</h3>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToAffect({ ...colorToAffect, color: e.target.value })
              }
              value={colorToAffect.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToAffect({
                  ...colorToAffect,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAffect.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
            <button onClick={() => setAdding(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
