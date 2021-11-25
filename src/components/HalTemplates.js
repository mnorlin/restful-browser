import { useEffect, useState } from "react";
import { Accordion, Badge, Button } from "react-bootstrap";
import { formatCamelCase } from "utils.js";
import { toastDispatcher } from "Toasts";

export function HalTemplates({ templates }) {
  if (!templates) return null;

  return (
    <Accordion className="mb-4">
      {Object.entries(templates).map(([key, value]) => (
        <Accordion.Item key={key} eventKey={key}>
          <Accordion.Header>
            {formatCamelCase(key)}
            <Badge bg="dark" className="ms-3">
              {value.method.toUpperCase()}
            </Badge>
          </Accordion.Header>
          <Accordion.Body>
            <FormTemplate template={value} />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

function FormTemplate({ template }) {
  const [submitResponse, setSubmitResponse] = useState();
  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());

    const link = decodeURI(window.location.pathname).split("{")[0];

    fetch(link, {
      method: template.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.REACT_APP_AUTHTOKEN,
        "CSRF-TOKEN": getCookie(process.env.REACT_APP_XSRFCOKKIE),
        "X-CSRF-TOKEN": getCookie(process.env.REACT_APP_XSRFCOKKIE),
      },
      body: JSON.stringify(value),
    }).then((response) => setSubmitResponse(response));
  }

  useEffect(() => {
    if (submitResponse && !submitResponse.bodyUsed) {
      if (!submitResponse.headers.get("content-type")) {
        toastDispatcher.dispatch({
          variant: submitResponse.ok ? "success" : "danger",
          title: "HTTP " + submitResponse.status,
          message: submitResponse.ok ? "Success" : "Error",
          timeout: submitResponse.ok ? undefined : null,
        });
        return;
      }

      submitResponse
        .json()
        .then((json) => {
          toastDispatcher.dispatch({
            variant: submitResponse.ok ? "success" : "danger",
            title: "HTTP " + submitResponse.status,
            message: json.title || json.message,
            timeout: submitResponse.ok ? undefined : null,
          });
        })
        .catch(() => {
          toastDispatcher.dispatch({
            variant: submitResponse.ok ? "success" : "danger",
            title: "HTTP " + submitResponse.status,
            message: "An error occured",
            timeout: submitResponse.ok ? undefined : null,
          });
        });
    }
  }, [submitResponse]);

  return (
    <>
      <form onSubmit={onSubmit}>
        {template.properties.map((input) => (
          <div key={input.name} className="mb-3">
            <label className="form-label">{input.prompt || formatCamelCase(input.name)}</label>
            <input className="form-control" name={input.name} type={input.type || "text"} />
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
