import React, { Component } from "react";
import TodoPage from "../pages/todo";
import { create, read, update, remove } from "../services/api";

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
    this.onToggleItemComplete = this.onToggleItemComplete.bind(this);
  }
  async componentDidMount() {
    try {
      const items = await read();
      this.setState({ items });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  async onNewItem() {
    try {
      const newItem = await create({ text: "", isChecked: false });
      this.setState((prevState, props) => {
        return {
          items: [
            ...prevState.items,
            {
              ...newItem,
              isEditting: true
            }
          ]
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async onRemoveItem(item) {
    try {
      await remove(item.id);
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
    } catch (error) {
      this.setState({ error: error.message });
    }
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
  async onExitEditModel(item) {
    try {
      const updatedItem = await update(item.id, {
        text: this.state.newItemText
      });

      this.setState((prevState, props) => {
        return {
          newItemText: "",
          items: prevState.items.map(next => {
            if (next.id === item.id) {
              return {
                ...updatedItem,
                isEditting: false
              };
            }
            return next;
          })
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  onEnterModel(item) {
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

  async onToggleItemComplete(item) {
    const updateItemCheckBox = await update(item.id, {
      isChecked: !item.isChecked
    });
    try {
      this.setState((prevState, props) => {
        return {
          items: prevState.items.map(next => {
            if (next.id === item.id) {
              return updateItemCheckBox;
            }
            return next;
          })
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }
  render() {
    const { items, newItemText, error } = this.state;
    return (
      <TodoPage
        items={items}
        newItemText={newItemText}
        onNewItem={this.onNewItem}
        onRemoveItem={this.onRemoveItem}
        onChangeNewItemText={this.onChangeNewItemText}
        onExitEditModel={this.onExitEditModel}
        onEnterModel={this.onEnterModel}
        onToggleItemComplete={this.onToggleItemComplete}
        error={error}
      />
    );
  }
}

export default Todo;
