export type DealStatus =
  | "Lead"
  | "Testing"
  | "Done"
  | "Reviewing"
  | "In development";

export type DealRecordType = {
  [key: string]: any;
  id: string;
  created_time: string;
  properties: {
    [key: string]: any;

    Name: {
      [key: string]: any;
      title: {
        [key: string]: any;
        text: {
          [key: string]: any;
          content: string;
        };
      }[];
    };

    "Deal Value": {
      [key: string]: any;
      number: number;
    };

    Status: {
      [key: string]: any;
      status: {
        [key: string]: any;
        name: DealStatus;
      };
    };

    "Last edited time": {
      [key: string]: any;
      last_edited_time: string;
    };

    Visibility: {
      [key: string]: any;
      select: {
        [key: string]: any;
        name: "Show" | "Custom Visibility";
      };
    };
  };
};

export const sortByProperty = "Name";
