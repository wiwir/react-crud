import React from "react";
import Layout from "../../Components/layout";
import {
  Card,
  Intent,
  H2,
  Divider,
  UL,
  Button,
  Checkbox,
  Label,
  InputGroup,
  Callout
} from "@blueprintjs/core";

const TodoPage = props => {
  const {
    items,
    onNewItem,
    onRemoveItem,
    newItemText,
    onChangeNewItemText,
    onExitEditModel,
    onEnterModel,
    onToggleItemComplete,
    error
  } = props;
  return (
    <Layout>
      <Card>
        <H2>TODO</H2>
        <Button
          text="New Item"
          intent={Intent.PRIMARY}
          icon="new-object"
          className="new-todo-item"
          onClick={onNewItem}
        />
       { error && <Callout intent={Intent.DANGER}>{error}</Callout>}

        <Divider />

        <UL className="todo-list">
          {items.map(item => (
            <li className="todo-item" key={item.id}>
              <Button
                small
                icon="remove"
                intent="danger"
                className="todo-item-action"
                onClick={() => onRemoveItem(item)}
              />
              {item.isEditting ? (
                <InputGroup
                  small
                  className="todo-item-text-edit"
                  placeholder="Item text..."
                  value={newItemText}
                  onChange={onChangeNewItemText}
                  onBlur={() => onExitEditModel(item)}
                  inputRef={ref => ref && ref.focus()}
                />
              ) : (
                <React.Fragment>
                  <Checkbox
                    className="todo-item-label"
                    checked={item.isChecked}
                    onChange={() => onToggleItemComplete(item)}
                  />
                  <Label
                    onClick={() => onEnterModel(item)}
                    className={`todo-item-label ${
                      item.isChecked ? "done" : ""
                    }`}
                  >
                    {item.text}
                  </Label>
                </React.Fragment>
              )}
            </li>
          ))}
        </UL>
      </Card>
    </Layout>
  );
};

export default TodoPage;
