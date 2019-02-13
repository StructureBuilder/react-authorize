type Warn = (message?: string) => void;

export let warn: Warn = () => undefined;

if (process.env.NODE_ENV !== 'production') {
  warn = message => {
    if (typeof console !== undefined && console.error) {
      console.error(message);
    } else {
      throw new Error(message);
    }
  };
}
