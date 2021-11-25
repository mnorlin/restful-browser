import { Toasts } from "Toasts";
import { useHalResource } from "hooks";
import { BreadCrumbs, HalData, HalEmbedded, HalTemplates, HalLinks, Pagination } from "components";

function App() {
  const link = decodeURI(window.location.pathname).split("{")[0];
  const resource = useHalResource(link + (window.location.search.includes("}") ? "" : window.location.search));
  const ignoredLinks = ["self", "next", "prev", "first", "last"];

  const hasPagination = resource.data?.page && resource.embedded;
  return (
    <>
      <div className="container my-3">
        <BreadCrumbs link={link} />
        <div className="row">
          <div className="col-8">
            <HalEmbedded embedded={resource.embedded} />
            {hasPagination ? <Pagination links={resource.links} page={resource.data.page} /> : null}
            {!hasPagination ? <HalData data={resource.data} link={resource.links?.self} /> : null}
          </div>
          <div className="col-4">
            <HalLinks links={resource.links} ignore={ignoredLinks} />
            <HalTemplates templates={resource.templates} />
          </div>
        </div>
      </div>
      <Toasts />
    </>
  );
}

export default App;
