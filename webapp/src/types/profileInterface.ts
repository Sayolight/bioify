export interface profileRequestInterface {
  id: number;
  ownerId: number;
  title: string;
  items: {
    id: number;
    position: number;
    header: {
      id: number;
      value: string;
    } | null;
    link: {
      id: number;
      label: string;
      value: string;
    } | null;
    text: {
      id: number;
      value: string;
    } | null;
  }[];
}
