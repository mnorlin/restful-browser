import { Pagination as BSPagination } from "react-bootstrap";

export function Pagination({ links, page }) {
  if (!links || page?.totalPages === 1) return null;
  return (
    <BSPagination>
      <BSPagination.First
        disabled={links.first ? false : true}
        onClick={() => (window.location.href = links.first?.href)}
      />
      <BSPagination.Prev
        disabled={links.prev ? false : true}
        onClick={() => (window.location.href = links.prev?.href)}
      />
      <BSPagination.Item disabled>
        {page.number + 1} / {page.totalPages}
      </BSPagination.Item>
      <BSPagination.Next
        disabled={links.next ? false : true}
        onClick={() => (window.location.href = links.next?.href)}
      />
      <BSPagination.Last
        disabled={links.last ? false : true}
        onClick={() => (window.location.href = links.last?.href)}
      />
    </BSPagination>
  );
}
