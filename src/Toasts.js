import { useState, useEffect } from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { EventDispatcher } from "utils";
import { v4 as uuid } from "uuid";

export const toastDispatcher = new EventDispatcher("toasts");

export function Toasts() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    toastDispatcher.addListener(onToast);
    const intervalId = setInterval(clearToasts, 1000);

    function onToast({ timeout = 5000, ...props }) {
      setToasts(toasts.concat({ id: uuid(), timeout, created: new Date().getTime(), ...props }));
    }

    function clearToasts() {
      const now = new Date();
      let filtered = toasts.filter((toast) => toast.timeout === null || toast.created + toast.timeout > now.getTime());
      setToasts(filtered);
    }

    return () => {
      toastDispatcher.removeListener();
      clearInterval(intervalId);
    };
  }, [toasts]);
  function onClose(id) {
    setToasts(toasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContainer className="m-4" position="bottom-end">
      {toasts.map((toast, idx) => (
        <Toast key={idx} onClose={() => onClose(toast.id)}>
          <Toast.Header>
            <i className={`text-${toast.variant || "success"} bi bi-square-fill me-2`}></i>
            <strong className="me-auto">{toast.title || ""}</strong>
          </Toast.Header>
          <Toast.Body>{toast.message || (toast.variant === "success" ? "Success" : "Error")}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
