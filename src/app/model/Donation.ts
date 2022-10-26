export class Donation {
  constructor(
    public id: number,
    public donorId: number,
    public details: string,
    public donationType: string
  ) {}
}
