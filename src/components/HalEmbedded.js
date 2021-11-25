import { Table, Wrapper } from "components";

export function HalEmbedded({ embedded }) {
  if (!embedded) return null;

  return Object.entries(embedded).map(([key, value]) => (
    <Wrapper key={key} title={key}>
      <Table dataArray={value} />
    </Wrapper>
  ));
}
