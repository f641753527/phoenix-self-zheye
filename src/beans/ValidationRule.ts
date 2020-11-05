export default interface RuleProps {
  type: 'required' | 'custom';
  message: string;
  validate?: (value: string) => boolean
}
