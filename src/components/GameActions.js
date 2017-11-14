import React from 'react';
import { connect } from 'react-redux';
import { Container, Button, Header, Icon, Modal } from 'semantic-ui-react';

import { initBoard } from '../actions/board';

class GameActions extends React.Component {
  state = {
    modalOpen: false
  };

  newGame = () => {
    this.props.dispatch(initBoard());
    this.handleClose();
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    return (
      <Container className="game-actions">
        <Modal
          trigger={<Button primary onClick={this.handleOpen}>New game</Button>}
          open={this.state.modalOpen}
          onClose={this.handleClose}>

          <Header icon="warning sign" content="New game" />
          <Modal.Content>
            <p>Do you really want to start a new game?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleClose} negative>
              <Icon name="remove" /> No
            </Button>
            <Button onClick={this.newGame} primary>
              <Icon name="checkmark" /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    )
  }

}

export default connect()(GameActions);