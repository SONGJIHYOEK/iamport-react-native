import React, {Component} from 'react';
import IMP from 'iamport-react-native';

import Loading from './Loading';

class PaymentClass extends Component {

  constructor(props) {
    super(props);
  }

  callback=(response)=>{
    const navigation = this.props.navigation
    const isSuccessed = this.getIsSuccessed(response);
    if (isSuccessed) {
      // aftere succeed to payment. go to home screen 
      const params = {
        response,
        type: 'payment',
      };
      navigation.replace('Home', params);
    } else {
      // if fail to payment, go back to origin screen 
      navigation.goBack();
    }
  }

  getIsSuccessed=(response)=>{
    const { imp_success, success } = response;

    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }
  render(){
    const navigation = this.props.navigation
    const userCode = navigation.getParam('userCode');
    const data = navigation.getParam('data');
    return (
      <IMP.Payment
        userCode={userCode}
        loading={<Loading />}
        data={{
          ...data,
          app_scheme: 'exampleForWebView',
        }}
        callback={this.callback}
      />
    );
  }
}

export default PaymentClass;