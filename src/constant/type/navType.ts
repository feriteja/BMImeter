import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {rootStackParams} from '../../config/router';

export type IhomeTypeNav = StackNavigationProp<rootStackParams, 'home'>;
export type IHomeRouteProp = RouteProp<rootStackParams, 'home'>;

export type ItallTypeNav = StackNavigationProp<rootStackParams, 'tall'>;
export type IweightTypeNav = StackNavigationProp<rootStackParams, 'weight'>;
