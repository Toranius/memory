import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "semantic-ui-react";

class GameCard extends React.Component {
  render() {
    const card = this.props.card;

    return (
      <Card onClick={() => this.props.onSelectCard(card)} >
        <Card.Content>
          <img src={card.flipped ? card.front : card.back} alt={"img"} />
        </Card.Content>
      </Card>
    );
  }
}

GameCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired
  })
};

export default connect()(GameCard);
