import { Breadcrumb as BootstrapBC } from "react-bootstrap";
import { formatCamelCase } from "utils.js";

export function BreadCrumbs({ link }) {
  if (!link) return;

  const links = link.split("/").slice(1);

  const paths = links.reduce((acc, current, idx) => {
    return acc.concat({ path: `${acc[idx - 1]?.path || ""}/${current}`, title: formatCamelCase(current) });
  }, []);

  if (links.length < 1) return null;

  return (
    <BootstrapBC>
      <BootstrapBC.Item href="/">
        <i className="bi bi-house-door-fill" />
      </BootstrapBC.Item>
      {paths.map((path) => (
        <BootstrapBC.Item key={path} href={path.path}>
          {path.title}
        </BootstrapBC.Item>
      ))}
    </BootstrapBC>
  );
}
