
import { Resource } from "../Models/Resource";
import "../StyleSheets/ResourceLine.css";

interface ResourceLineProps {
  resource: Resource;
}

export function ResourceLine({ resource }: ResourceLineProps) {
  return (
    <tr className="resource-line">
      <td className="resource-left">
        <img
          id="imgIcon"
          style={{ height: "40px", padding: "3px" }}
          src={resource.icon}
        />
        {resource.type}{" "}
      </td>
      <td className="resource-right">{resource.amount}</td>
    </tr>
  );
}
