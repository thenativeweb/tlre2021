// Import original module declarations
import 'styled-components';

// And extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
    };
    fonts: {
      headlines: string;
      text: string;
    };

  }
}
