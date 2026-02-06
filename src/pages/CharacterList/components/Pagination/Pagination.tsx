import type { Info } from '@/types/graphql';
import { Container, PageButton, PageInfo } from './Pagination.styles';

type PaginationProps = {
  info?: Info | null;
  currentPage: number;
  onChange: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({ info, currentPage, onChange }: PaginationProps) => (
  <Container>
    <PageButton disabled={!info?.prev} onClick={() => onChange((p) => p - 1)}>
      Previous
    </PageButton>
    <PageInfo>
      Page {currentPage} of {info?.pages}
    </PageInfo>
    <PageButton disabled={!info?.next} onClick={() => onChange((p) => p + 1)}>
      Next
    </PageButton>
  </Container>
);
