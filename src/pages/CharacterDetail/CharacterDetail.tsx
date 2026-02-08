import { useParams } from 'react-router-dom';
import { useGetCharacter } from '@/hooks/useCharacters';
import {
  BackLink,
  Card,
  Header,
  Image,
  Info,
  Name,
  Status,
  Detail,
  EpisodeSection,
  EpisodeTitle,
  EpisodeList,
  EpisodeItem,
} from './CharacterDetail.styles';
import { Empty, Error } from '@/styles/shared.styles';
import { Loader } from '@/components/Loader';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacter({ id: id! });

  if (isLoading) return <Loader />;
  if (error) return <Error>Error loading character</Error>;

  const character = data?.character;

  // For this page I didn't create a separate Card component because it is the only main component being rendered here
  return (
    <>
      <BackLink to="/">← Go back</BackLink>
      {character ? (
        <Card>
          <Header>
            <Image
              src={character?.image ?? '/character-placeholder.jpg'}
              alt={character?.name ?? ''}
            />
            <Info>
              <Name>{character?.name}</Name>
              <Status $status={character?.status ?? undefined}>{character?.status}</Status>
              <Detail>
                <strong>Species:</strong> {character?.species}
              </Detail>
              <Detail>
                <strong>Gender:</strong> {character?.gender}
              </Detail>
              <Detail>
                <strong>Origin:</strong> {character?.origin?.name}
              </Detail>
              <Detail>
                <strong>Location:</strong> {character?.location?.name}
              </Detail>
            </Info>
          </Header>
          <EpisodeSection>
            <EpisodeTitle>Episodes</EpisodeTitle>
            <EpisodeList>
              {character?.episode.map((ep) => (
                <EpisodeItem key={ep?.id}>
                  {ep?.episode} - {ep?.name}
                </EpisodeItem>
              ))}
            </EpisodeList>
          </EpisodeSection>
        </Card>
      ) : (
        <Empty>Character not found</Empty>
      )}
    </>
  );
};
