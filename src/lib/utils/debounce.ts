type DebounceCallback<TArgs> = (args: TArgs) => void;

export function debounce<TArgs>(
  func: DebounceCallback<TArgs>,
  timeout = 500
): (args: TArgs) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (args: TArgs) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(args);
    }, timeout);
  };
}
