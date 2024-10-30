// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
  id: number;
  avatar_url: string;
  login: string;
  location?: string;
  email?: string;
  company?: string;
  bio?: string;
  html_url: string;
}
  
