import * as React from "react";
export const CellRender = (props) => {
  const dataItem = props.originalProps.dataItem;
  const cellField = props.originalProps.field;
  const inEditField = dataItem[props.editField || ""];
  const additionalProps =
    cellField && cellField === inEditField
      ? {
          ref: (td) => {
            const input = td && td.querySelector("input");
            const activeElement = document.activeElement;
            if (
              !input ||
              !activeElement ||
              input === activeElement ||
              !activeElement.contains(input)
            ) {
              return;
            }
            if (input.type === "checkbox") {
              input.focus();
            } else {
              input.select();
            }
          },
        }
      : {
          onClick: () => {
            props.enterEdit(dataItem, cellField);
          },
        };
  const clonedProps = {
    ...props.td.props,
    ...additionalProps,
  };
  return React.cloneElement(props.td, clonedProps, props.td.props.children);
};
export const RowRender = (props) => {
  let preventExit = false;
  const trProps = {
    ...props.tr.props,
    onMouseDown: () => {
      preventExit = true;
    },
    onBlur: () => {
      if (!preventExit) {
        props.exitEdit();
      }
      preventExit = false;
    },
  };
  return React.cloneElement(
    props.tr,
    {
      ...trProps,
    },
    props.tr.props.children
  );
};