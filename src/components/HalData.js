import { Wrapper } from "components";
import { formatCamelCase } from "utils.js";

export function HalData({ data, link }) {
  if (!data) return null;

  if (Object.entries(data).length === 0) return "No data";
  return (
    <Wrapper title={link?.title || "Data"}>
      {Object.entries(data).map(([key, value]) => (
        <Property key={key} name={key} value={value} />
      ))}
    </Wrapper>
  );
}

function Property({ name, value }) {
  return (
    <>
      <dt className="mt-3">{formatCamelCase(name)}</dt>
      <dd className="mb-3">{typeof value !== "object" ? value : JSON.stringify(value)}</dd>
    </>
  );
}
