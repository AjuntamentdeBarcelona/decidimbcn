import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewComment }      from './comments.actions';

class NewCommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newComment: {
        body: '',
        alignment: "0"
      }
    };
  }

  render() {
    const { visible, parent } = this.props;

    if (visible) {
      let textAreaId = `comment-body-${parent && parent.id}`;

      return (
        <div>
          <form className="new_comment" onSubmit={(e) => this.onSubmitNewComment(e)}>
            <label 
              forHtml={textAreaId}>
              Deixa el teu comentari
            </label>
            <textarea id={textAreaId} value={this.state.newComment.body} onChange={e => this.setBody(e.target.value)}></textarea>
            {this.renderAlignmentRadioButtons()}
            <input 
              type="submit" 
              value="Publica resposta" 
              className="button radius small inline-block" />
          </form>
        </div>
      );
    }

    return null;
  }

  renderAlignmentRadioButtons() {
    const { commentable, parent } = this.props;

    if (commentable.arguable && !parent) {
      let positiveId = `comment-body-${parent && parent.id}-positive-alignment`,
          neutralId  = `comment-body-${parent && parent.id}-neutral-alignment`,
          negativeId = `comment-body-${parent && parent.id}-negative-alignment`;

      return (
        <div className="alignment">
          <span className="alignment-input">
            <input id={positiveId} type="radio" value="1" checked={this.state.newComment.alignment === "1"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={positiveId}>{I18n.t('comments.form.alignment.positive')}</label>
          </span>
          <span className="alignment-input">
            <input id={neutralId} type="radio" value="0" checked={this.state.newComment.alignment === "0"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={neutralId}>{I18n.t('comments.form.alignment.neutral')}</label>
          </span>
          <span className="alignment-input">
            <input id={negativeId} type="radio" value="-1" checked={this.state.newComment.alignment === "-1"} onChange={e => this.setAlignment(e.target.value)} />
            <label htmlFor={negativeId}>{I18n.t('comments.form.alignment.negative')}</label>
          </span>
        </div>
      );
    }

    return null;
  }

  setBody(body) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        body
      }
    });
  }

  setAlignment(alignment) {
    this.setState({ 
      newComment: { 
        ...this.state.newComment, 
        alignment
      }
    });
  }

  onSubmitNewComment(event) {
    const { commentable, parent, addNewComment } = this.props;

    event.preventDefault();

    addNewComment(commentable, {
      parent, 
      newComment: this.state.newComment 
    });

    this.setState({ newComment: { body: '', alignment: "0" } })
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addNewComment }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewCommentForm);