export type PoorItem = {
    name: string;
    description: string;
    location: string;
    image: string;
} & (
    | {
          type: 'Недвижимость';
          propertyType: string;
          area: number;
          rooms: number;
          price: number;
      }
    | {
          type: 'Авто';
          brand: string;
          model: string;
          year: number;
          mileage: number;
      }
    | { type: 'Услуги'; serviceType: string; experience: number; cost: number; workSchedule: string }
);

export type Item = PoorItem & { user_id: number; id: number };
