import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Button, Modal, Header, Icon } from "semantic-ui-react";

import * as boardActions from "../actions/board";
import GameCard from "./GameCard";

class Board extends React.Component {
  state = {
    winModalOpen: false,
    cardTimeout: {}
  };

  selectCard = card => {
    if (card.matched)
      return;

    const cardTimeout = this.state.cardTimeout;
    const { dispatch, flipTimeout } = this.props;

    dispatch(boardActions.incrementMove());
    dispatch(boardActions.checkFlippedCard(card.id));
    dispatch(boardActions.flipCard(card.id));

    clearTimeout(cardTimeout[card.id]);

    cardTimeout[card.id] = setTimeout(() => {
      dispatch(boardActions.flipCardTimeout(card.id))
    }, flipTimeout);

    this.setState({ cardTimeout });

    dispatch(boardActions.checkMatch());
    dispatch(boardActions.checkBoard());
  };

  newGame = () => this.props.dispatch(boardActions.initBoard());

  closeWinModal = () => this.setState({ winModalOpen: false });

  componentWillMount() {
    this.props.dispatch(boardActions.initBoard());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ winModalOpen: nextProps.win });
  }

  render() {
    const { columns, cards } = this.props;

    return (
      <Container>
        <Grid columns={columns} padded>
          <Grid.Row>
            {cards.map(card => (
              <Grid.Column key={card.id}>
                <GameCard card={card} onSelectCard={this.selectCard} />
              </Grid.Column>
            ))}
          </Grid.Row>
        </Grid>

        <Modal open={this.state.winModalOpen} onClose={this.closeWinModal}>
          <Header content="Congratulation!!!" />
          <Modal.Content>
            <p>Do you want to try again?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeWinModal} negative>
              <Icon name="remove" /> No
            </Button>
            <Button onClick={this.newGame} primary>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    );
  }

}

const mapStateToProps = state => ({ ...state.board });

export default connect(mapStateToProps, null)(Board);
