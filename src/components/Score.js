import React from 'react';
import { connect } from 'react-redux';
import { Container, Header } from 'semantic-ui-react';

class Score extends React.Component {

  render() {
    const { moves } = this.props;

    return (
      <Container className="score">
        <Header as='h1'>Moves</Header>
        <Header as='h1'>{moves}</Header>
      </Container>
    )
  }

}

const mapStateToProps = (state) => ({
  moves: state.board.moves
});

export default connect(mapStateToProps, null)(Score);