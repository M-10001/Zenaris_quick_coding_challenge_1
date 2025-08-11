export type DATA_TYPES = "Information" | "Error";

export class PopupData {
  text: string;
  type: DATA_TYPES;

  constructor(text: string, type: DATA_TYPES) {
    this.text = text;
    this.type = type;
  }
}
