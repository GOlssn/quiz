import React, { Component } from 'react';
import { Grid, Transition, Header, Form, Message, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      answerer: '',
      quizName: 'Emilias Dop',
      currentStage: -1,
      questions: []
    };
  }

  componentDidMount = () => {
    axios.get('http://localhost:8000/api/v1/quiz/1')
      .then(response => response.data).then((quizData) => {
        const questions = quizData.question_set.map(question => (
          {
            id: question.id,
            question: question.question_text,
            value: '',
            options: question.option_set.map(option => (
              {
                value: option.id,
                label: option.label
              }
            ))
          }
        ));

        this.setState({
          questions
        })
      });

    this.setState({ currentStage: 1 });
  };

  onAnswererChanged = (e) => {
    this.setState({ answerer: e.target.value });
  };

  startStageTransition = () => {
    if (this.state.answerer) {
      this.setState({ currentStage: -1 });
      return;
    }

    this.setState({ nameError: 'Du måste ange ditt namn' });
  };

  onStageOneComplete = () => {
    if (this.state.currentStage !== 1) {
      this.setState({ currentStage: 2 });
    }
  };

  handleInputChange = (e, value, questionId) => {
    let questions = [...this.state.questions];
    questions.map(function (question) {
      if (question.id === questionId) {
        question.value = value;
      }

      return question;
    });

    this.setState({
      questions: questions
    });
  };

  render() {
    return (
      <div className="App">
        <Grid container columns={1}>
          <Grid.Column style={{ marginTop: '1em' }}>
            <Transition visible={this.state.currentStage === 1} onComplete={this.onStageOneComplete} animation="fade" duration={500}>
              <div id="stage_1">
                <Header textAlign="center">Dop Quiz</Header>
                <Form error={!!this.state.nameError}>
                  {!!this.state.nameError && (
                    <Message
                      error
                      content='Du måste ange ditt namn'
                    />
                  )}
                  <Form.Input label="" onChange={this.onAnswererChanged} value={this.state.name} placeholder="Ange ditt namn" />
                  <div style={{ textAlign: 'center' }}>
                    <Button onClick={this.startStageTransition} style={{ marginTop: '1em' }}>Börja</Button>
                  </div>
                </Form>
              </div>
            </Transition>
            <Transition visible={this.state.currentStage === 2} animation="fade" duration={500}>
              <div id="stage_2" style={{ marginTop: '1em' }}>
                {this.state.questions.map(question => (
                  <Segment vertical key={question.id}>
                    <Header textAlign="center">{question.question}</Header>
                    <Form>
                      {!!question.options.length ? (
                        <Form.Group inline>
                          {question.options.map(option => (
                            <Form.Radio key={option.label} label={option.label} value={option.value} checked={question.value === option.value} onClick={(e, { value }) => this.handleInputChange(e, value, question.id)} />
                          ))}
                        </Form.Group>
                      ) : <Form.Input value={question.value} onChange={(e, { value }) => this.handleInputChange(e, value, question.id)} />}
                    </Form>
                  </Segment>
                ))}
                <div style={{ textAlign: 'center' }}>
                  <Button onClick={this.startStageTransition} style={{ marginTop: '1em' }}>Skicka in</Button>
                </div>
              </div>
            </Transition>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
