export function formatCamelCase(string) {
  // return string;
  return (
    string
      .replace(/([A-Z])/g, " $1")
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}

export class EventDispatcher {
  constructor(eventId) {
    this.eventTarget = document; // new EventTarget();
    this.eventId = eventId;

    this.eventTarget.addEventListener(this.eventId, this.internalCallback.bind(this));
  }

  internalCallback(e) {
    this.onEventCallback?.(e.detail);
  }

  addListener(listener) {
    this.onEventCallback = listener;
  }

  removeListener() {
    this.eventTarget.removeEventListener(this.eventId, this.onEventCallback);
  }

  dispatch(data) {
    const event = new CustomEvent(this.eventId, { detail: data });
    this.eventTarget.dispatchEvent(event);
  }
}
