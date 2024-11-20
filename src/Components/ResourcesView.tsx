import { ResourceLine } from "./ResourceLine";

import { Resource } from "../Models/Resource";
import "../StyleSheets/ResourceView.css";

export function ResourceView({ resources }: { resources: Resource[] }) {
  return (
    <table className="resourceTable">
      <tr className="tableHeader">
        <th>Resource</th>
        <th>Available</th>
      </tr>

      {resources.map((resource, index) => (
        <ResourceLine key={index} resource={resource} />
      ))}
    </table>
  );
}
