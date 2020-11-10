const regex = /{([0-9]+)(|[a-z|]+)?}/g;
let isMuted = true;

export function muteExceptions(val: boolean) {
  isMuted = val;
}

export default function format(str: string, ...args: unknown[]): string {
  if (!str) {
    return str;
  }
  return str.replace(regex, (_, g1: string, g2: string) => {
    const payload = g2 ? g2.substr(1) : '';
    const idx = parseInt(g1, 10);
    if (isNaN(idx)) {
      if (isMuted) {
        return `${g1} is NaN`;
      } else {
        throw new Error(`Invalid number in string "${str}"`);
      }
    }
    if (idx < 0 || idx >= args.length) {
      if (isMuted) {
        return `<${idx} is out of range>`;
      } else {
        throw new Error(`Index out of range in string "${str}"`);
      }
    }

    const input = args[idx];
    const inputString = `${input}`;
    const payloadStrings = payload.split('|');
    const funcName = payloadStrings[0];
    const extraParams = payloadStrings.slice(1);
    if (funcName) {
      switch (funcName) {
        case 'lowercase':
          return inputString.toLowerCase();

        case 'uppercase': {
          return inputString.toUpperCase();
        }

        case 'capitalized': {
          if (inputString) {
            return inputString.charAt(0).toUpperCase() + inputString.substr(1);
          }
          return inputString;
        }

        case 'countable': {
          const inputNum = typeof input === 'number' ? input : -1;
          if (inputNum === 1) {
            return extraParams[0] || '';
          } else if (inputNum >= 0) {
            return extraParams[1] || extraParams[0] || '';
          }
          // Invalid number, return the input string instead.
          return inputString;
        }

        default:
          return `${input}|${funcName}`;
      }
    }
    return inputString;
  });
}
