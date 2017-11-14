import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';

import Board from './components/Board';
import Score from './components/Score';
import GameActions from './components/GameActions';

export class App extends Component {
  render() {
    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <GameActions></GameActions>
            </Grid.Column>
            <Grid.Column width={12}>
              <Board></Board>
            </Grid.Column>
            <Grid.Column width={2}>
              <Score></Score>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default App;
