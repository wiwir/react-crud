import React, { Component } from "react";
import TodoPage from "../pages/todo";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItemText: ""
    };
    this.onNewItem = this.onNewItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onChangeNewItemText = this.onChangeNewItemText.bind(this);
    this.onExitEditModel = this.onExitEditModel.bind(this);
    this.onEnterModel = this.onEnterModel.bind(this);
  }
  onNewItem() {
    this.setState((prevState, props) => {
      return {
        items: [
          ...prevState.items,
          {
            id: Date.now(),
            text: "",
            isChecked: false,
            isEditting: true
          }
        ]
      };
    });
  }

  onRemoveItem(item) {
    const { items } = this.state;

    const index = items.findIndex(n => n.id === item.id);

    console.log("soy index", index);

    if (index === -1) {
      return;
    }
    const newItems = items.slice();

    newItems.splice(index, 1);

    this.setState(() => {
      return {
        items: newItems
      };
    });
  }
  onChangeNewItemText(event) {
    const text = event.target.value;

    this.setState((prevState, props) => {
      return {
        ...prevState,
        newItemText: text
      };
    });
  }
  onExitEditModel(item) {
    this.setState((prevState, props) => {
      return {
        newItemText: "",
        items: prevState.items.map(next => {
          if (next.id === item.id) {
            return {
              ...next,
              isEditting: false,
              text: prevState.newItemText
            };
          }
          return next;
        })
      };
    });
  }
  onEnterModel(item) {
    console.log("soy item", item);
    this.setState((prevState, props) => {
      return {
        newItemText: item.text,
        items: prevState.items.map(next => {
          if (next.id === item.id) {
            return {
              ...next,
              isEditting: true
            };
          }
          return next;
        })
      };
    });
  }
  render() {
    const { items, newItemText } = this.state;
    return (
      <TodoPage
        items={items}
        newItemText={newItemText}
        onNewItem={this.onNewItem}
        onRemoveItem={this.onRemoveItem}
        onChangeNewItemText={this.onChangeNewItemText}
        onExitEditModel={this.onExitEditModel}
        onEnterModel={this.onEnterModel}
      />
    );
  }
}

export default Todo;
