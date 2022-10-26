export class ParcelRequest {
  constructor(
    public id: number,
    public date: string,
    public donationType: string,
    public studentId: number,
    public isReceived: boolean
  ) {}
}
