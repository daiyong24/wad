export type RootStackParamList = {
    Categories: undefined;                     // no params
    Items:     { category: string };           // category name
    Detail:    { item: { name: string; /* …other fields*/ } };
  };