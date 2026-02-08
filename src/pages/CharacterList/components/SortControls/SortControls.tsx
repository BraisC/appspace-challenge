import { Container, Label, Select } from './SortControls.styles';

export type SortOption = 'none' | 'name' | 'species';

type SortControlsProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export const SortControls = ({ value, onChange }: SortControlsProps) => (
  <Container>
    <Label htmlFor="sort-select">Sort by:</Label>
    <Select id="sort-select" value={value} onChange={(e) => onChange(e.target.value as SortOption)}>
      <option value="none">Default</option>
      <option value="name">Name</option>
      <option value="species">Species</option>
    </Select>
  </Container>
);
