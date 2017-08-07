import React, {Component} from 'react';
import {
  Tabs,
  Tab,
  FormControl,
  ControlLabel,
  HelpBlock,
  FormGroup
} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';
import ModalDialog from '../dialog';

function FieldGroup({
  id,
  label,
  help,
  ...props
}) {
  let controlLabel = "";
  if (label)
    controlLabel = <ControlLabel>{label}</ControlLabel>;

  return (
    <FormGroup controlId={id}>
      {controlLabel}
      <FormControl {...props}/> {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.validationMesssage = '';
    this.onChangeAuth = this.onChangeAuth.bind(this);
    this.onSubmitAuth = this.onSubmitAuth.bind(this);
    this.credentials = {
      email: '',
      password: ''
    };

    this.onChangeRegister = this.onChangeRegister.bind(this);
    this.onSubmitRegister = this.onSubmitRegister.bind(this);
    this.regdata = {
      email: '',
      password: '',
      password_confirm: ''
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: "Вход",
      "validationMesssage": ""
    };

  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleSelect(key) {
    console.log(key);

    this.setState({key});
  }

  onChangeAuth(event) {
    const field = event.target.name;
    this.credentials[field] = event.target.value;
  }
  onSubmitAuth(event) {
    event.preventDefault();
    this.props.actions.logInUser(this.credentials);
  }

  onChangeRegister(event) {
    const field = event.target.name;
    this.regdata[field] = event.target.value;
  }

  onValidate(message) {
    this.setState({validationMesssage: message});
  }

  async onSubmitRegister(event) {
    event.preventDefault();
    if (this.regdata.password === this.regdata.password_confirm) {
      let res = await this.props.actions.registerUser(this.regdata);
      this.onValidate(res);
    } else {
      this.onValidate("Подтвердите пароль");
    }
  }

  render() {
    console.log("rend");
    let button = ({className: "btn-signIn navbar-btn navbar-right", title: "Авторизация"});

    let key = this.state.key
    let confirmButton = ({
      title: key,
      onClick: key === "Вход"
        ? this.onSubmitAuth
        : this.onSubmitRegister

    });

    return (
      <ModalDialog title="Авторизация" button={button} confirm={confirmButton}>
        <form>
          <Tabs activeKey={this.state.key} onSelect={this.handleSelect} className="authTabs" id="controlled-tab-example">
            <Tab eventKey={"Вход"} title="Вход">
              <FieldGroup name="email" id="formControlsText" type="email" label="Адрес электронной почты" placeholder="Введите адрес электронной почты" onChange={this.onChangeAuth}/>
              <FieldGroup name="password" id="formControlsPassword" label="Пароль" type="password" placeholder="Введите пароль" onChange={this.onChangeAuth}/>
            </Tab>
            <Tab eventKey={"Регистрация"} title="Регистрация">
              <FieldGroup name="email" id="formControlsEmail" type="email" label="Адрес электронной почты" placeholder="Введите адрес электронной почты" onChange={this.onChangeRegister}/>

              <FieldGroup name="password" id="formControlsPassword" label="Пароль" type="password" placeholder="Введите пароль" onChange={this.onChangeRegister}/>
              <FieldGroup name="password_confirm" id="formControlsPassword" type="password" placeholder="Подтвердите пароль" onChange={this.onChangeRegister}/>
              <p>{this.state.validationMesssage}</p>
            </Tab>
          </Tabs>
        </form>
      </ModalDialog>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AuthModal);
