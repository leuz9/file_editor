import React from "react";
import "./App.css";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
      },
    };
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }
  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }
  setUpdate(text, key) {
    console.log("items:" + this.state.items);
    const items = this.state.items;
    items.map((item) => {
      if (item.key === key) {
        console.log(item.key + "    " + key);
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }
  render() {
    return (
      <div className="App">
        {/* to do : load the file to be edited */}
        <div className="filetoedit">
          <form>
            <label for="myfile">Selected File:</label>
            <input type="" id="myfile" name="myfile"></input>
          </form>
        </div>
        {/* to do : load the file to be edited --- end */}
        <div className="content">
          <header>
            <form id="to-do-form" onSubmit={this.addItem}>
              <textarea
                placeholder="Text area with file content"
                value={this.state.currentItem.text}
                onChange={this.handleInput}
              ></textarea>
              <button type="submit">Save</button>
            </form>
            <p>{this.state.items.text}</p>
          </header>{" "}
        </div>
        <div className="content">
          <ListItems
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}

export default App;
