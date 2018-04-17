import React, { Component } from 'react';
import { Grid, Transition, Header, Form, Message, Button, Segment } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      currentStage: -1,
      questions: [{
        id: 1,
        question: 'Vilket datum är Emilia född?',
        value: '',
        options: []
      }, {
        id: 2,
        question: 'Hur lång var emilia när hon var två månader gammal?',
        value: '',
        options: [{
          label: '35,5 cm',
          value: '35.5'
        }, {
          label: '36,0 cm',
          value: '36'
        }, {
          label: '36,5 cm',
          value: '36.5'
        }]
      }, {
        id: 3,
        question: 'Vad heter Emilia I efternamn?',
        value: '',
        options: []
      }, {
        id: 4,
        question: 'Vad har Emilia för andranamn?',
        value: '',
        options: []
      }, {
        id: 5,
        question: 'Vilket klockslag föddes Emilia?',
        value: '',
        options: []
      }, {
        id: 6,
        question: 'Vad gillar Emilia mest?',
        value: '',
        options: [{
          label: 'Babblarna',
          value: 'babblarna'
        }, {
          label: 'Blinka lilla stjärna',
          value: 'blinka_lilla_stjarna'
        }]
      }, {
        id: 7,
        question: 'Hur många dagar gammal är Emilia idag (21/4-18)',
        value: '',
        options: []
      }, {
        id: 8,
        question: 'Hur många tremänningar har Emilia?',
        value: '',
        options: []
      }]
    };
  }

  componentDidMount = () => {
    this.setState({ currentStage: 1 });
  };

  onNameChanged = (e) => {
    this.setState({ name: e.target.value });
  };

  startStageTransition = () => {
    if (this.state.name) {
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
                  <Form.Input label="" onChange={this.onNameChanged} value={this.state.name} placeholder="Ange ditt namn" />
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
