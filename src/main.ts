const regex = /{([0-9]+)(\:[a-z\:]+)?}/g;
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

    let input = args[idx]
      ? (args[idx] as Record<string, unknown>).toString()
      : '';
    const payloadStrings = payload.split(':');
    const funcName = payloadStrings[0];
    const extraParams = payloadStrings.slice(1);
    if (funcName) {
      switch (funcName) {
        case 'lowercase':
          input = input.toLowerCase();
          break;

        case 'uppercase': {
          input = input.toUpperCase();
          break;
        }

        case 'capitalized': {
          if (input) {
            input = input.charAt(0).toUpperCase() + input.substr(1);
          }
          break;
        }

        case 'countable': {
          const inputNum = parseInt(input, 10);
          if (!isNaN(inputNum)) {
            if (inputNum === 1) {
              input = extraParams[0] || '';
            } else {
              input = extraParams[1] || extraParams[0] || '';
            }
          }
          break;
        }

        default:
          input = `${input}:${funcName}`;
          break;
      }
    }
    return input;
  });
}
