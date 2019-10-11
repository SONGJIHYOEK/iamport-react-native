import React, {Component} from 'react';
import WebView from 'react-native-webview';
import queryString from 'query-string';

class HomeClass extends Component {

  constructor(props) {

    const domain = 'http://www.kakaopay.com.s3-website.ap-northeast-2.amazonaws.com/';
    super(props);

    this.state = {
      uri : domain,
      navigation : this.props.navigation
    };
    this.onMessage = this.onMessage.bind(this);
  }

  componentDidMount(){

    const type = this.state.navigation.getParam('type');
    const response = this.state.navigation.getParam('response');

    if (response) {
      const query = queryString.stringify(response);
      if (type === 'payment') {
        this.setState({uri:`${this.state.uri}/payment/result?${query}`});    
      }else {
        this.setState({uri:`${this.state.uri}/certification/result?${query}`});
      }
    }
  }

  onMessage =(e)=>{
    try {
      const { userCode, data, type } = JSON.parse(e.nativeEvent.data);
      const params = { userCode, data };
      this.props.navigation.push(type === 'payment' ? 'Payment' : 'Certification', params);
    } catch (e) {}
  }

  render(){

    return (
      <WebView
        source={{uri: this.state.uri}} 
        onMessage={this.onMessage}
        style={{ flex: 1 }}
        injectedJavascript={`(function() {
          window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
          };
        })()`}
      />
    );
  }
}

export default HomeClass;