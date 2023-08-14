
export interface IApiResponse{
    status:number,
    message:string,
    data:any
}

export enum EnumResponseStatus{
    invalid=0,
    valid=1
}