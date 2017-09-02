export class SampleModel {
  id: number;
  referIndicator: number;
  date: string;
  value: string;
}

export class MarketModel {
  id: number;
  name: string;
  description: string;
  metric: string;
  status: string;
  samples: Array<SampleModel>;
}
