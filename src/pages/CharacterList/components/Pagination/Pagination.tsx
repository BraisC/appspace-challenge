import type { Info } from '@/types/graphql';
import { Container, PageButton, PageInfo } from './Pagination.styles';

type PaginationProps = {
  info?: Info | null;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const Pagination = ({ info, currentPage, setPage }: PaginationProps) => (
  <Container>
    <PageButton disabled={!info?.prev} onClick={() => setPage((p) => p - 1)}>
      Previous
    </PageButton>
    <PageInfo>
      Page {currentPage} of {info?.pages}
    </PageInfo>
    <PageButton disabled={!info?.next} onClick={() => setPage((p) => p + 1)}>
      Next
    </PageButton>
  </Container>
);
