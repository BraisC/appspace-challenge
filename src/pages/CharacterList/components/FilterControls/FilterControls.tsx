import { Container, Input } from './FilterControls.styles';

export type FilterValues = {
  name: string;
  species: string;
};

type FilterControlsProps = {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
};

export const FilterControls = ({ values, onChange }: FilterControlsProps) => (
  <Container>
    <Input
      type="text"
      placeholder="Filter by name..."
      value={values.name}
      onChange={(e) => onChange({ ...values, name: e.target.value })}
    />
    <Input
      type="text"
      placeholder="Filter by species..."
      value={values.species}
      onChange={(e) => onChange({ ...values, species: e.target.value })}
    />
  </Container>
);
