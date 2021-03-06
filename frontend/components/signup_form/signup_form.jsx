import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTyping = this.handleTyping.bind(this);
    this.handleGoogleSignIn = this.handleGoogleSignIn.bind(this);
  }


  handleSubmit(event) {
    //don't refresh the page on submit
    event.preventDefault();

    //login in an object with a key of user, that holds an Object
    //with keys of email and password

    this.props.signup({user: this.state});
  }

  //return a function that will update the state
  handleTyping(field) {
    return (event) => {
      this.setState({
        //brackets interpolate in the value of the variable
        [field]: event.target.value
      });
    };
  }

  handleGoogleSignIn() {
    // this.props.googleLogin();
    //Trying something different
  }

  //Ensures the title of the tab goes back to normal when the user leaves the
  //login form. Also clears errors.
  componentWillUnmount() {
    document.title = "MortalNote";
    this.props.clearErrors();
  }

  //Set the title in the tab to match Evernote
  componentDidMount() {
    document.title = "Create a MortalNote account";
  }

  render () {
    //Set the title in the tab to match Evernote
    // document.title = "Create a MortalNote account";

    const errors = this.props.errors.map((error, idx) => {
      return <p key={idx}>{error}</p>;
    });

    let grid = document.getElementsByClassName('grid');
    let signUpForm = document.getElementsByClassName('signup-form');

  //grid[0] because getElementsByClassName returns an array of HTMLNodes.
  //ensure the grid has rendered on the page before trying to change its style
    if (errors.length === 1 && grid[0]) {
      grid[0].style.gridTemplateRows =
      "45px 82px 40px 60px 30px 42px 60px 168px 60px 15px 25px 30px 45px";
      signUpForm[0].style.gridTemplateRows = "45px 45px 23px 46px";
    }
    //add more space if we two errors, i.e. for email and password fields
    else if (errors.length === 2 && grid[0]) {
      grid[0].style.gridTemplateRows =
      "45px 82px 40px 60px 30px 42px 60px 179px 60px 15px 25px 30px 45px";
      signUpForm[0].style.gridTemplateRows = "45px 45px 34px 46px";
    }

    return (
      <div className="grid-container">
        <div className="grid">
          <Link className="logo" to="/">
            <img className="logo"
              src="https://s3.us-east-2.amazonaws.com/mortalnote-images/wolf-logo.png" />
          </Link>
          <h1 className="app-name">MortalNote</h1>
          <p className="positive-message">Remember some things are not important.</p>
          <a href="/auth/google_oauth2" className="googleSignIn" >
          <button className="googleSignIn" onClick={this.handleGoogleSignIn}>
            <img className="google-logo"src="https://s3.us-east-2.amazonaws.com/mortalnote-images/google-logo.png" />
            Continue with Google
          </button>
          </a>
          <div className="or">
            <div className="grey-border" />
            <p className="or-text">or</p>
            <div className="grey-border" />
          </div>

          <form className="signup-form" onSubmit={this.handleSubmit}>
            <input type="text" autoFocus="autoFocus"
              value={this.state.email}
              className="signup-email-input"
              onChange={this.handleTyping("email")}
              placeholder="Email" />
            <input type="password"
              value={this.state.password}
              className="signup-password-input"
              onChange={this.handleTyping("password")}
              placeholder="Password" />
            <div className="errors-container">
              {errors}
            </div>
            <button className ="signup-submit"> Continue (Sign Up) </button>
          </form>

          <p className="terms-of-service">
            By creating an account, you are agreeing to our
            <a className="form-links"
              href="https://evernote.com/legal/terms-of-service"
              target="_blank"> Terms of Service </a>
            and
            <a className="form-links"
               href="https://evernote.com/privacy"
               target="_blank"> Privacy Policy</a>
             .
          </p>
          <p className="already-account"> Already have an account? </p>
          <Link className="signIn" to="/login">Sign in</Link>
        </div>
      </div>
    );
  }
}

export default SignUpForm;
