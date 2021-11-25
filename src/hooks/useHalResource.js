import { useState, useEffect } from "react";
import { toastDispatcher } from "Toasts";

export function useHalResource(link) {
  const [data, setData] = useState();
  const [embedded, setEmbedded] = useState();
  const [links, setLinks] = useState();
  const [templates, setTemplates] = useState();

  useEffect(() => {
    fetch(link, {
      headers: {
        "Content-Type": "application/prs.hal-forms+json",
        Authorization: "Bearer " + process.env.REACT_APP_AUTHTOKEN,
      },
    })
      .then((response) => {
        if (!response.ok) {
          toastDispatcher.dispatch({
            variant: "danger",
            title: "HTTP " + response.status,
            message: "Error",
            timeout: null,
          });
        }
        return response.json();
      })
      .then((json) => {
        if (!json) return;
        const { _embedded, _links, _templates, ...data } = json;
        setData(data);
        setEmbedded(_embedded);
        setLinks(_links);
        setTemplates(_templates);
      });
  }, [link]);

  return { data, embedded, links, templates };
}
