/**
 * Listens for changes in the chat and calls the callback when a change is detected.
 * Based on DOMNodeInserted event on #__next element with url change and 500ms delay.
 * @param cb Callback to call when a change is detected.
 */
export function listenersChatChanged (cb: (chatId: string) => void): void {
  const container = document.querySelector('#__next');
  if (container === null) {
    throw new Error('Could not find container');
  }
  let timeout: ReturnType<typeof setTimeout> | undefined;
  let lastUrl: string | undefined;

  container.addEventListener('DOMNodeInserted', function listenersContainerDom () {
    const currentUrl = window.location.href;
    if (currentUrl === lastUrl) {
      return;
    }
    lastUrl = currentUrl;
    if (timeout !== undefined) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      cb(currentUrl.split('/').pop() ?? '');
    }, 500);
  });
}
