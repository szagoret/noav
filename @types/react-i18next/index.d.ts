import 'react-i18next';
import {resources} from 'src/i18n/config';

declare module 'react-i18next' {
    type DefaultResources = typeof resources['de'];

    interface Resources extends DefaultResources {
    }
}