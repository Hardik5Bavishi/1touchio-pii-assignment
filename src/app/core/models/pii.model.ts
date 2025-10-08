export interface DataSources {
  documents: string[];
  databases: string[];
  emails: string[];
  chats: string[];
}

export interface Person {
  id: number;
  name: string;
  pii: any;
  dataSources: DataSources;
}

export interface DashboardStats {
  totalPersons: number;
  totalPiiItems: number;
  averageDataSources: number;
}
