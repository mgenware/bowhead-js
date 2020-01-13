const regex = /{([0-9]+)(\:[a-z]+)?}/g;
let isMuted = true;

export function muteExceptions(val: boolean) {
  isMuted = val;
}

export default function format(str: string, ...args: unknown[]): string {
  if (!str) {
    return str;
  }
  return str.replace(regex, (_, g1: string, g2: string) => {
    const funcName = g2 ? g2.substr(1) : '';
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

    let val = args[idx] ? (args[idx] as object).toString() : '';
    if (funcName) {
      switch (funcName) {
        case 'lowercase':
          val = val.toLowerCase();
          break;

        case 'uppercase': {
          val = val.toUpperCase();
          break;
        }

        case 'capitalized': {
          if (val) {
            val = val.charAt(0).toUpperCase() + val.substr(1);
          }
          break;
        }

        default:
          val = `${val}:${funcName}`;
          break;
      }
    }
    return val;
  });
}
