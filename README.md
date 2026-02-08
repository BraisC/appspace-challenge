# Rick and Morty Challenge for Appspace

A React application that displays characters from the Rick and Morty universe using the [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql).

<p align="center">
  <img src="./docs/demo.gif" alt="Demo" />
</p>

## Live Demo
[LINK to demo on Netlify](https://appspace-challenge.netlify.app/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Running Tests

```bash
npm test           # Watch mode
npm test -- --run  # Single run
```

## Tech Stack

- **React 19 with TypeScript**: This is an obvious choice for this challenge.
- **Vite** - Build tool: Current best build tool for React projects
- **TanStack Query** - Data fetching: Also current standard, it comes with automatic cache, I could have used Apollo but wanted to try TanStack Query with GraphQL as I only used it with REST.
- **GraphQL** - API: It is what I have been using for the last 5 years and also what you use at Appspace so I think it made sense to showcase that I can work with it, maybe a bit overkill for this project to be honest.
- **Styled Components** - Styling: Same case as GraphQL, it is what I have more experience with and also what you use at Appspace according to the job posting. It is losing some traction currently in favor of Tailwind and just plain CSS modules because it doesn't work well with SSR and it adds some weight to the bundle and the build steps, but for this project it's more than ok.
- **React Router** - Routing: I could have used TanStack Router as I already used TanStack Query, but I feel more comfortable with this one and it is still the standard.
- **Vitest** - Testing: For a project created with Vite it makes more sense than using Jest, still the syntax is 99% the same while being more performant and needing less configuration. 
- **React Testing Library** - Component testing: Pretty much the standard to test component rendering and behaviour, it also adds some useful matchers like `toBeInTheDocument` or `toHaveAttribute`
- **MSW** - API mocking for tests: I decided to mock the API instead of mocking the hooks because I wanted to test that the hooks worked, if not I would be ignoring my implementation.

## Project Structure

```
src/
├── hooks/          # Custom hooks
├── layout/         # Layout component
├── lib/            # GraphQL client setup
├── pages/          # Every folder matches a route
│   ├── CharacterList/    # Main list view
│   │   └── components        # Subcomponents used only by this view
│   └── CharacterDetail/  # Individual character view
├── styles/         # Shared styled components
└── types/          # Generated GraphQL types
```

## Technical Decisions

### State Management

I used TanStack Query because for this kind of project we don't need to keep client-side state, so something like Redux or even using the Context API would be overengineering and too much boilerplate for a couple of simple requests and datasets that are only being used in two pages.

### Styling Approach

I used styled components and kept the scope at component level, so each component has its own `.styles.ts` file with the associated styles just for it. I find this approach easy to understand and all files related to a component are kept together.

### Testing Strategy

I used both TDD and Test-Last approaches to showcase that I know how to work with both strategies. For `CharacterList` I implemented the full component first and wrote the integration tests after, but with `CharacterDetail` I wrote the tests first (well I wrote a very minimal component to have something to import and render in the tests) and then I finished the component.

I also wrote some unit tests for simple components like `CharacterCard` or `SortControls` but they are so simple that I felt like I was testing React or the browser instead of my implementation, so take them just as a demo.

### GraphQL Code Generation

I used `@graphql-codegen` to generate the types based on the GraphQL schema and the queries described in `useCharacters.ts`.
At first I tried to have the queries in their own `.graphql` file but I ended up having duplication because I needed more dependencies to create the TypedDocumentNodes and there were a couple of bugs that needed some ugly workarounds, so I kept it simpler.
For a more complex project with more pages and queries I would use something like `@graphql-typed-document-node` or `@graphql-codegen/typed-document-node`

### API Limitations & Workarounds

- **Sorting**: The API doesn't support server-side sorting, so sorting is done client-side per page, no way of ordering the entire dataset and keeping the order through all pages.
- **Filtering**: There is no way to fetch all possible species to create a selector instead of an input, if you don't know what species are available maybe you don't know what to search for.
- **Note**: I chose to display characters instead of episodes because, from my perspective, it looks better. Reading the challenge description, I understood that I could pick either of the two, although one of the requirements mentions sorting by title while characters use name. I hope that won’t be an issue.


## Potential Improvements

- Implement skeleton loaders instead of using a spinner image
- Add error boundaries for better error handling (for the current app state I think it would also be overengineering as TanStack manages API errors and everything else is controlled)
- Add dark mode support (I am a fan of dark mode)
- Improve accessibility (keyboard navigation, aria-live when finishing loading...)
- Add E2E tests with Playwright (for now the unit and integrations tests already cover most of what E2E tests would)
- Add pagination or a carousel to the episode list in CharacterDetail instead of a scrollable list, and show images for them
- Add a delay to the prefetch on `CharacterCard` so it doesn't prefetch when the mouse quickly passes over a card

## Notes
Regarding the commit messages, I have to say that sometimes I took into account that this was a challenge for a company when writing them, so maybe they look too obvious or verbose, but I wanted everything to look clear.

I added prefetching on card hover just on desktop, for mobile it could be done with `onTouchStart` or an intersection observer but I think that would be too much for an app like this, implemented it for desktop to showcase a bit more of my experience.


## Additional Questions
1. **What are Custom Hooks in React? Propose a practical example where you would create one and explain why it would be useful (skip this if React is not your main known framework).**
Custom Hooks are a way of extracting logic into hooks that are not the ones that already come with React, by convention their names have to start with `use` and they can only be called inside React components or other hooks. 
In this project you can find 3 examples, but the best for using as an example here is `useDebounce`, I created it to extract the debounce logic from the component, keeping it cleaner, making it reusable by any other components that may need to debounce a search input, and also making it easier to test it individually, although I didn't do that for this project, I still wanted to keep it isolated.
2. **What advantages does using TypeScript offer in a Frontend project? What challenges might arise when integrating it into an existing project?**
The advantages of Typescript are that errors can be caught at compile time or during coding with the correct linting, it helps a lot with IDE suggestions and autocomplete, it is self-documenting as you know what types the components or functions expect or what properties an object should have.
The challenges are that migrating gradually is tricky, one common approach is to use `any` everywhere and tighten types over time. Also, there can be some third-party libraries without types and it needs to be configured at project level and at the build pipeline.
3. **How would you approach implementing testing in a Frontend application? What types of tests do you consider essential, and why?**
For testing, I would write mostly unit and integration tests. Unit tests for simple components, methods or hooks, so we can isolate and individually test their behaviour. Integration tests for pages or groups of components that usually go together and interact, and E2E tests for complete user flows.
For me, the essentials would be testing business logic with unit tests or integration tests and testing edge cases and different states. But we have to be careful with how simple the thing we are testing is, because sometimes people end up testing things that are not ours, like React rendering or HTML elements.
The usual approach is to have many unit tests, some integration tests and a few E2E tests.
4. **You are assigned a project with a team distributed across different time zones and cultures. What strategies would you use to ensure effective communication and an efficient workflow?**
I think the most important thing is keeping most communication asynchronous and making information complete and easy to find. Thorough documentation and good communication tools are key, in tools like Jira, be as explicit as possible. It's better to over-communicate than to miss something and have to wait 8 hours for an answer. When sync meetings are necessary, schedule them during overlapping hours. Also, be patient if other people are not available.
5. **A team member suggests a technical solution that you consider inefficient or incorrect. How would you handle this situation to avoid tension while ensuring that the best solution is adopted?**
First, I would ask them to explain their solution and try to understand their reasoning, I can also be wrong. If I still disagree, understanding their perspective helps me explain why a different approach might work better. I'd look for documentation or examples to support either solution. Sometimes it's better to let them try it, they might discover the issue themselves, or I might learn why their approach was right. If both solutions are viable, we can do quick spikes to compare. This keeps disagreements productive and avoids escalation.