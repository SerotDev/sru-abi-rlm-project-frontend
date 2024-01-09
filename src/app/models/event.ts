export interface Event{
    id: number,
    title: string,
    description: string,
    imgUrl: string,
    startDate: Date,
    endDate: Date,
    isPublic: boolean,
    entryPrice: number,
    latitude: number,
    longitude: number,
    hotel: object,
}