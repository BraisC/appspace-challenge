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
import { Error, Loading } from '@/styles/shared.styles';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacter({ id: id! });

  if (isLoading) return <Loading>Loading...</Loading>;
  if (error) return <Error>Error loading character</Error>;

  const character = data?.character;

  return (
    <>
      <BackLink to="/">← Go back</BackLink>
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
    </>
  );
};
