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
    // const userCode = navigation.getParam('userCode');
    const userCode = 'imp23274934';
    const data = {
      pg: 'kakaopay',
      pay_method: 'card',
      name: '아임포트 결제데이터 분석',
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: '39000',
      buyer_name: '홍길동',
      buyer_tel: '01012345678',
      buyer_email: 'example@naver.com',
      buyer_addr: '서울시 강남구 신사동 661-16',
      buyer_postcode: '06018',
      app_scheme: 'example',
      // [Deprecated v1.0.3]: m_redirect_url
    };
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