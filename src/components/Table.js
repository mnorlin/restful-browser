import { Table as BSTable } from "react-bootstrap";
import { formatCamelCase } from "utils.js";

export function Table({ dataArray }) {
  if (!dataArray || dataArray?.length === 0) return "No content";
  const columnHeaders = Object.keys(dataArray[0]).filter((prop) => !prop.startsWith("_"));
  return (
    <BSTable hover>
      <thead>
        <tr>
          {columnHeaders.map((title) => (
            <th key={title}>{formatCamelCase(title)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataArray.map((row, idx) => (
          <tr onClick={() => (window.location.href = row._links.self.href)} key={idx}>
            {columnHeaders.map((property) => (
              <td key={property}>{JSON.stringify(row[property]).replace(/(^"|"$)/g, "")}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </BSTable>
  );
}
