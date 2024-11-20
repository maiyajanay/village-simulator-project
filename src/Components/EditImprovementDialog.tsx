import { FormEvent } from "react";
import "../StyleSheets/EditImprovementDialog.css";


interface EditImprovementDialogProp {
  OnClose: () => void;
  OnUpgrade: () => void;
  OnDowngrade: () => void;
  OnRemove: () => void;
}

export function EditImprovementDialog({
  OnClose,
  OnUpgrade,
  OnDowngrade,
  OnRemove,
}: EditImprovementDialogProp) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }
  return (
    <form className="editFrom" id="editImprovementBox" onSubmit={handleSubmit}>
      <div id="editImprovementLabels">
        <label>Type</label>
        <label>Level</label>
        <label>Benefit</label>
        <label>Cost</label>
      </div>
      <div id="editImprovementButtons">
        <button onClick={OnClose}>Close</button>
        <button onClick={OnUpgrade}>Upgrade</button>
        <button onClick={OnDowngrade}>Downgrade</button>
        <button onClick={OnRemove}>Remove</button>
      </div>
    </form>
  );
}
