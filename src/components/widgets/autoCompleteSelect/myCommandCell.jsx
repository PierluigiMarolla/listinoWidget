import * as React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
export const MyCommandCell = (props) => {
  const { dataItem } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.tariffa === undefined;
  const [visible, setVisible] = React.useState(false);
  const onDeleteData = () => {
    props.remove(props.dataItem);
    setVisible(!visible);
  };
  const toggleDialog = () => {
    setVisible(!visible);
  };
  return (
    <td className="k-command-cell">
      <Button
        themeColor={"primary"}
        onClick={() =>
          inEdit
            ? isNewItem
              ? props.discard(dataItem)
              : props.cancel(dataItem)
            : toggleDialog()
        }
      >
        {inEdit ? (isNewItem ? "Discard" : "Cancel") : "Rimuovi"}
      </Button>
      {visible && (
        <Dialog title={"Delete Data"} onClose={toggleDialog} width={420}>
          <div>
            Sei sicuro di voler cancellare la voce elementare {dataItem.Tariffa}?
          </div>
          <DialogActionsBar>
            <Button onClick={onDeleteData}>Rimuovi</Button>
            <Button onClick={toggleDialog}>Annulla</Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </td>
  );
};