import 'styled-components';
import { theme } from '../config/theme';

declare module 'styled-components' {
    export interface DefaultTheme extends theme {}
  }