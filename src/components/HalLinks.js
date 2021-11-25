import { Wrapper } from "components";
export function HalLinks({ links, ignore = [] }) {
  function HalLink({ title, link }) {
    return <a href={link}>{title}</a>;
  }

  const filteredLinks = links ? Object.entries(links).filter(([key]) => !ignore.includes(key)) : [];

  if (filteredLinks.length === 0) {
    return null;
  }

  return (
    <Wrapper title="Links">
      <ul className="list-unstyled mb-0">
        {filteredLinks.map(([key, value]) => (
          <li key={key}>
            <HalLink title={key} link={value.href} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
