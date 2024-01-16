import { Service } from '../models/service';

export interface Hotel{
    id: number,
    name: string,
    description: string,
    phone: number,
    address: string,
    email: string,
    web: string,
    numberRooms: number,
    imgsUrl: string, 
    price: number,
    latitude: number,
    longitude: number,
    hotelServices: any[],
    starRatingAvg: any
}