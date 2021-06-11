export class InOut {
  /**
   * Creates an instance of InOut.
   * @param {string} description
   * @param {number} amount
   * @param {string} type
   * @memberof InOut
   */
  constructor(
    public description: string,
    public amount: number,
    public type: string
  ) {}
}

export class InOutItem extends InOut {
  /**
   * Creates an instance of InOut.
   * @param {string} description
   * @param {number} amount
   * @param {string} type
   * @param {string} uid
   * @memberof InOut
   */
  constructor(
    public description: string,
    public amount: number,
    public type: string,
    public uid: string
  ) {
    super(description, amount, type);
  }
}
