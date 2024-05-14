declare namespace ApiPageManagement {
  interface Page {
    id: number;
    name: string;
    description?: string;
    site?: string;
    icon?: string;
    iconColor?: string;
    type: number;
    orderBy?: number;
  }

  interface LegacyPage {
    list: Page[];
    types: number[];
  }
  type RecordNullable<T> = {
    [K in keyof T]?: T[K] | null;
  };
  type PageSearchParams = RecordNullable<
    Pick<ApiPageManagement.Page, "name" | "type">
  >;
}
