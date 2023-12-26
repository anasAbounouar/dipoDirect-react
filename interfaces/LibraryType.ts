// Define the structure for each box in a library
interface Box {
  id: number;
  name: string;
  description: string;
  btn: string;
  imgSrc: string;
  pageSrc: string;
}

// Define the structure for each library
export interface ResourceCollection {
  libraryName: string;
  backgroundImage?: string; // Optional property as it's not in all libraries
  boxes: Box[];
}
