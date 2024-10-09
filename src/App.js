import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Modal from "./components/Modal";

function App() {
  const [dataList, setDataList] = useState([]);
  const [selected, setSelected] = useState({});
  const [newValue, setNewValue] = useState("");
  // const [deleteItem, setDeleteItem] = useState("");

  const url = "https://jsonplaceholder.typicode.com";
  useEffect(() => {
    axios
      .get(url + "/photos?albumId=1")
      .then((res) => setDataList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id) => {
    setOpen(true);
    axios
      .get(url + "/photos/" + id)
      .then((res) => setSelected(res.data))
      .catch((err) => console.log(err));
  };

  console.log(selected, "selected");

  const updateUser = (id, updated) => {
    fetch(url + "/photos/" + id, {
      method: "PUT",
      body: JSON.stringify({
        title: updated,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const newList = dataList.map((data) => {
          if (data.id === id) {
            return { ...data, title: json.title };
          }
          return data;
        });

        setDataList(newList);
      });
  };

  const itemDelete = (id) => {
    fetch(url + "/photos/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        const newList = dataList.filter((item) => {
          return item.id !== id;
        });

        setDataList(newList);
      });
  };

  return (
    <div className="App">
      <div className="wrapper">
        {dataList.map((item) => (
          <div
            className="box"
            style={{
              backgroundImage: `url(${item.thumbnailUrl})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
            }}
          >
            <FontAwesomeIcon
              icon={faTrash}
              className="trashIcon"
              onClick={() => itemDelete(item.id)}
            />{" "}
            <button
              type="button"
              onClick={() => handleOpen(item.id)}
              className="changeButton"
            >
              Kullanıcı Güncelle
            </button>
            <p
              style={{
                fontWeight: "bolder",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <mark>Kullanıcı: </mark>
              {item.title}
            </p>
          </div>
        ))}
      </div>

      <Modal isOpen={open} onClose={handleClose}>
        <input
          className="updateInput"
          defaultValue={selected.title}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => setNewValue(e.target.value)}
        ></input>
        <button
          className="updateButton"
          onClick={() => {
            updateUser(selected.id, newValue);
            handleClose();
          }}
        >
          Güncelle
        </button>
      </Modal>
    </div>
  );
}

export default App;
