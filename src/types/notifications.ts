export interface ActivityNotification {
  id: string;
  type: 'survey' | 'withdraw' | 'active';
  name: string;
  amount?: number;
  surveyCount?: number;
}