import { Card } from "react-bootstrap";
import { formatCamelCase } from "utils.js";

export function Wrapper({ title, children }) {
  return (
    <Card className="mb-4">
      <Card.Header>{formatCamelCase(title)}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
