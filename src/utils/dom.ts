export const $ = <E extends HTMLElement>(selector: string): E | null =>
  document.querySelector(selector);

export const isChecked = ($target: HTMLInputElement) => $target.checked;

export const dispatchCustomEvent = (
  $target: HTMLElement,
  {
    eventType,
    data = null,
  }: {
    eventType: string;
    data?: unknown;
  }
) => {
  const customEvent = new CustomEvent(eventType, { detail: data });

  $target.dispatchEvent(customEvent);
};
